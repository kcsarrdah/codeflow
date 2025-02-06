// Responsible for:
// - Running Python code in a controlled environment
// - Executing code line by line
// - Capturing variable states at each step
// - Managing execution context
// - Capturing stdout/stderr

// Takes Python code and executes it line by line
// Captures variable states at each step
// Handles errors and output
// Allows stepping through code
// Can reset the debug session

// internal/services/debugger/executor.go
// internal/services/debugger/executor.go
package debugger

import (
	"bytes"
	"debugger/internal/models"
	"debugger/internal/utils"
	"encoding/json"
	"fmt"
	"os/exec"
	"strings"
	"time"

	"github.com/google/uuid"
)

type Executor struct {
	session *models.DebugSession
	parser  *Parser
}

func NewExecutor(code string) (*Executor, error) {
	// Create new parser
	parser := NewParser(code)

	// Validate code first
	if err := parser.ValidateCode(); err != nil {
		return nil, err
	}

	// Create new debug session
	session := &models.DebugSession{
		ID:          uuid.New().String(),
		Code:        code,
		CurrentLine: 1,
		Variables:   make([]models.Variable, 0),
		Status:      "initialized",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	return &Executor{
		session: session,
		parser:  parser,
	}, nil
}

func (e *Executor) Step() (*models.DebugSession, error) {
	if e.session.Status == "completed" {
		return nil, utils.NewDebugError(0, "Debug session already completed", "ExecutionError")
	}

	// Create debug script for current line
	debugScript := e.createDebugScript()

	// Execute the Python code
	cmd := exec.Command("python3", "-c", debugScript)
	var stdout, stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	err := cmd.Run()
	if err != nil {
		e.session.Error = stderr.String()
		e.session.Status = "error"
		return e.session, utils.NewDebugError(e.session.CurrentLine, stderr.String(), "RuntimeError")
	}

	// Parse output and update session
	if err := e.parseOutput(stdout.String()); err != nil {
		return e.session, err
	}

	// Update session state
	e.session.CurrentLine++
	e.session.UpdatedAt = time.Now()

	// Check if we've reached the end of the code
	if e.session.CurrentLine > len(e.parser.GetLines()) {
		e.session.Status = "completed"
	} else {
		e.session.Status = "running"
	}

	return e.session, nil
}

func (e *Executor) createDebugScript() string {
	lines := e.parser.GetLines()
	debugLines := []string{
		"import sys, json, inspect, traceback",
		"def get_variables():",
		"    variables = []",
		"    frame = inspect.currentframe().f_back",
		"    # Create a safe copy of the variables",
		"    safe_vars = frame.f_locals.copy()",
		"    for name, val in safe_vars.items():",
		"        if not name.startswith('__'):",
		"            try:",
		"                variables.append({",
		"                    'name': str(name),",
		"                    'value': str(val),",
		"                    'type': str(type(val).__name__),",
		"                    'line': " + fmt.Sprint(e.session.CurrentLine) + ",",
		"                })",
		"            except:",
		"                pass",
		"    return variables",
		"",
		"try:",
	}

	// Add code lines up to current line
	for i, line := range lines {
		if i < e.session.CurrentLine {
			// Indent the line since we're inside a try block
			debugLines = append(debugLines, "    "+line)
		}
	}

	// Add debug information capture
	debugLines = append(debugLines, `
    # Capture state after execution
    vars = get_variables()
    print("__DEBUG_START__")
    print(json.dumps({
        "variables": vars,
        "output": "",
        "line": `+fmt.Sprint(e.session.CurrentLine)+`
    }))
    print("__DEBUG_END__")`)

	// Add except block for error handling
	debugLines = append(debugLines, `
except Exception as e:
    print("__ERROR_START__")
    print(json.dumps({
        "error": str(e),
        "traceback": traceback.format_exc()
    }))
    print("__ERROR_END__")`)

	return strings.Join(debugLines, "\n")
}

func (e *Executor) parseOutput(output string) error {
	// Check for errors first
	if strings.Contains(output, "__ERROR_START__") {
		errorStart := strings.Index(output, "__ERROR_START__") + len("__ERROR_START__")
		errorEnd := strings.Index(output, "__ERROR_END__")
		errorJson := output[errorStart:errorEnd]

		var errorData struct {
			Error     string `json:"error"`
			Traceback string `json:"traceback"`
		}

		if err := json.Unmarshal([]byte(strings.TrimSpace(errorJson)), &errorData); err != nil {
			return utils.NewDebugError(e.session.CurrentLine, "Failed to parse error output", "ParseError")
		}

		e.session.Error = errorData.Error
		e.session.Status = "error"
		return utils.NewDebugError(e.session.CurrentLine, errorData.Error, "RuntimeError")
	}

	// Parse debug output
	debugStart := strings.Index(output, "__DEBUG_START__") + len("__DEBUG_START__")
	debugEnd := strings.Index(output, "__DEBUG_END__")
	if debugStart < 0 || debugEnd < 0 {
		return utils.NewDebugError(e.session.CurrentLine, "Failed to find debug output markers", "ParseError")
	}

	debugJson := output[debugStart:debugEnd]

	var debugData struct {
		Variables []models.Variable `json:"variables"`
		Output    string            `json:"output"`
		Line      int               `json:"line"`
	}

	if err := json.Unmarshal([]byte(strings.TrimSpace(debugJson)), &debugData); err != nil {
		return utils.NewDebugError(e.session.CurrentLine, "Failed to parse debug output", "ParseError")
	}

	e.session.Variables = debugData.Variables
	e.session.Output += debugData.Output

	return nil
}

func (e *Executor) Reset() {
	e.session.CurrentLine = 1
	e.session.Variables = make([]models.Variable, 0)
	e.session.Output = ""
	e.session.Error = ""
	e.session.Status = "initialized"
	e.session.UpdatedAt = time.Now()
}

func (e *Executor) GetSession() *models.DebugSession {
	return e.session
}
