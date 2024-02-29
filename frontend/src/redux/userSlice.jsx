import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  email: "",
  role: "",
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.data.id;
      state.email = action.payload.data.email;
      state.role = action.payload.data.role;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state._id = "";
      state.email = "";
      state.role = "";
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
