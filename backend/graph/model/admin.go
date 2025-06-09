package model

type Admin struct {
	ID       uint   `gorm:"primaryKey"`
	Email    string `gorm:"uniqueIndex;not null"`
	Password string `gorm:"not null"`
}
