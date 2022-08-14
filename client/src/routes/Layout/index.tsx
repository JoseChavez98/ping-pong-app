import { Outlet } from 'react-router-dom'
import AppFrame from '../../components/AppFrame'
import Sidebar from './Sidebar'

const Layout = () => {
  return (
    <AppFrame Sidebar={<Sidebar />}>
      <Outlet />
    </AppFrame>
  )
}

export default Layout
