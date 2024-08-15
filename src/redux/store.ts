import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterSlice from "./counter/counterSlice";
import userSlice from "./users/userSlice";
import appSlice from "./app/appSlide";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import blogSlice from "./blogs/blogSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["app"],
};
const rootReducer = combineReducers({
  counter: counterSlice,
  user: userSlice,
  app: appSlice,
  blog: blogSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

//redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
