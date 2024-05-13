import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '../api/basic/types'
import { getUserInfo, signIn, SignInData } from '../api/basic/auth'
import { changeUserProfile, changeUserAvatar } from '../api/basic/users'

export type UserData = {
  user: Partial<User>
  status?: string
  error?: string | null
}

const initialState = {
  first_name: '',
  second_name: '',
  login: '',
  password: '',
  email: '',
  phone: '',
}

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async function (_, { rejectWithValue }) {
    try {
      const user = await getUserInfo()
      return user
    } catch (error) {
      return rejectWithValue(error.response.reason)
    }
  }
)

export const changeAvatar = createAsyncThunk(
  'user/changeAvatar',
  async function (payload: FormData) {
    const user = await changeUserAvatar(payload)
    return user
  }
)

const userSlice = createSlice<UserData, any, 'user', any>({
  name: 'user',
  initialState: {
    user: initialState,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => {
      state.status = 'loading'
      state.error = null
    }),
      builder.addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.user = action.payload
      }),
      builder.addCase(fetchUser.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload
      }),
      builder.addCase(changeAvatar.fulfilled, (state, action) => {
        state.user = action.payload
      })
  },
})

export const { changeProfileData } = userSlice.actions
export default userSlice.reducer
