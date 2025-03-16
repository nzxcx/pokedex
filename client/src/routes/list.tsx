import { createFileRoute } from '@tanstack/react-router'
import { PokemonList } from '@/components/pokemon-list'
import { ThemeToggle } from '@/components/theme/theme-toggle'

export const Route = createFileRoute('/list')({
  component: ListPage,
})

function ListPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <PokemonList />
    </div>
  )
} 
