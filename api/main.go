package main

import (
	"log"

	"pokeapp/api/infrastructure/config"
	"pokeapp/api/infrastructure/repository"
	"pokeapp/api/interfaces/http/handlers"
	"pokeapp/api/interfaces/http/routes"
	"pokeapp/api/usecase"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	// Load configuration
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	// Initialize Echo
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	// Initialize dependencies
	pokemonRepo := repository.NewPokeAPIRepository()
	pokemonUseCase := usecase.NewPokemonUseCase(pokemonRepo)
	pokemonHandler := handlers.NewPokemonHandler(pokemonUseCase)

	// Setup routes
	routes.SetupRoutes(e, pokemonHandler)

	// Start server
	log.Printf("Server starting on %s", cfg.GetServerAddress())
	e.Logger.Fatal(e.Start(cfg.GetServerAddress()))
}
