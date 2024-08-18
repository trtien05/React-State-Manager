import { all } from "redux-saga/effects";
import counterSaga from "./counter.saga";

function* RootSaga() {
  console.log("i'm root saga");
  yield all([counterSaga()]);
}

export default RootSaga;
