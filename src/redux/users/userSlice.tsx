import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


// First, create the thunk
//createAsyncThunk(type(pending/fulfilled/reject), payloadCreator(A callback function), options)
export const fetchListUsers = createAsyncThunk(
  'users/fetchListUsers',
  async () => {
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

//Crate New User
export const createNewUser = createAsyncThunk(
  'users/createNewUser',
  async (payload: AddUser, thunkAPI) => {
    const response = await fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    //fetchListUser using thunkAPI
    if (result && result.id) {
      thunkAPI.dispatch(fetchListUsers())
    }
    return result
  },
)
interface AddUser {
  name: string,
  email: string
}

//Update User
export const updateUser = createAsyncThunk(
  'users/updateUser ',
  async (payload: IUser, thunkAPI) => {
    const response = await fetch(`http://localhost:8000/users/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const result = await response.json();
    if (result && result.id) {
      thunkAPI.dispatch(fetchListUsers())
    }
    return result;
  }
)

//Delete User

export const deleteUser = createAsyncThunk(
  'users/deleteUser ',
  async (payload: DeleteUser, thunkAPI) => {
    const response = await fetch(`http://localhost:8000/users/${payload.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const result = await response.json();
    thunkAPI.dispatch(fetchListUsers())

    return result;
  }
)
interface DeleteUser {
  id: number
}

const initialState: {
  listUsers: IUser[],
  isCreateUser: boolean,
  isUpdateUser: boolean,
  isDeleteUser: boolean
} = {
  listUsers: [],
  isCreateUser: false,
  isUpdateUser: false,
  isDeleteUser: false

}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetCreate(state) {
      state.isCreateUser = false;
    },
    resetUpdate(state) {
      state.isUpdateUser = false;
    },
    resetDelete(state) {
      state.isDeleteUser = false;
    }
  },
  //async action (createAsyncThunk) / listen action in other slice
  //switch-case
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {
      // Add user to the state array
      state.listUsers = action.payload
    })
    //if add user success
    builder.addCase(createNewUser.fulfilled, (state) => {
      state.isCreateUser = true
    })
    //if update user success
    builder.addCase(updateUser.fulfilled, (state) => {
      state.isUpdateUser = true
    })
    //if delete user success
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.isDeleteUser = true
    })

  },
})

// Action creators are generated for each case reducer function
export const { resetCreate, resetUpdate, resetDelete } = userSlice.actions

export default userSlice.reducer