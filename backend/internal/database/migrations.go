package database

import (
	"debugger/internal/models"
	"log"

	"gorm.io/gorm"
)

// RunMigrations automatically creates or updates database tables
func RunMigrations(db *gorm.DB) error {
	log.Println("Running database migrations...")

	// Add all models here
	err := db.AutoMigrate(
		&models.User{},
		&models.Problem{},
		&models.TestCase{},
		&models.DebugSession{},
	)

	if err != nil {
		return err
	}

	log.Println("Migrations completed successfully")
	return nil
}
