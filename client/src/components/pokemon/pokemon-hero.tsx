interface PokemonHeroProps {
  name: string
  frontImage: string
}

export function PokemonHero({ name, frontImage }: PokemonHeroProps) {
  return (
    <div className="relative flex flex-col items-center justify-center py-12">
      <img
        src={frontImage}
        alt={`${name}`}
        className="h-64 w-64 object-contain"
      />
    </div>
  )
} 
