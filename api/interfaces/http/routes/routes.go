package routes

import (
	"pokeapp/api/interfaces/http/handlers"

	"github.com/labstack/echo/v4"
)

func SetupRoutes(e *echo.Echo, pokemonHandler *handlers.PokemonHandler) {
	e.GET("/pokemon", pokemonHandler.ListPokemon)
	e.GET("/pokemon/:id", pokemonHandler.GetPokemon)
} 
