/* eslint-disable react-hooks/exhaustive-deps */
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Badge,
  Box,
  Link,
  Button,
  Flex,
  Spacer,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { Game, useGetGamesQuery, useGetPlayersQuery, User } from '../../types'
import { calculateGamesStats } from '../Dashboard'

const Players = () => {
  const [byWinners, setByWinners] = useState<boolean>(true)
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

  const sortedPlayers = useMemo(
    () =>
      [
        ...players.map((player) => {
          return {
            player: { ...player },
            ...calculateGamesStats(player, games)
          }
        })
      ].sort((a, b) => {
        return byWinners ? b.winned - a.winned : b.lost - a.lost
      }),
    [players, games, byWinners]
  )

  return (
    <Box bg={bg} mr={4} borderRadius="md" p={6} boxShadow="inner">
      <Flex w="full" py={5} px={6} align="center">
        <Text fontSize="3xl" fontWeight="medium">
          Players
        </Text>
        <Spacer />
        <Button
          colorScheme="teal"
          size={{ base: 'sm', md: 'md' }}
          onClick={() => setByWinners(!byWinners)}
        >
          {byWinners ? 'Sort by Lost' : 'Sort by Won'}
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Email</Th>
              <Th>Gender</Th>
              <Th isNumeric>Win</Th>
              <Th isNumeric>Lost</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedPlayers &&
              sortedPlayers.map((player, index) => (
                <Tr key={index}>
                  <Td>{player.player.first_name}</Td>
                  <Td>{player.player.last_name}</Td>
                  <Td>
                    <Link href={`mailto:${player.player.email}`}>
                      {player.player.email}
                    </Link>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={
                        player.player.gender === 'Male' ? 'teal' : 'purple'
                      }
                    >
                      {player.player.gender}
                    </Badge>
                  </Td>
                  <Td isNumeric>{player.winned}</Td>
                  <Td isNumeric>{player.lost}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Players
