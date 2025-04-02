package repositories

import (
	"debugger/internal/database"
	"debugger/internal/models"
)

type TestCaseRepository struct{}

func NewTestCaseRepository() *TestCaseRepository {
	return &TestCaseRepository{}
}

func (r *TestCaseRepository) GetAll() ([]models.TestCase, error) {
	var testCases []models.TestCase
	result := database.GetDB().Find(&testCases)
	return testCases, result.Error
}

func (r *TestCaseRepository) GetByID(id uint) (models.TestCase, error) {
	var testCase models.TestCase
	result := database.GetDB().First(&testCase, id)
	return testCase, result.Error
}

func (r *TestCaseRepository) GetByAlgorithmType(algoType string) ([]models.TestCase, error) {
	var testCases []models.TestCase
	result := database.GetDB().Where("algorithm_type = ?", algoType).Find(&testCases)
	return testCases, result.Error
}

func (r *TestCaseRepository) Create(testCase *models.TestCase) error {
	result := database.GetDB().Create(testCase)
	return result.Error
}

func (r *TestCaseRepository) Update(testCase *models.TestCase) error {
	result := database.GetDB().Save(testCase)
	return result.Error
}

func (r *TestCaseRepository) Delete(id uint) error {
	result := database.GetDB().Delete(&models.TestCase{}, id)
	return result.Error
}
