import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  role: "",
  active: "",
};

export const userSlice = createSlice({
  initialState,
  name: "UserSlice",
  reducers: {
    userData: (state, action) => {
      state.id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.active = action.payload.active;
      console.log(state);
    },
  },
});

export const { userData } = userSlice.actions;

export default userSlice.reducer;
