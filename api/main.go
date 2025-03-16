package main

import (
	"pokeapp/api/infrastructure/repository"
	"pokeapp/api/interfaces/http/handlers"
	"pokeapp/api/interfaces/http/routes"
	"pokeapp/api/usecase"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
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
	e.Logger.Fatal(e.Start(":8080"))
}
