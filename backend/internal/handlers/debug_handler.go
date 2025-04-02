// Handles HTTP endpoints for:
// - Starting a new debug session with Python code
// - Executing next step
// - Getting current variable states
// - Reset session

// internal/handlers/debug_handler.go
// internal/handlers/debug_handler.go
package handlers

import (
	"debugger/internal/parser"
	"debugger/internal/parser/models"
	"debugger/internal/services/debugger"

	"github.com/gin-gonic/gin"
)

// Store sessions in memory for now
var sessions = make(map[string]*debugger.Executor)

// In StartDebugSession function
func StartDebugSession(c *gin.Context) {
	var request struct {
		Code string `json:"code"`
	}

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// First, parse the code using the parser service
	parserClient := parser.NewPythonParserClient("http://parser:8000")
	parseResult, err := parserClient.Parse(parsermodels.ParseRequest{
		Code:     request.Code,
		Language: "python",
	})

	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to parse code: " + err.Error()})
		return
	}

	// Create a new executor with the parse results
	executor, err := debugger.NewExecutor(request.Code, parseResult)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// Store the session (keep your existing session storage logic)
	session := executor.GetSession()
	// Save the session (use your existing code)
	sessions[session.ID] = executor

	c.JSON(200, session)
}

func StepDebugSession(c *gin.Context) {
	sessionID := c.Param("id")

	executor, exists := sessions[sessionID]
	if !exists {
		c.JSON(404, gin.H{"error": "Session not found"})
		return
	}

	session, err := executor.Step()
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, session)
}

func ResetDebugSession(c *gin.Context) {
	sessionID := c.Param("id")

	executor, exists := sessions[sessionID]
	if !exists {
		c.JSON(404, gin.H{"error": "Session not found"})
		return
	}

	executor.Reset()
	c.JSON(200, executor.GetSession())
}

func GetDebugState(c *gin.Context) {
	sessionID := c.Param("id")

	executor, exists := sessions[sessionID]
	if !exists {
		c.JSON(404, gin.H{"error": "Session not found"})
		return
	}

	c.JSON(200, executor.GetSession())
}
