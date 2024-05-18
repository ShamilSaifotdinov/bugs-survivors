import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'

export type RootState = {
  [key in string]: any
}

const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

export default store
