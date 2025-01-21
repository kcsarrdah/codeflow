// Handles HTTP endpoints for:
// - Starting a new debug session with Python code
// - Executing next step
// - Getting current variable states
// - Reset session

// internal/handlers/debug_handler.go
// internal/handlers/debug_handler.go
package handlers

import (
	"debugger/internal/services/debugger"

	"github.com/gin-gonic/gin"
)

// Store sessions in memory for now
var sessions = make(map[string]*debugger.Executor)

func StartDebugSession(c *gin.Context) {
	var req struct {
		Code string `json:"code" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request: code is required"})
		return
	}

	executor, err := debugger.NewExecutor(req.Code)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	session := executor.GetSession()
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
