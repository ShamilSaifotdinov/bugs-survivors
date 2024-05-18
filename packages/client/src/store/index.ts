import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'

export type RootState = {
  user: Record<string, any>
}

const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

export default store
