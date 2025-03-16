package handlers

import (
	"fmt"
	"net/http"
	"pokeapp/api/usecase"
	"strconv"

	"github.com/labstack/echo/v4"
)

type PokemonHandler struct {
	pokemonUseCase *usecase.PokemonUseCase
}

func NewPokemonHandler(useCase *usecase.PokemonUseCase) *PokemonHandler {
	return &PokemonHandler{
		pokemonUseCase: useCase,
	}
}

func (h *PokemonHandler) GetPokemon(c echo.Context) error {
	id := c.Param("id")
	pokemonID, err := strconv.Atoi(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid Pokemon ID",
		})
	}

	pokemon, err := h.pokemonUseCase.GetPokemon(c.Request().Context(), pokemonID)
	if err != nil {
		if err.Error() == fmt.Sprintf("pokemon with id %d not found", pokemonID) {
			return c.JSON(http.StatusNotFound, map[string]string{
				"error": "Pokemon not found",
			})
		}
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to fetch Pokemon data",
		})
	}

	return c.JSON(http.StatusOK, pokemon)
}

func (h *PokemonHandler) ListPokemon(c echo.Context) error {
	page, err := strconv.Atoi(c.QueryParam("page"))
	if err != nil || page < 1 {
		page = 1
	}

	pageSize, err := strconv.Atoi(c.QueryParam("pageSize"))
	if err != nil || pageSize < 1 || pageSize > 100 {
		pageSize = 50
	}

	pokemons, err := h.pokemonUseCase.ListPokemon(c.Request().Context(), page, pageSize)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to fetch Pokemon list",
		})
	}

	return c.JSON(http.StatusOK, pokemons)
}
