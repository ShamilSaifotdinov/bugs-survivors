import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserInfo } from '../../api/basic/auth'
import { User } from '../../api/basic/types'
import { changeUserAvatar, changeUserProfile } from '../../api/basic/users'

type UserData = {
  user: Partial<User>
  status?: string | null
  error?: string | null
}

const initialData: UserData = {
  user: {
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    phone: '',
  },
  status: null,
  error: null,
}

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserInfo()
      return response
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)
export const changeProfile = createAsyncThunk(
  'user/changeProfile',
  async (data: Partial<User>, { rejectWithValue }) => {
    try {
      const response = changeUserProfile(data)
      return response
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const changeAvatar = createAsyncThunk(
  'user/changeAvatar',
  async (data: FormData, { rejectWithValue }) => {
    try {
      const response = changeUserAvatar(data)
      return response
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: initialData,
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
        state.error = action.payload as string
        alert(action.payload)
      }),
      builder.addCase(changeProfile.pending, state => {
        state.status = 'loading'
        state.error = null
      }),
      builder.addCase(changeProfile.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.user = action.payload
      }),
      builder.addCase(changeProfile.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload as string
      }),
      builder.addCase(changeAvatar.pending, state => {
        ;(state.status = 'loading'), (state.error = null)
      }),
      builder.addCase(changeAvatar.fulfilled, (state, action) => {
        ;(state.status = 'resolved'), (state.user = action.payload)
      }),
      builder.addCase(changeAvatar.rejected, (state, action) => {
        ;(state.status = 'rejected'), (state.error = action.payload as string)
      })
  },
})

export default userSlice.reducer
