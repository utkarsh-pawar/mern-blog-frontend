import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isUser: false,
    userData: {},
  },
  reducers: {
    loggedIn(state, action) {
      state.isUser = true;
      state.userData = action.payload;
    },
    loggedOut(state) {
      state.isUser = false;
      state.userData ={};
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
