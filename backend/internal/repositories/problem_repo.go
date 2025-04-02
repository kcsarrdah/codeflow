package repositories

import (
	"debugger/internal/database"
	"debugger/internal/models"
)

type ProblemRepository struct{}

func NewProblemRepository() *ProblemRepository {
	return &ProblemRepository{}
}

func (r *ProblemRepository) GetAll() ([]models.Problem, error) {
	var problems []models.Problem
	result := database.GetDB().Find(&problems)
	return problems, result.Error
}

func (r *ProblemRepository) GetByID(id uint) (models.Problem, error) {
	var problem models.Problem
	result := database.GetDB().First(&problem, id)
	return problem, result.Error
}

func (r *ProblemRepository) GetWithTestCases(id uint) (models.Problem, error) {
	var problem models.Problem
	result := database.GetDB().Preload("TestCases").First(&problem, id)
	return problem, result.Error
}

func (r *ProblemRepository) Create(problem *models.Problem) error {
	result := database.GetDB().Create(problem)
	return result.Error
}

func (r *ProblemRepository) Update(problem *models.Problem) error {
	result := database.GetDB().Save(problem)
	return result.Error
}

func (r *ProblemRepository) Delete(id uint) error {
	result := database.GetDB().Delete(&models.Problem{}, id)
	return result.Error
}
