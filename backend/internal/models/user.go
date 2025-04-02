package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID           uint           `gorm:"primaryKey" json:"id"`
	Email        string         `gorm:"size:255;not null;uniqueIndex" json:"email"`
	PasswordHash string         `gorm:"size:255;not null" json:"-"` // Never expose in JSON
	FirstName    string         `gorm:"size:100" json:"first_name"`
	LastName     string         `gorm:"size:100" json:"last_name"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`

	// Relationships
	DebugSessions []DebugSession `gorm:"foreignKey:UserID" json:"-"`
}
