/* eslint-disable react-hooks/exhaustive-deps */
// import { selectTopPlayers, winnedGames } from '../../store/slices/playerSlice'
import {
  Center,
  Grid,
  GridItem,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Text,
  Box,
  useColorModeValue
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { useGetPlayersQuery, useGetGamesQuery, User, Game } from '../../types'
import { CustomPlayerStats } from '../../store/slices/playerSlice'

export const calculateGamesStats = (
  user: User,
  gamesData: Game[]
): Omit<CustomPlayerStats, 'player'> => {
  if (gamesData) {
    const winnedGames = gamesData.filter((game) => game?.winner_id === user.id)
    const lostGames = gamesData.filter(
      (game) =>
        !winnedGames.includes(game) &&
        (game?.first_user.id === user.id || game?.second_user.id === user.id)
    )
    return { winned: winnedGames.length, lost: lostGames.length }
  }
  return { winned: 0, lost: 0 }
}

const Dashboard = () => {
  const bg = useColorModeValue('white', '#011627')

  const { data: playersData, loading: playersLoading } = useGetPlayersQuery({
    onError: (error: any) => {
      console.error(error)
    }
  })

  const { data: gamesData, loading: gamesLoading } = useGetGamesQuery({
    onError: (error: any) => {
      console.error(error)
    }
  })

  const players = playersData?.users
    ? (playersData.users as User[])
    : ([] as User[])

  const games = gamesData?.games ? (gamesData.games as Game[]) : ([] as Game[])

  const recentGames = gamesData?.games
    ? gamesData.games.slice().reverse().slice(0, 5)
    : []

  const top5Players = useMemo(
    () =>
      [
        ...players.map((player) => {
          return {
            player: { ...player },
            ...calculateGamesStats(player, games)
          }
        })
      ]
        .sort((a, b) => b.winned - a.winned)
        .slice(0, 5),
    [players, games]
  )

  return (
    <Box>
      <Center w="full" mr={4} mb={12}>
        <VStack spacing={'-1'}>
          <Text fontSize="3xl">Welcome to </Text>
          <Text fontSize="5xl" fontWeight="bold" align="center">
            Ping Pong Admin{' '}
          </Text>
        </VStack>
      </Center>
      <Grid templateColumns={{ base: '1fr', md: ' 1fr 1fr' }} gap={6}>
        <GridItem>
          <VStack bg={bg} borderRadius="md" p={6} boxShadow="lg" spacing={6}>
            <Text fontSize="2xl" fontWeight="semibold" align="center">
              Top Players
            </Text>
            <TableContainer overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Player</Th>
                    <Th isNumeric>Winnings</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {top5Players.map((player, index) => (
                    <Tr key={index}>
                      <Td>
                        {player.player.first_name} {player.player.last_name}
                      </Td>
                      <Td isNumeric>{player.winned}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>
        </GridItem>
        <GridItem>
          <VStack bg={bg} borderRadius="md" p={6} boxShadow="lg" spacing={6}>
            <Text fontSize="2xl" fontWeight="semibold">
              Recent Games
            </Text>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Description</Th>
                    <Th>Winner</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {recentGames &&
                    recentGames.map((game, index) => (
                      <Tr key={index}>
                        <Td>{game?.details}</Td>
                        <Td>
                          {
                            players.find(
                              (player) => player?.id === game?.winner_id
                            )?.first_name
                          }
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default Dashboard
