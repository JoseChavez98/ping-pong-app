import { User } from '../../types'
import { createSlice } from '@reduxjs/toolkit'

export interface CustomPlayerStats {
  player: User
  winned: number
  lost: number
}

interface CounterState {
  players: CustomPlayerStats[]
}

const initialState: CounterState = {
  players: []
}

export const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayers: (state, action) => {
      state.players = [...action.payload]
      console.log(state.players)
    },
    addPlayer: (state, action) => {
      state.players = [...state.players, action.payload]
    }
  }
})

export const { addPlayer, setPlayers } = playerSlice.actions

// export const selectTopPlayers = (state: RootState, quantity: number = 5) => {
//   const copyPlayers: User[] = [...state.playersReducer.players]
//   copyPlayers.sort(
//     (a: User, b: User) => b.won_games?.length - a.won_games?.length
//   )
//   return copyPlayers.slice(0, quantity)
// }

export default playerSlice.reducer
