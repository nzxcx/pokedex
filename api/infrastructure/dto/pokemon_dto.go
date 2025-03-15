package dto

import "pokeapp/api/domain/entities"

type PokemonDTO struct {
	ID      int        `json:"id"`
	Name    string     `json:"name"`
	Types   []TypeDTO  `json:"types"`
	Height  int        `json:"height"`
	Weight  int        `json:"weight"`
	Sprites SpritesDTO `json:"sprites"`
}

type TypeDTO struct {
	Slot int `json:"slot"`
	Type struct {
		Name string `json:"name"`
		URL  string `json:"url"`
	} `json:"type"`
}

type SpritesDTO struct {
	FrontDefault string `json:"front_default"`
	BackDefault  string `json:"back_default"`
}

func (dto *PokemonDTO) ToEntity() *entities.Pokemon {
	types := make([]string, len(dto.Types))
	for i, t := range dto.Types {
		types[i] = t.Type.Name
	}

	return &entities.Pokemon{
		ID:     dto.ID,
		Name:   dto.Name,
		Types:  types,
		Height: float64(dto.Height) / 10,
		Weight: float64(dto.Weight) / 10,
		Sprites: entities.PokemonSprites{
			FrontImage: dto.Sprites.FrontDefault,
			BackImage:  dto.Sprites.BackDefault,
		},
	}
}
