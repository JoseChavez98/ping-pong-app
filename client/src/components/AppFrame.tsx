import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  Hide,
  HStack,
  IconButton,
  Show,
  useColorMode
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { FC, ReactNode } from 'react'

const SIDEBAR_WIDTH = '210px'

type Props = {
  Sidebar: ReactNode
  children: ReactNode
}

const AppFrame: FC<Props> = ({ children, Sidebar }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box>
      <Grid
        templateAreas={{
          base: `"header"
                "main"`,
          md: `"header header"
              "side main"`
        }}
        templateColumns={{ base: 'auto', md: `${SIDEBAR_WIDTH} auto` }}
        gridTemplateRows={{ base: '30px 1fr', md: '50px 1fr' }}
        gap={{ base: 10, md: 4 }}
        h="auto"
        w="full"
      >
        <GridItem area={'header'} px={4} py={2}>
          <Flex w="full" justify={{ base: 'space-between', md: 'flex-end' }}>
            <Show below="md">{Sidebar}</Show>
            <HStack spacing={2}>
              {/* <Button>Toggle {colorMode === 'light' ? 'Dark' : 'Light'}</Button> */}
              <IconButton
                onClick={toggleColorMode}
                variant="ghost"
                aria-label="change theme"
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              />
              <Avatar bg="teal.500" cursor="pointer" />
            </HStack>
          </Flex>
        </GridItem>
        <Hide below="md">
          <GridItem area={'side'}>{Sidebar}</GridItem>
        </Hide>
        <GridItem area={'main'} px={4} py={2} overflowX="auto">
          {children}
        </GridItem>
      </Grid>
    </Box>
  )
}

export default AppFrame
