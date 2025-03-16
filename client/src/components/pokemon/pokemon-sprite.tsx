interface PokemonSpriteProps {
  frontImage: string
  backImage: string
  name: string
}

export function PokemonSprite({ frontImage, backImage, name }: PokemonSpriteProps) {
  return (
    <div className="flex gap-8 items-center justify-center">
      <div className="flex flex-col items-center">
        <img
          src={frontImage}
          alt={`${name} front view`}
          className="h-32 w-32"
        />
        <span className="mt-2 text-sm text-muted-foreground">Front View</span>
      </div>
      <div className="flex flex-col items-center">
        <img
          src={backImage}
          alt={`${name} back view`}
          className="h-32 w-32"
        />
        <span className="mt-2 text-sm text-muted-foreground">Back View</span>
      </div>
    </div>
  )
} 
