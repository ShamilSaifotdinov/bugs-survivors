import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

export type RootState = {
  user: {
    user: Record<string, string>
  }
}

export default configureStore({
  reducer: {
    user: userReducer,
  },
})
