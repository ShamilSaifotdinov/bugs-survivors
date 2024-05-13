import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../api/basic/types'
import { getUserInfo } from '../api/basic/auth'
import { changeUserProfile, changeUserAvatar } from '../api/basic/users'

export type UserData = {
  user: Partial<User>
  status?: string | null
  error?: string | null
}

const initialState: UserData = {
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
  async function (_, { rejectWithValue }) {
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
  async function (profile: Partial<User>, { rejectWithValue }) {
    try {
      const response = await changeUserProfile(profile)
      return response
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const changeAvatar = createAsyncThunk(
  'user/changeAvatar',
  async function (payload: FormData, { rejectWithValue }) {
    try {
      const response = await changeUserAvatar(payload)
      return response
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setFirstname: (state, action: PayloadAction<string>) => {
      state.user.first_name = action.payload
    },
    setSecondname: (state, action: PayloadAction<string>) => {
      state.user.second_name = action.payload
    },
    setLogin: (state, action: PayloadAction<string>) => {
      state.user.login = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.user.email = action.payload
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.user.phone = action.payload
    },
  },
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
      builder.addCase(changeAvatar.pending, state => {
        state.status = 'loading'
        state.error = null
      }),
      builder.addCase(changeAvatar.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.user = action.payload
      }),
      builder.addCase(changeAvatar.rejected, (state, action) => {
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
        state.user = action.payload as Partial<User>
      }),
      builder.addCase(changeProfile.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload as string
        alert(action.payload)
      })
  },
})

export const { setFirstname, setSecondname, setLogin, setEmail, setPhone } =
  userSlice.actions
export default userSlice.reducer
