import { useRoutes } from 'react-router-dom'
import { RouteObject } from 'react-router'

import ROUTES from '@/routes/routes'


import Agency from '@/routes/Agency'
import Games from '@/routes/Games'
import Players from '@/routes/Players'

const publicRoutes: RouteObject[] = [
  // { path: ROUTES.players, element: <Home /> },
  { path: ROUTES.players, element: <Players /> },
  { path: ROUTES.games, element: <Games /> },
]

const routes: RouteObject[] = [
  {
    path: ROUTES.basePath,
    element: <Agency />,
    children: [...publicRoutes],
  },
]

const AppRouter = () => {
  const routing = useRoutes(routes)

  return routing
}

export default AppRouter
