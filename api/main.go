package main

import (
	"pokeapp/api/handlers"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	pokemonHandler := handlers.NewPokemonHandler()
	e.GET("/pokemon/:id", pokemonHandler.GetPokemon)

	e.Start(":8080")
} 
