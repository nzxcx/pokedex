interface PokemonDetailsProps {
  height: number
  weight: number
}

export function PokemonDetails({ height, weight }: PokemonDetailsProps) {
  return (
    <div>
      <h2 className="mb-3 text-xl font-semibold">Details</h2>
      <dl className="space-y-2">
        <div className="flex gap-2">
          <dt className="w-24 text-muted-foreground">Height:</dt>
          <dd>{height}m</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-24 text-muted-foreground">Weight:</dt>
          <dd>{weight}kg</dd>
        </div>
      </dl>
    </div>
  )
} 
