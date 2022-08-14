import {
  Badge,
  Box,
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Spacer,
  useDisclosure,
  useColorModeValue
} from '@chakra-ui/react'
import GameModal from '../../components/GameModal'
import { useGetGamesQuery } from '../../types'

const Games = () => {
  const { data: gamesData, loading: gamesLoading } = useGetGamesQuery({
    onError: (error: any) => {
      console.error(error)
    }
  })
  const bg = useColorModeValue('white', '#011627')

  const { isOpen, onOpen, onClose } = useDisclosure()
  const games = gamesData?.games ? gamesData?.games : []
  return (
    <Box bg={bg} mr={4} borderRadius="md" p={6} boxShadow="inner">
      <Flex w="full" py={5} px={6} align="center">
        <Text fontSize="3xl" fontWeight="medium">
          Games
        </Text>
        <Spacer />
        <Button
          colorScheme="teal"
          size={{ base: 'sm', md: 'md' }}
          onClick={onOpen}
        >
          New Game
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Description</Th>
              <Th>Player 1</Th>
              <Th>Player 2</Th>
              <Th>Winner</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {games &&
              games.map((game, index) => (
                <Tr key={index}>
                  <Td>{game?.details}</Td>
                  <Td>{`${game?.first_user.first_name} ${game?.first_user.last_name}`}</Td>
                  <Td>{`${game?.second_user.first_name} ${game?.second_user.last_name}`}</Td>
                  <Td fontWeight="bold">
                    {game?.completed
                      ? game?.winner_id === game?.first_user.id
                        ? game?.first_user.first_name
                        : game?.second_user.first_name
                      : '-'}
                  </Td>
                  <Td>
                    <Badge colorScheme={game?.completed ? 'green' : 'red'}>
                      {game?.completed ? 'Completed' : 'Suspended'}
                    </Badge>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <GameModal isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}

export default Games
