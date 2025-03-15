package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"pokeapp/api/models"
	"strconv"

	"github.com/labstack/echo/v4"
)

type PokemonHandler struct{}

func NewPokemonHandler() *PokemonHandler {
	return &PokemonHandler{}
}

func (h *PokemonHandler) GetPokemon(c echo.Context) error {
	id := c.Param("id")
	pokemonID, err := strconv.Atoi(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid Pokemon ID",
		})
	}

	url := fmt.Sprintf("https://pokeapi.co/api/v2/pokemon/%d", pokemonID)
	resp, err := http.Get(url)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to fetch Pokemon data",
		})
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusNotFound {
		return c.JSON(http.StatusNotFound, map[string]string{
			"error": "Pokemon not found",
		})
	}

	var pokemon models.Pokemon
	if err := json.NewDecoder(resp.Body).Decode(&pokemon); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to decode Pokemon data",
		})
	}

	return c.JSON(http.StatusOK, pokemon)
} 
