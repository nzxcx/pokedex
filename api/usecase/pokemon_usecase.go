package usecase

import (
	"context"
	"pokeapp/api/domain/entities"
	"pokeapp/api/domain/repositories"
)

type PokemonUseCase struct {
	pokemonRepo repositories.PokemonRepository
}

func NewPokemonUseCase(repo repositories.PokemonRepository) *PokemonUseCase {
	return &PokemonUseCase{
		pokemonRepo: repo,
	}
}

func (uc *PokemonUseCase) GetPokemon(ctx context.Context, id int) (*entities.Pokemon, error) {
	return uc.pokemonRepo.GetByID(ctx, id)
}
