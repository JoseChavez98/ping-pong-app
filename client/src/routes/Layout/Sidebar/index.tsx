import { Box, Stack, useColorModeValue } from '@chakra-ui/react'
import { TriangleUpIcon, CalendarIcon, StarIcon } from '@chakra-ui/icons'
import SidebarItem from './SidebarItem'
import { useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()
  const bg = useColorModeValue('white', '#011627')
  return (
    <Stack
      id="sidebar"
      direction={{ base: 'row', md: 'column' }}
      w={{ base: 'auto', md: 'full' }}
      bg={{ md: bg }}
      p={4}
      borderRightRadius="lg"
      align="flex-start"
      spacing={{ base: 1, sm: 6 }}
      boxShadow={{ md: 'lg' }}
    >
      <Box w="full">
        <SidebarItem
          title={'Dashboard'}
          path={'/'}
          icon={TriangleUpIcon}
          selected={location.pathname === '/'}
        />
      </Box>
      <Box w="full">
        <SidebarItem
          title={'Games'}
          path={'/games'}
          icon={CalendarIcon}
          selected={location.pathname === '/games'}
        />
      </Box>
      <Box w="full">
        <SidebarItem
          title={'Players'}
          path={'/players'}
          icon={StarIcon}
          selected={location.pathname === '/players'}
        />
      </Box>
    </Stack>
  )
}

export default Sidebar
