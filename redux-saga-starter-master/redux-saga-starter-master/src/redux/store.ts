import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "./counter/counter.slide";
import createSagaMiddleware from "redux-saga";
import RootSaga from "../saga/root.saga";
import userReducer from "./users/user.slide";

//Create Saga Middleware
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: userReducer,
  },
  //saga is middleware, handle async action
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(sagaMiddleware);
  },
});

sagaMiddleware.run(RootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
