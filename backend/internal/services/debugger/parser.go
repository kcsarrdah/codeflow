// Handles:
// - Breaking code into executable lines
// - Identifying variable declarations
// - Adding debug statements automatically
// - Syntax validation

package debugger

import (
    "strings"
    "debugger/internal/utils"
)

type Parser struct {
    code     string
    lines    []string
}

func NewParser(code string) *Parser {
    return &Parser{
        code:  code,
        lines: strings.Split(code, "\n"),
    }
}

func (p *Parser) ValidateCode() error {
    if strings.TrimSpace(p.code) == "" {
        return utils.NewDebugError(0, "Code cannot be empty", "ValidationError")
    }
    return nil
}

func (p *Parser) GetLines() []string {
    return p.lines
}

func (p *Parser) PrepareForDebug() string {
    // Add debug statements and imports
    debugLines := []string{
        "import sys",
        "import json",
        "import inspect",
    }
    debugLines = append(debugLines, p.lines...)
    return strings.Join(debugLines, "\n")
}