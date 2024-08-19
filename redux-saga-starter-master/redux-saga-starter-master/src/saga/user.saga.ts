import { call, put, takeEvery } from "redux-saga/effects";
import { createUserFailed, createUserPending, createUserSuccess, deleteUserFailed, deleteUserPending, deleteUserSuccess, editUserFailed, editUserPending, editUserSuccess, fetchUserFailed, fetchUserPending, fetchUserSuccess } from "../redux/users/user.slide";
import { IUser } from "../types/backend";
import { PayloadAction } from "@reduxjs/toolkit";

const fetchUser = async () => {
  const response = await fetch('http://localhost:8000/users')
  return response.json()
}

const createUser = async (email: string, name: string) => {
  const response = await fetch('http://localhost:8000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      name: name
    })
  })
  return response.json()
}

const editUser = async (email: string, name: string, id: number) => {
  const response = await fetch(`http://localhost:8000/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      name: name
    })
  })
  return response.json()
}

const deleteUser = async (id: number) => {
  const response = await fetch(`http://localhost:8000/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },

  })
  return response.json()
}

function* handleFetchUser() {
  try {
    const users: IUser[] = yield call(fetchUser)
    yield put(fetchUserSuccess(users))
  } catch (error) {
    yield fetchUserFailed();
  }
}

function* handleCreateUser(action: PayloadAction<{ email: string, name: string }>) {
  try {
    yield call(createUser, action.payload.email, action.payload.name)
    yield put(createUserSuccess())
    //fetching users if success
    yield put(fetchUserPending())

  } catch (error) {
    yield createUserFailed()
  }
}

function* handleEditUser(action: PayloadAction<{ email: string, name: string, id: number }>) {
  try {
    yield call(editUser, action.payload.email, action.payload.name, action.payload.id)
    yield put(editUserSuccess())
    //fetching users if success
    yield put(fetchUserPending())

  } catch (error) {
    yield editUserFailed()
  }
}

function* handleDeleteUser(action: PayloadAction<{ id: number }>) {
  try {
    yield call(deleteUser, action.payload.id)
    yield put(deleteUserSuccess())
    //fetching users if success
    yield put(fetchUserPending())
  } catch (error) {
    yield deleteUserFailed();
  }
}

function* userSaga() {
  yield takeEvery(fetchUserPending, handleFetchUser);
  yield takeEvery(createUserPending, handleCreateUser);
  yield takeEvery(editUserPending, handleEditUser);
  yield takeEvery(deleteUserPending, handleDeleteUser);

}
export default userSaga;
