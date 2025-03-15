package repository

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"pokeapp/api/domain/entities"
	"pokeapp/api/infrastructure/dto"
)

type PokeAPIRepository struct {
	baseURL string
}

func NewPokeAPIRepository() *PokeAPIRepository {
	return &PokeAPIRepository{
		baseURL: "https://pokeapi.co/api/v2",
	}
}

func (r *PokeAPIRepository) GetByID(ctx context.Context, id int) (*entities.Pokemon, error) {
	url := fmt.Sprintf("%s/pokemon/%d", r.baseURL, id)

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return nil, fmt.Errorf("error creating request: %w", err)
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("error making request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusNotFound {
		return nil, fmt.Errorf("pokemon with id %d not found", id)
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var pokemonDTO dto.PokemonDTO
	if err := json.NewDecoder(resp.Body).Decode(&pokemonDTO); err != nil {
		return nil, fmt.Errorf("error decoding response: %w", err)
	}

	return pokemonDTO.ToEntity(), nil
}
