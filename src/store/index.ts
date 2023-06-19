import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import messageSlice from "./slices/messageSlice";

export const store = configureStore({
  reducer: {
    messageSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;