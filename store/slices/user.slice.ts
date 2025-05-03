import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
	userName: string;
	jwtToken?: string;
	userPhoto?: string | null;
}

const initialState: UserState = {
	userName: "",
	jwtToken: undefined,
	userPhoto: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (
			state,
			action: PayloadAction<{
				userName: string;
				jwtToken?: string;
				userPhoto?: string | null;
			}>
		) => {
			state.userName = action.payload.userName;
			state.jwtToken = action.payload.jwtToken;
			state.userPhoto = action.payload.userPhoto ?? null;
		},
		logout: (state) => {
			state.userName = "";
			state.jwtToken = undefined;
			state.userPhoto = null;
		},
	},
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
