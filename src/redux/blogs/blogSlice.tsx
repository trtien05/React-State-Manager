import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchListBlogs = createAsyncThunk(
  'blogs/fetchListBlogs',
  async () => {
    const response = await fetch('http://localhost:8000/blogs');
    const result = response.json();
    return result
  }
)

//Add new Blog
export const createNewBlog = createAsyncThunk(
  'blogs/createNewBlogs',
  async (payload: any, thunkAPI) => {
    const response = await fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (result && result.id) {
      thunkAPI.dispatch(fetchListBlogs());
    }
    return result
  }
)

//Update blog
export const updateBlog = createAsyncThunk(
  'blogs/updateBlog',
  async (payload: any, thunkAPI) => {
    const response = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (result && result.id) {
      thunkAPI.dispatch(fetchListBlogs());
    }
    return result
  }
)

//Delete blog
export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (payload: any, thunkAPI) => {
    const response = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const result = await response.json();
    thunkAPI.dispatch(fetchListBlogs());

    return result
  }
)
interface Blog {
  id: number,
  title: string,
  author: string,
  content: string
}

const initialState: {
  listBlogs: Blog[],
  isCreateBlog: boolean,
  isUpdateBlog: boolean,
  isDeleteBlog: boolean

} = {
  listBlogs: [],
  isCreateBlog: false,
  isUpdateBlog: false,
  isDeleteBlog: false
}

export const blogsSlide = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    resetCreateBlog(state) {
      state.isCreateBlog = false
    },
    resetUpdateBlog(state) {
      state.isUpdateBlog = false
    },
    resetDeleteBlog(state) {
      state.isDeleteBlog = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListBlogs.fulfilled, (state, action) => {
      state.listBlogs = action.payload
    })
    //if create success
    builder.addCase(createNewBlog.fulfilled, (state) => {
      state.isCreateBlog = true
    })
    //if update success
    builder.addCase(updateBlog.fulfilled, (state) => {
      state.isUpdateBlog = true
    })
    //if delete success
    builder.addCase(deleteBlog.fulfilled, (state) => {
      state.isDeleteBlog = true
    })
  }
})

// Action creators are generated for each case reducer function
export const { resetCreateBlog, resetUpdateBlog, resetDeleteBlog } = blogsSlide.actions

export default blogsSlide.reducer