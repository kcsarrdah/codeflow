// cmd/main.go
package main

import (
	"debugger/internal/database"
	"debugger/internal/handlers"
	"debugger/internal/parser"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {

	db, err := database.Initialize()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	if err := database.RunMigrations((db)); err != nil {
		log.Fatalf("Failed to run migrations: %v", err)
	}

	// Initialize router
	r := gin.Default()

	// CORS middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Initialize parser service client
	parserURL := os.Getenv("PARSER_SERVICE_URL")
	if parserURL == "" {
		parserURL = "http://localhost:8000" // Default to localhost for local development
	}
	parserClient := parser.NewPythonParserClient(parserURL)

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Server is healthy"})
	})

	// Routes
	r.POST("/code/analyze", handlers.AnalyzeCode(parserClient)) // Only register once
	r.POST("/debug/start", handlers.StartDebugSession)
	r.POST("/debug/step/:id", handlers.StepDebugSession)
	r.POST("/debug/reset/:id", handlers.ResetDebugSession)
	r.GET("/debug/state/:id", handlers.GetDebugState)

	// Problem routes
	r.GET("/api/problems", handlers.GetAllProblems)
	r.POST("/api/problems", handlers.CreateProblem)
	r.GET("/api/problems/:id", handlers.GetProblemByID)
	r.PUT("/api/problems/:id", handlers.UpdateProblem)
	r.DELETE("/api/problems/:id", handlers.DeleteProblem)

	// Test case routes
	r.GET("/api/test-cases", handlers.GetAllTestCases)
	r.POST("/api/test-cases", handlers.CreateTestCase)
	r.GET("/api/test-cases/:id", handlers.GetTestCaseByID)
	r.PUT("/api/test-cases/:id", handlers.UpdateTestCase)
	r.DELETE("/api/test-cases/:id", handlers.DeleteTestCase)

	// Start server
	log.Fatal(r.Run(":8080"))
}
