import { createFileRoute, useParams } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { pokemonRepository } from "@/lib/repositories/pokemon.repository"
import { PokemonHeader } from "@/components/pokemon/pokemon-header"
import { PokemonSprite } from "@/components/pokemon/pokemon-sprite"
import { PokemonDetails } from "@/components/pokemon/pokemon-details"
import { PokemonHero } from "@/components/pokemon/pokemon-hero"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorDisplay } from "@/components/ui/error-display"

export const Route = createFileRoute('/pokemon/$number')({
  component: PokemonPage,
})

function PokemonPage() {
  const { number } = useParams({ from: '/pokemon/$number' })
  const pokemonNumber = parseInt(number)

  const { data: pokemon, isLoading, error } = useQuery({
    queryKey: ['pokemon', pokemonNumber],
    queryFn: () => pokemonRepository.getPokemonById(pokemonNumber),
  })

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error || !pokemon) {
    return <ErrorDisplay message="Failed to load Pokémon" />
  }

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="rounded-lg border bg-card/50 p-8">
          <PokemonHeader pokemon={pokemon} />
          <PokemonHero
            name={pokemon.name}
            frontImage={pokemon.sprites.front_image}
          />
        </section>

        {/* Details Section */}
        <section className="rounded-lg border bg-card p-8">
          <div className="space-y-8">
            <PokemonDetails height={pokemon.height} weight={pokemon.weight} />
            
            <div>
              <h2 className="mb-6 text-xl font-semibold">Sprites</h2>
              <PokemonSprite
                frontImage={pokemon.sprites.front_image}
                backImage={pokemon.sprites.back_image}
                name={pokemon.name}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 
