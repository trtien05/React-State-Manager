import { delay, put, takeEvery } from "redux-saga/effects";
import {
  decrementSagaFinish,
  incrementSagaFinish,
} from "./../redux/counter/counter.slide";

function* handleIncreaseCount(action: any) {
  console.log("check count in handleCount", action);
  // yield delay(3000);
  //dispatch new action and add in Redux store
  yield put(incrementSagaFinish({ value: 5 }));
}
function* handleDecreaseCount(action: any) {
  console.log("check count in handleCount", action);
  // yield delay(3000);
  //dispatch new action and add in Redux store
  //should use createAction to declare new action

  yield put(decrementSagaFinish({ value: 5 }));
}
function* counterSaga() {
  yield takeEvery("counter/incrementSagaStart", handleIncreaseCount);
  yield takeEvery("counter/decrementSagaStart", handleDecreaseCount);
}
export default counterSaga;
