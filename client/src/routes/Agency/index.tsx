import { Outlet } from 'react-router-dom'

import AppFrame from '@/components/AppFrame'
import Sidebar from '@/routes/Agency/Sidebar'




const Agency = () => {

  return (
    <AppFrame
      Sidebar={<Sidebar />}
    >
        <Outlet />
    </AppFrame>
  )
}

export default Agency
