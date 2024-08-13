import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// First, create the thunk
//createAsyncThunk(type(pending/fulfilled/reject), payloadCreator(A callback function), options)
export const fetchListUsers = createAsyncThunk(
  'users/fetchListUsers',
  async (userId, thunkAPI) => {
    const response = await fetch('http://localhost:8000/users');
    const result = await response.json();
    return result
  },
)

interface IUser {
  id: number,
  name: string,
  email: string
}

const initialState: {
  listUsers: IUser[]
} = {
  listUsers: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  //async action (createAsyncThunk) / listen action in other slice
  //switch-case
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {
      // Add user to the state array
      state.listUsers = action.payload
    })
  },
})

// Action creators are generated for each case reducer function
export const { } = userSlice.actions

export default userSlice.reducer