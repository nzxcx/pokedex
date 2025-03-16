import { createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => {
    return (
      <div>
        <Outlet />
      </div>
    )
  },
})

import { Outlet } from '@tanstack/react-router' 
