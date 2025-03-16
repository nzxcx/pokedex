import { Link } from "@tanstack/react-router"
import { Home, List } from "lucide-react"
import { ThemeToggle } from "./theme/theme-toggle"

export function NavDock() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 flex gap-2 items-center rounded-2xl border border-background/20 bg-background/50 p-2 backdrop-blur-md z-50">
      <Link to="/" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted">
        <Home className="h-5 w-5 text-foreground/70" />
      </Link>
      <Link to="/list" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted">
        <List className="h-5 w-5 text-foreground/70" />
      </Link>
      <div className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted">
        <ThemeToggle />
      </div>
    </nav>
  )
} 
