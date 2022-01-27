import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./adminslice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    admin: adminSlice.reducer,
  },
});

export const baseURL = "http://localhost:5000/api/v1"

export default store;
