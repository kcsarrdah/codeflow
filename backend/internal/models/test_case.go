package models

import (
	"time"

	"gorm.io/gorm"
)

type TestCase struct {
	ID             uint           `gorm:"primaryKey" json:"id"`
	Title          string         `gorm:"size:255;not null" json:"title"`
	Description    string         `gorm:"type:text" json:"description"`
	AlgorithmType  string         `gorm:"size:100;not null" json:"algorithm_type"`
	InputData      string         `gorm:"type:jsonb" json:"input_data"` // Stored as JSON
	ExpectedOutput string         `gorm:"type:jsonb" json:"expected_output"`
	Difficulty     string         `gorm:"size:50" json:"difficulty"`
	ProblemID      uint           `json:"problem_id"`
	CreatedAt      time.Time      `json:"created_at"`
	UpdatedAt      time.Time      `json:"updated_at"`
	DeletedAt      gorm.DeletedAt `gorm:"index" json:"-"`
}
