import { delay, put, takeEvery } from "redux-saga/effects";

function* handleIncreaseCount(action: any) {
  console.log("check count in handleCount", action);
  // yield delay(3000);
  //dispatch new action and add in Redux store
  yield put({
    type: "counter/incrementSagaFinish",
    payload: { value: 5 },
  });
}
function* handleDecreaseCount(action: any) {
  console.log("check count in handleCount", action);
  // yield delay(3000);
  //dispatch new action and add in Redux store
  // yield put({
  //   type: "counter/incrementSagaFinish",
  //   payload: { value: 5 },
  // });

  yield put({
    type: "counter/decrementSagaFinish",
    payload: { value: 5 },
  });
}
function* counterSaga() {
  yield takeEvery("counter/incrementSagaStart", handleIncreaseCount);
  yield takeEvery("counter/decrementSagaStart", handleDecreaseCount);
}
export default counterSaga;
