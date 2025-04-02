package models

import (
	"time"

	"gorm.io/gorm"
)

type Problem struct {
	ID            uint           `gorm:"primaryKey" json:"id"`
	Title         string         `gorm:"size:255;not null" json:"title"`
	Description   string         `gorm:"type:text;not null" json:"description"`
	AlgorithmType string         `gorm:"size:100;not null" json:"algorithm_type"`
	Difficulty    string         `gorm:"size:50;not null" json:"difficulty"` // Easy, Medium, Hard
	Hints         string         `gorm:"type:jsonb" json:"hints"`            // JSON array of hints
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`
	DeletedAt     gorm.DeletedAt `gorm:"index" json:"-"`

	// Relationships
	TestCases     []TestCase     `gorm:"foreignKey:ProblemID" json:"test_cases,omitempty"`
	DebugSessions []DebugSession `gorm:"foreignKey:ProblemID" json:"-"`
}
