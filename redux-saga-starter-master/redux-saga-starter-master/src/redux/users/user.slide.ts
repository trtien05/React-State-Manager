import { createAction, createSlice } from "@reduxjs/toolkit";
import { ILogin, IUser } from "../../types/backend";

export interface CounterState {
  isPending: boolean;
  isError: boolean;

  isCreating: boolean;
  isCreateSuccess: boolean;

  isEditing: boolean;
  isEditSuccess: boolean;

  isDeleting: boolean;
  isDeleteSuccess: boolean;

  data: IUser[];
  errors: any;
}

const initialState: CounterState = {
  //For Fetching
  isPending: false,
  isError: false,

  //For Create
  isCreating: false,
  isCreateSuccess: false,

  //For Edit
  isEditing: false,
  isEditSuccess: false,

  //For Delete
  isDeleting: false,
  isDeleteSuccess: false,

  data: [],
  errors: [],
};

export const loginPending = createAction<ILogin>("loginPending");
export const logoutPending = createAction("logoutPending");

export const fetchUserPending = createAction("fetchUserPending");
export const fetchUserSuccess = createAction<IUser[]>("fetchUserSuccess");
export const fetchUserFailed = createAction("fetchUserFailed");

export const createUserPending = createAction<{ email: string, name: string }>("createUserPending");
export const createUserSuccess = createAction("createUserSuccess");
export const createUserFailed = createAction("createUserFailed");

export const editUserPending = createAction<{ email: string, name: string, id: number }>("editUserPending");
export const editUserSuccess = createAction("editUserSuccess");
export const editUserFailed = createAction("editUserFailed");

export const deleteUserPending = createAction<{ id: number }>("deleteUserPending");
export const deleteUserSuccess = createAction("deleteUserSuccess");
export const deleteUserFailed = createAction("deleteUserFailed");

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      //fetching User Data
      .addCase(fetchUserPending, (state) => {
        state.isPending = true
        state.errors = false
      })
      .addCase(fetchUserSuccess, (state, action) => {
        state.isPending = false
        state.errors = false
        state.data = action.payload
      })
      .addCase(fetchUserFailed, (state) => {
        state.isPending = false
        state.errors = true
      })

      //Create New User
      .addCase(createUserPending, (state) => {
        state.isCreating = true
        state.isCreateSuccess = false
      })
      .addCase(createUserSuccess, (state) => {
        state.isCreating = false
        state.isCreateSuccess = true
      })
      .addCase(createUserFailed, (state) => {
        state.isCreating = false
        state.isCreateSuccess = false
      })

      //Edit User
      .addCase(editUserPending, (state) => {
        state.isEditing = true
        state.isEditSuccess = false
      })
      .addCase(editUserSuccess, (state) => {
        state.isEditing = false
        state.isEditSuccess = true
      })
      .addCase(editUserFailed, (state) => {
        state.isEditing = false
        state.isEditSuccess = false
      })

      //Delete User
      .addCase(deleteUserPending, (state) => {
        state.isDeleting = true
        state.isDeleteSuccess = false
      })
      .addCase(deleteUserSuccess, (state) => {
        state.isDeleting = false
        state.isDeleteSuccess = true
      })
      .addCase(deleteUserFailed, (state) => {
        state.isDeleting = false
        state.isDeleteSuccess = false
      });
  },
});

export const { } = userSlice.actions;

export default userSlice.reducer;
