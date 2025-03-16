import { Pokemon } from "@/lib/types/pokemon.types"
import { PokemonTypeBadge } from "./pokemon-type-badge"

interface PokemonHeaderProps {
  pokemon: Pokemon
}

export function PokemonHeader({ pokemon }: PokemonHeaderProps) {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold capitalize">
        {pokemon.name}
        <span className="ml-3 text-muted-foreground">#{pokemon.id}</span>
      </h1>
      <div className="mt-4 flex justify-center gap-3">
        {pokemon.types.map((type) => (
          <PokemonTypeBadge key={type} type={type} size="lg" />
        ))}
      </div>
    </div>
  )
} 
