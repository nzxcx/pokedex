import { createRootRoute, Outlet } from '@tanstack/react-router'
import { NavDock } from '@/components/nav-dock'

export const Route = createRootRoute({
  component: () => {
    return (
      <div className="min-h-screen bg-background">
        <Outlet />
        <NavDock />
      </div>
    )
  },
})
