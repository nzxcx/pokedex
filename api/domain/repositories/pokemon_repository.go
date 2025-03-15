package repositories

import (
	"context"
	"pokeapp/api/domain/entities"
)

type PokemonRepository interface {
	GetByID(ctx context.Context, id int) (*entities.Pokemon, error)
}
