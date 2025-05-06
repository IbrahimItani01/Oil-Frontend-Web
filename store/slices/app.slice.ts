import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
	name: "app",
	initialState: {
		loading: true, 
		loaderOn: false,
		error: null,
	},
	reducers: {
		setLoadingFalse: (state) => {
			state.loading = false;
		},
		setLoaderOn: (state) => {
			state.loaderOn = true;
		},
		setLoaderOff: (state) => {
			state.loaderOn = false;
		},
	},
});

export const { setLoadingFalse, setLoaderOff,setLoaderOn } = appSlice.actions;

export default appSlice.reducer;
