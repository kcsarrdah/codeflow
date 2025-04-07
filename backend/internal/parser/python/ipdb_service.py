import ipdb
import sys
import io
import traceback
import uuid
import threading
import tempfile
import os
from contextlib import redirect_stdout, redirect_stderr
from typing import Dict, List, Optional, Any, Tuple
import bdb
import time
from types import FrameType
import textwrap
# Store active debugging sessions
# Map session_id to DebugSession object

active_sessions: Dict[str, 'DebugSession'] = {}

class DebugSession:
    """
    Represents a debugging session using ipdb.
    Manages code execution, state tracking, and variable inspection.
    """
    
    def __init__(self, code: str, test_case: Optional[str] = None):
        """
        Initialize a new debugging session.
        
        Args:
            code: The Python code to debug
            test_case: Optional test case data to use
        """
        self.id = str(uuid.uuid4())
        self.code = code
        self.test_case = test_case
        
        # Capture stdout and stderr
        self.stdout_capture = io.StringIO()
        self.stderr_capture = io.StringIO()
        
        # Track execution state
        self.current_line = -1  # Start at -1 to indicate not started
        self.has_started = False
        self.is_finished = False
        self.error = None
        
        # For storing breakpoints
        self.breakpoints = set()
        
        # For storing variables
        self.variables = []
        
        # Initialize debugger to None - will be set when execution starts
        self.debugger = None
        self.execution_thread = None
        
        # Create a temporary file for the code
        # This helps with tracking line numbers and providing better error messages
        self.code = textwrap.dedent(code)
        self._create_temp_file()
    
    def _create_temp_file(self):
        """Create a temporary file with the code for debugging."""
        try:
            fd, self.temp_file_path = tempfile.mkstemp(suffix='.py', prefix='debug_')
            with os.fdopen(fd, 'w') as f:
                f.write(self.code)
        except Exception as e:
            self.error = f"Failed to create temporary file: {str(e)}"
            self.is_finished = True
    
    def get_state(self) -> dict:
        """
        Get the current state of the debugging session.
        
        Returns:
            A dictionary with the session state
        """
        return {
            "id": self.id,
            "current_line": self.current_line,
            "variables": self.variables,
            "has_started": self.has_started,
            "is_finished": self.is_finished,
            "output": self.stdout_capture.getvalue().splitlines(),
            "error": self.error,
            "breakpoints": list(self.breakpoints)
        }
    
    def __del__(self):
        """Clean up resources when the session is deleted."""
        try:
            if hasattr(self, 'temp_file_path') and os.path.exists(self.temp_file_path):
                os.remove(self.temp_file_path)
        except:
            pass  # Best effort cleanup
    
    def start_execution(self) -> Dict:
        """
        Start the debugging session and pause at the first line.
        
        Returns:
            Current state after starting execution
        """
        if self.has_started:
            return self.get_state()
            
        self.has_started = True
        
        # Create a custom debugger that extends pdb.Bdb
        class CustomDebugger(bdb.Bdb):
            def __init__(self, skip=None, session=None):
                bdb.Bdb.__init__(self, skip=skip)
                self.session = session
                self.stopped = False
                self.current_frame = None
                
            def user_line(self, frame):
                # Called when we hit a new line
                if frame.f_code.co_filename == self.session.temp_file_path:
                    self.current_frame = frame
                    # Calculate the line number relative to our code
                    self.session.current_line = frame.f_lineno
                    self.session.capture_variables(frame)
                    self.set_step()  # Set to step mode
                    self.stopped = True
                else:
                    # Skip lines in other files
                    self.set_step()
                
            def user_return(self, frame, return_value):
                # Called when a function returns
                if frame.f_code.co_filename == self.session.temp_file_path:
                    self.session.capture_variables(frame)
                
            def user_exception(self, frame, exc_info):
                # Called when an exception occurs
                exc_type, exc_value, exc_traceback = exc_info
                self.session.error = f"{exc_type.__name__}: {str(exc_value)}"
                self.session.is_finished = True
                # Capture variables at the point of exception
                self.session.capture_variables(frame)
        
        # Initialize the debugger
        self.debugger = CustomDebugger(session=self)
        
        # Create a thread for running the code
        def run_code():
            try:
                with redirect_stdout(self.stdout_capture), redirect_stderr(self.stderr_capture):
                    # Set initial breakpoints if any
                    for line in self.breakpoints:
                        self.debugger.set_break(self.temp_file_path, line)
                    
                    # Start the debugger with our code file
                    self.debugger.run(f"exec(open('{self.temp_file_path}').read())")
                    
                # If we get here without an error, mark as finished
                self.is_finished = True
            except SyntaxError as e:
                # Enhanced syntax error reporting
                self.error = f"{type(e).__name__}: {str(e)}"
                self.is_finished = True
                # Try to extract line information for better reporting
                if hasattr(e, 'lineno') and hasattr(e, 'text'):
                    self.error += f"\nAt line {e.lineno}: {e.text}"
            except Exception as e:
                self.error = str(e)
                self.is_finished = True
            import traceback
            self.stderr_capture.write(traceback.format_exc())
        
        # Start the thread
        self.execution_thread = threading.Thread(target=run_code)
        self.execution_thread.daemon = True
        self.execution_thread.start()
        
        # Wait for the first breakpoint or line stop
        timeout = 5.0  # 5 second timeout
        start_time = time.time()
        while not self.debugger.stopped and not self.is_finished:
            if time.time() - start_time > timeout:
                self.error = "Timeout waiting for execution to start"
                self.is_finished = True
                break
            time.sleep(0.1)
            
        return self.get_state()
        
    def step_forward(self) -> Dict:
        """
        Execute the next line of code.
        
        Returns:
            Updated state after stepping
        """
        if not self.has_started:
            return self.start_execution()
            
        if self.is_finished:
            return self.get_state()
            
        if not hasattr(self, 'debugger') or not self.debugger.stopped:
            return self.get_state()
        
        # Continue execution to the next line
        self.debugger.stopped = False
        
        # Wait for the next stop or end
        timeout = 5.0  # 5 second timeout
        start_time = time.time()
        while not self.debugger.stopped and not self.is_finished:
            if time.time() - start_time > timeout:
                self.error = "Timeout waiting for next step"
                self.is_finished = True
                break
            time.sleep(0.1)
            
        return self.get_state()
    
    def capture_variables(self, frame: FrameType) -> None:
        """
        Capture variables from the current frame.
        
        Args:
            frame: The current execution frame
        """
        # Create a set of existing variable names to avoid duplicates
        existing_vars = {v["name"] for v in self.variables}
        
        # Capture locals
        for name, value in frame.f_locals.items():
            # Skip private variables
            if name.startswith('__') and name.endswith('__'):
                continue
                
            try:
                # Try to get a simple representation
                if isinstance(value, (int, float, str, bool, type(None))):
                    val_repr = repr(value)
                elif isinstance(value, (list, tuple, set)):
                    if len(value) > 10:
                        val_repr = f"{type(value).__name__} with {len(value)} items"
                    else:
                        val_repr = repr(value)
                elif isinstance(value, dict):
                    if len(value) > 5:
                        val_repr = f"dict with {len(value)} items"
                    else:
                        val_repr = repr(value)
                else:
                    val_repr = f"{type(value).__name__} object"
            except:
                val_repr = "Error getting value"
                
            self.variables.append({
                "name": name,
                "value": val_repr,
                "type": type(value).__name__,
                "line": self.current_line
            })
            # Also check globals if they're different from locals
        if frame.f_globals is not frame.f_locals:
            for name, value in frame.f_globals.items():
                # Skip private variables, duplicates, modules, and builtins
                if ((name.startswith('__') and name.endswith('__')) 
                        or name in existing_vars 
                        or name == 'builtins'):
                    continue
                    
                # Skip if it's a module
                if type(value).__name__ == 'module':
                    continue
                    
                try:
                    # Same representation logic as above
                    if isinstance(value, (int, float, str, bool, type(None))):
                        val_repr = repr(value)
                    elif isinstance(value, (list, tuple, set)):
                        if len(value) > 10:
                            val_repr = f"{type(value).__name__} with {len(value)} items"
                        else:
                            val_repr = repr(value)
                    elif isinstance(value, dict):
                        if len(value) > 5:
                            val_repr = f"dict with {len(value)} items"
                        else:
                            val_repr = repr(value)
                    else:
                        val_repr = f"{type(value).__name__} object"
                except:
                    val_repr = "Error getting value"
                    
                self.variables.append({
                    "name": name,
                    "value": val_repr,
                    "type": type(value).__name__,
                    "line": self.current_line
                })


# Session Management Functions

def create_session(code: str, test_case: Optional[str] = None) -> Dict:
    """
    Create a new debugging session.
    
    Args:
        code: The Python code to debug
        test_case: Optional test case data
        
    Returns:
        Dictionary with session information
    """
    session = DebugSession(code, test_case)
    
    # Store in active sessions
    active_sessions[session.id] = session
    
    return session.get_state()

def get_session(session_id: str) -> Optional[Dict]:
    """
    Get information about an existing session.
    
    Args:
        session_id: The ID of the session
        
    Returns:
        Dictionary with session information or None if not found
    """
    session = active_sessions.get(session_id)
    if not session:
        return None
        
    return session.get_state()

def delete_session(session_id: str) -> bool:
    """
    Delete a debugging session and clean up resources.
    
    Args:
        session_id: The ID of the session
        
    Returns:
        True if deleted, False if not found
    """
    if session_id in active_sessions:
        # Get session
        session = active_sessions[session_id]
        
        # Clean up (this will call __del__ which removes temp files)
        del active_sessions[session_id]
        return True
        
    return False

# Clean up expired sessions periodically
def cleanup_sessions(max_age_minutes: int = 30):
    """
    Remove sessions that have been inactive for too long.
    
    Args:
        max_age_minutes: Maximum age in minutes before a session is considered expired
    """
    # This would be implemented for a production system
    # For now, we'll keep it simple
    pass

def start_execution(session_id: str) -> Dict:
    """
    Start the execution of a debugging session.
    
    Args:
        session_id: The ID of the session to start
        
    Returns:
        Dictionary with updated session state or error
    """
    session = active_sessions.get(session_id)
    if not session:
        return {"error": "Session not found"}
        
    return session.start_execution()

def step_forward(session_id: str) -> Dict:
    """
    Step forward to the next line in a debugging session.
    
    Args:
        session_id: The ID of the session
        
    Returns:
        Dictionary with updated session state or error
    """
    session = active_sessions.get(session_id)
    if not session:
        return {"error": "Session not found"}
        
    return session.step_forward()