package main

import (
	"backend/db"
	"backend/graph"
	"backend/graph/model" // ✅ ADD THIS
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/rs/cors"
	"github.com/gorilla/mux"
	"github.com/99designs/gqlgen/graphql/playground"
)

const defaultPort = "8080"

func main() {
	// ✅ Initialize DB
	db.InitDB()

	// ✅ RUN MIGRATION (THIS IS THE FIX)
	database := db.GetDB()
	err := database.AutoMigrate(&model.Book{})
	if err != nil {
		log.Fatal("Migration failed: ", err)
	}

	log.Println("Migration completed successfully")

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	srv := handler.NewDefaultServer(
		graph.NewExecutableSchema(
			graph.Config{Resolvers: &graph.Resolver{}},
		),
	)

	router := mux.NewRouter()

	// Serve images from backend/images folder
	router.PathPrefix("/images/").Handler(
    	http.StripPrefix("/images/", http.FileServer(http.Dir("./images"))),
	)

	// GraphQL routes
	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)

	// Enable CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
	})

	handlerWithCORS := c.Handler(router)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, handlerWithCORS))
}