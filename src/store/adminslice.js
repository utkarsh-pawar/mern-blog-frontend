import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isAdmin: false,
  },
  reducers: {
    loggedIn(state) {
      state.isAdmin = true;
    },
    loggedOut(state) {
      state.isAdmin = false;
    },
  },
});

export const adminActions = adminSlice.actions

export default adminSlice;
