package db

import (
	"backend/graph/model"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	var err error
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database")
	}
	DB = db
	db.AutoMigrate(&model.Book{})
}

func GetDB() *gorm.DB {
	return DB
}
