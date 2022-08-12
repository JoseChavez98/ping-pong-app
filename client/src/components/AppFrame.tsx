import { FC, ReactNode } from 'react'


const NAVBAR_HEIGHT = '48px'
const MOBILE_NAVBAR_HEIGHT = '64px'

const SIDEBAR_WIDTH = '256px'





type Props = {
  Sidebar: ReactNode,
  children: ReactNode,
}

const AppFrame: FC<Props> = ({
  children,
  Sidebar,
}) => {

  return (
    <div>
      <div
      >
        <div>{Sidebar}</div>
      </div>
      <section style={{ gridArea: 'content' }}>{children}</section>
    </div>
  )
}

export default AppFrame