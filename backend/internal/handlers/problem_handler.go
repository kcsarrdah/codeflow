package handlers

import (
	"debugger/internal/models"
	"debugger/internal/repositories"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GetAllProblems retrieves all problems
func GetAllProblems(c *gin.Context) {
	repo := repositories.NewProblemRepository()
	problems, err := repo.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve problems"})
		return
	}
	c.JSON(http.StatusOK, problems)
}

// GetProblemByID retrieves a problem by ID
func GetProblemByID(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	repo := repositories.NewProblemRepository()
	problem, err := repo.GetByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Problem not found"})
		return
	}

	c.JSON(http.StatusOK, problem)
}

// CreateProblem creates a new problem
func CreateProblem(c *gin.Context) {
	var problem models.Problem
	if err := c.ShouldBindJSON(&problem); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	repo := repositories.NewProblemRepository()
	if err := repo.Create(&problem); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create problem"})
		return
	}

	c.JSON(http.StatusCreated, problem)
}

// UpdateProblem updates an existing problem
func UpdateProblem(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	var problem models.Problem
	if err := c.ShouldBindJSON(&problem); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	problem.ID = uint(id)

	repo := repositories.NewProblemRepository()
	if err := repo.Update(&problem); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update problem"})
		return
	}

	c.JSON(http.StatusOK, problem)
}

// DeleteProblem deletes a problem
func DeleteProblem(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	repo := repositories.NewProblemRepository()
	if err := repo.Delete(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete problem"})
		return
	}

	c.JSON(http.StatusNoContent, nil)
}
