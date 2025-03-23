import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchInitialData = createAsyncThunk(
	"app/fetchInitialData",
	async (token: string, { rejectWithValue }) => {
		// Accept token as a parameter
		try {
			// const [response of each api all in an array] = await Promise.all([
			// 	// TODO: call the apis fucntions here
			// ]);
			// return the data returned from the apis;
		} catch (error) {
			// return error message;
		}
	}
);

const appSlice = createSlice({
	name: "app",
	initialState: {
		appointments: [],
        products: [],
        users: [],
        employees: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchInitialData.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchInitialData.fulfilled, (state, action) => {
				state.loading = false;
				// TODO: handle data in fulfilled state
			})
			.addCase(fetchInitialData.rejected, (state, action) => {
				state.loading = false;
			});
	},
});

export default appSlice.reducer;
