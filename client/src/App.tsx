import { PokemonList } from "./components/PokemonList"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
        <div className="fixed top-4 right-4 z-50">
          <ModeToggle />
        </div>
        <PokemonList />
      </div>
      </ThemeProvider>
  )
}

export default App
