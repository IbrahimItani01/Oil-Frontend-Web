import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userName: string;
  jwtToken?: string; 
}

const initialState: UserState = {
  userName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ userName: string; jwtToken?: string }>) => {
      state.userName = action.payload.userName;
      state.jwtToken = action.payload.jwtToken; 
    },
    logout: (state) => {
      state.userName = "";
      state.jwtToken = undefined;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
