import { Game } from '../../types'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'

interface GamesState {
  games: Game[]
}

const initialState: GamesState = {
  games: []
}

export const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setGames: (state, action) => {
      state.games = [...action.payload]
    },
    addGame: (state, action) => {
      state.games = [...state.games, action.payload]
    }
  }
})

export const { addGame, setGames } = playerSlice.actions

export const selectRecentGames = (state: RootState, quantity: number = 5) => {
  return quantity <= state.gamesReducer.games.length
    ? state.gamesReducer.games.slice().reverse().slice(0, quantity)
    : state.gamesReducer.games.slice().reverse()
}

export default playerSlice.reducer
