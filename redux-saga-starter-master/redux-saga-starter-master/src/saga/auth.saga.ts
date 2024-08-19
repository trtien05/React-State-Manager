import { call, fork, take } from "redux-saga/effects"
import { loginPending, logoutPending } from "../redux/users/user.slide"
import { ILogin } from "../types/backend";
import { PayloadAction } from "@reduxjs/toolkit";

const authorize = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    if (email === "abc@gmail.com" && password === "123") {
      localStorage.setItem("access_token", "abc")
      resolve('oke')
    } else {
      reject('notthing')
    }
  })
}

function* authSaga() {
  while (true) {
    const action: PayloadAction<ILogin> = yield take(loginPending);
    // yield call(authorize, action.payload.email, action.payload.password);

    //using fork instead call -> doing task concurrent -> login , logout at same time
    yield fork(authorize, action.payload.email, action.payload.password);
    yield take([logoutPending, 'LOGIN_ERROR'])
  }

}
export default authSaga;