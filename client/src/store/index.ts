import { configureStore } from '@reduxjs/toolkit'
import PlayersReducer from './slices/playerSlice'
import GamesReducer from './slices/gameSlice'

export const store = configureStore({
  reducer: {
    gamesReducer: GamesReducer,
    playersReducer: PlayersReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
