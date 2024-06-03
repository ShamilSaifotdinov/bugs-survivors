import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserInfo, logOut } from '../../api/basic/auth'
import { User } from '../../api/basic/types'
import { changeUserAvatar, changeUserProfile } from '../../api/basic/users'

type UserData = {
  user: Partial<User>
  status?: string | null
  error?: string | null
}

const initialData: UserData = {
  user: {
    id: undefined,
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    phone: '',
  },
  status: null,
  error: null,
}

export const fetchUser = createAsyncThunk<
  User,
  undefined,
  { rejectValue: string }
>('user/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const response = await getUserInfo()
    return response
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const logOutUser = createAsyncThunk<
  undefined,
  undefined,
  { rejectValue: string }
>('user/logOutUser', async (_, { rejectWithValue }) => {
  try {
    await logOut()
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const changeProfile = createAsyncThunk<
  User,
  Partial<User>,
  { rejectValue: string }
>('user/changeProfile', async (data, { rejectWithValue }) => {
  try {
    const response = changeUserProfile(data)
    return response
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const changeAvatar = createAsyncThunk<
  User,
  FormData,
  { rejectValue: string }
>('user/changeAvatar', async (data, { rejectWithValue }) => {
  try {
    const response = changeUserAvatar(data)
    return response
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState: initialData,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.user = action.payload
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload
      }),
      builder
        .addCase(logOutUser.pending, state => {
          state.status = 'loading'
          state.error = null
        })
        .addCase(logOutUser.fulfilled, state => {
          state.status = 'resolved'
          state.user = initialData.user
        })
        .addCase(logOutUser.rejected, (state, action) => {
          state.status = 'rejected'
          state.error = action.payload
        }),
      builder
        .addCase(changeProfile.pending, state => {
          state.status = 'loading'
          state.error = null
        })
        .addCase(changeProfile.fulfilled, (state, action) => {
          state.status = 'resolved'
          state.user = action.payload
        })
        .addCase(changeProfile.rejected, (state, action) => {
          state.status = 'rejected'
          state.error = action.payload
        }),
      builder
        .addCase(changeAvatar.pending, state => {
          ;(state.status = 'loading'), (state.error = null)
        })
        .addCase(changeAvatar.fulfilled, (state, action) => {
          ;(state.status = 'resolved'), (state.user = action.payload)
        })
        .addCase(changeAvatar.rejected, (state, action) => {
          ;(state.status = 'rejected'), (state.error = action.payload)
        })
  },
})

export default userSlice.reducer
