package pokeapi

import (
	"fmt"
	"pokeapp/api/domain/entities"
	"strconv"
	"strings"
)

func extractIDFromURL(url string) int {
	// URL format: "https://pokeapi.co/api/v2/pokemon/1/"
	parts := strings.Split(strings.TrimRight(url, "/"), "/")
	if len(parts) > 0 {
		if id, err := strconv.Atoi(parts[len(parts)-1]); err == nil {
			return id
		}
	}
	return 0
}

func getOfficialArtworkURL(id int) string {
	return fmt.Sprintf("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/%d.png", id)
}

func (r *ListPokemonResponse) ToEntity() *entities.PaginatedPokemonList {
	items := make([]entities.PokemonListItem, len(r.Results))
	for i, pokemon := range r.Results {
		id := extractIDFromURL(pokemon.URL)
		items[i] = entities.PokemonListItem{
			ID:       id,
			Name:     pokemon.Name,
			DetailURL: pokemon.URL,
			ImageURL:  getOfficialArtworkURL(id),
		}
	}

	var next, prev *string
	if r.Next != "" {
		next = &r.Next
	}
	if r.Previous != "" {
		prev = &r.Previous
	}

	return &entities.PaginatedPokemonList{
		Total:    r.Count,
		NextPage: next,
		PrevPage: prev,
		Items:    items,
	}
}

func (p *PokemonResponse) ToEntity() *entities.Pokemon {
	types := make([]string, len(p.Types))
	for i, t := range p.Types {
		types[i] = t.Type.Name
	}

	return &entities.Pokemon{
		ID:     p.ID,
		Name:   p.Name,
		Types:  types,
		Height: float64(p.Height) / 10, // Convert to meters
		Weight: float64(p.Weight) / 10, // Convert to kilograms
		Sprites: entities.PokemonSprites{
			FrontImage: p.Sprites.FrontDefault,
			BackImage:  p.Sprites.BackDefault,
		},
	}
} 
