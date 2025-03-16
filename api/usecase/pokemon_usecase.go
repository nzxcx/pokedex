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

func (uc *PokemonUseCase) ListPokemon(ctx context.Context, page, pageSize int) (*entities.PaginatedPokemonList, error) {
	if pageSize <= 0 {
		pageSize = 50 
	}
	if page <= 0 {
		page = 1 
	}

	offset := (page - 1) * pageSize
	return uc.pokemonRepo.ListPokemon(ctx, offset, pageSize)
}
