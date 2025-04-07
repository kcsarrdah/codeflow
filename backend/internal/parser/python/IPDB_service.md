# IPDB Service

The IPDB service will be responsible for the core debugging functionality. 

## Session Management Functions

- **create_session(code: str, test_case: str = None) -> dict**: Initialize a new debugging session
- **get_session(session_id: str) -> dict**: Retrieve information about an existing session
- **delete_session(session_id: str) -> bool**: Clean up a session when done

## Debugging Control Functions

- **step_forward(session_id: str) -> dict**: Execute the next line of code
- **run_to_completion(session_id: str) -> dict**: Run the code until the end or a breakpoint
- **reset_session(session_id: str) -> dict**: Reset the debugger to the initial state

## Breakpoint Management

- **toggle_breakpoint(session_id: str, line_number: int) -> dict**: Set or remove a breakpoint
- **get_breakpoints(session_id: str) -> list**: Get all active breakpoints

## State Inspection Functions

- **get_variables(session_id: str) -> list**: Get current variable state
- **get_execution_state(session_id: str) -> dict**: Get comprehensive state including line number, variables, etc.

Each function would return a dictionary with appropriate information, including:
- Current line number
- Variables and their values
- Program output
- Error messages (if any)
- Breakpoints

## FastAPI Routes

### Session Management

- **POST /debug/sessions** - Create a new debugging session
- **GET /debug/sessions/{session_id}** - Get session details
- **DELETE /debug/sessions/{session_id}** - Delete a session

### Debugging Controls

- **POST /debug/sessions/{session_id}/step** - Step forward in the code
- **POST /debug/sessions/{session_id}/execute** - Run to completion
- **POST /debug/sessions/{session_id}/reset** - Reset to initial state

### Breakpoint Management

- **POST /debug/sessions/{session_id}/breakpoints** - Set a breakpoint
- **DELETE /debug/sessions/{session_id}/breakpoints/{line_number}** - Remove a breakpoint
- **GET /debug/sessions/{session_id}/breakpoints** - List all breakpoints

### State Inspection

- **GET /debug/sessions/{session_id}/variables** - Get current variables
- **GET /debug/sessions/{session_id}/state** - Get complete execution state

This structure separates concerns nicely:
- The IPDB service handles the actual debugging logic
- The FastAPI server exposes this functionality as a RESTful API 