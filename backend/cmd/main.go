// cmd/main.go
package main

import (
    "log"
    "github.com/gin-gonic/gin"
    "debugger/internal/handlers"
)

func main() {
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

    // Routes
    r.POST("/debug/start", handlers.StartDebugSession)
    r.POST("/debug/step/:id", handlers.StepDebugSession)
    r.POST("/debug/reset/:id", handlers.ResetDebugSession)
    r.GET("/debug/state/:id", handlers.GetDebugState)

    // Start server
    log.Fatal(r.Run(":8080"))
}