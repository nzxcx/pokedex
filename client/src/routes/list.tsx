import { createFileRoute } from '@tanstack/react-router'
import { PokemonList } from '@/components/pokemon-list/pokemon-list'

export const Route = createFileRoute('/list')({
  component: ListPage,
})

function ListPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <PokemonList />
    </div>
  )
} 
  // Add any other fields needed for the list view
