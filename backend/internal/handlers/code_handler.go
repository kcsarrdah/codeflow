// backend/internal/handlers/code_handler.go
package handlers

import (
	"debugger/internal/parser"
	parsermodels "debugger/internal/parser/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// AnalyzeCode creates a new handler for code analysis
// It takes a parser client as a dependency and returns a gin handler function
func AnalyzeCode(parserClient parser.ParserClient) gin.HandlerFunc {
	return func(c *gin.Context) {
		var request parsermodels.ParseRequest
		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error":   "Invalid request format",
				"details": err.Error(),
			})
			return
		}

		// Validate required fields
		if request.Code == "" {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Code cannot be empty",
			})
			return
		}

		// Default to python if language is not specified
		if request.Language == "" {
			request.Language = "python"
		}

		// Validate language support
		if request.Language != "python" {
			c.JSON(http.StatusBadRequest, gin.H{
				"error":   "Unsupported language",
				"details": "Currently only Python is supported",
			})
			return
		}

		// Parse the code using the parser service
		response, err := parserClient.Parse(request)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error":   "Failed to parse code",
				"details": err.Error(),
			})
			return
		}

		// Return the analysis results
		c.JSON(http.StatusOK, response)
	}
}
