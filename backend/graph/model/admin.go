package model

// Admin is the model for the admin user. the reason for creating this model is to store the admin user details in the database. these details not passed to the frontend. Creadintials check in the backend part, did not send to the frontend.
//As that reason, we need to create a model for the admin user.

type Admin struct {
	ID       uint   `gorm:"primaryKey"`
	Email    string `gorm:"uniqueIndex;not null"`
	Password string `gorm:"not null"`
}
