import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Pokemon } from "@/lib/types"

interface PokemonCardProps {
  pokemon: Pokemon
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Card className="group relative overflow-hidden border-0 bg-gradient-to-b from-card to-background hover:from-accent hover:to-accent/50 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-background/80 opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className="text-foreground font-medium capitalize tracking-tight">{pokemon.name}</span>
          <span className="text-sm text-muted-foreground font-mono">#{pokemon.id.toString().padStart(3, '0')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="relative group-hover:scale-105 transition-transform duration-300">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <img
              src={pokemon.image_url}
              alt={pokemon.name}
              className="relative w-40 h-40 object-contain drop-shadow-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 
