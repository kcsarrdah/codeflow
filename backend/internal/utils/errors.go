package utils

import "fmt"

type DebugError struct {
	Line    int    `json:"line"`
	Message string `json:"message"`
	Type    string `json:"type"`
}

func NewDebugError(line int, message string, errorType string) *DebugError {
	return &DebugError{
		Line:    line,
		Message: message,
		Type:    errorType,
	}
}

func (e *DebugError) Error() string {
	return fmt.Sprintf("Error at line %d: %s (%s)", e.Line, e.Message, e.Type)
}
