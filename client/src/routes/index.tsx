import { useRoutes } from 'react-router-dom'
import { RouteObject } from 'react-router'
import Layout from './Layout'
import Games from './Games'
import Players from './Players'

import ROUTES from './routes'
import Dashboard from './Dashboard'

const publicRoutes: RouteObject[] = [
  { path: ROUTES.basePath, element: <Dashboard /> },
  { path: ROUTES.players, element: <Players /> },
  { path: ROUTES.games, element: <Games /> }
]

const routes: RouteObject[] = [
  {
    path: ROUTES.basePath,
    element: <Layout />,
    children: [...publicRoutes]
  }
]

const AppRouter = () => {
  const routing = useRoutes(routes)

  return routing
}

export default AppRouter
