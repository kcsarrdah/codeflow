package handlers

import (
	"debugger/internal/models"
	"debugger/internal/repositories"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GetAllTestCases retrieves all test cases
func GetAllTestCases(c *gin.Context) {
	repo := repositories.NewTestCaseRepository()
	testCases, err := repo.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve test cases"})
		return
	}
	c.JSON(http.StatusOK, testCases)
}

// GetTestCaseByID retrieves a test case by ID
func GetTestCaseByID(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	repo := repositories.NewTestCaseRepository()
	testCase, err := repo.GetByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Test case not found"})
		return
	}

	c.JSON(http.StatusOK, testCase)
}

// CreateTestCase creates a new test case
func CreateTestCase(c *gin.Context) {
	var testCase models.TestCase
	if err := c.ShouldBindJSON(&testCase); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	repo := repositories.NewTestCaseRepository()
	if err := repo.Create(&testCase); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create test case"})
		return
	}

	c.JSON(http.StatusCreated, testCase)
}

// UpdateTestCase updates an existing test case
func UpdateTestCase(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	var testCase models.TestCase
	if err := c.ShouldBindJSON(&testCase); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	testCase.ID = uint(id)

	repo := repositories.NewTestCaseRepository()
	if err := repo.Update(&testCase); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update test case"})
		return
	}

	c.JSON(http.StatusOK, testCase)
}

// DeleteTestCase deletes a test case
func DeleteTestCase(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	repo := repositories.NewTestCaseRepository()
	if err := repo.Delete(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete test case"})
		return
	}

	c.JSON(http.StatusNoContent, nil)
}
