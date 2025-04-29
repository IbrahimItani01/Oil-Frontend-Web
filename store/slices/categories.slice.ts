import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Category {
	id: string;
	name: string;
	description: string;
}

interface CategoriesState {
	categories: Category[];
	queriedCategories: Category[];
	modifiedCategories: Category[];
}

const initialState: CategoriesState = {
	categories: [],
	queriedCategories: [],
	modifiedCategories: [],
};

const CategoriesSlice = createSlice({
	name: "categories",
	initialState,
	reducers: {
		setCategories(state, action: PayloadAction<Category[]>) {
			state.categories = action.payload;
			state.queriedCategories = action.payload;
		},
		setQueriedCategories(state, action: PayloadAction<Category[]>) {
			state.queriedCategories = action.payload;
		},
		addCategory(state, action: PayloadAction<Category>) {
			state.categories.push(action.payload);
		},
		updateCategory(state, action: PayloadAction<Category>) {
			const index = state.categories.findIndex(
				(c) => c.id === action.payload.id
			);
			if (index !== -1) {
				state.categories[index] = action.payload;
				state.modifiedCategories.push(action.payload);
			}
		},
		deleteCategory(state, action: PayloadAction<string>) {
			state.categories = state.categories.filter(
				(c) => c.id !== action.payload
			);
		},
		clearCategories(state) {
			state.categories = [];
		},
	},
});

export const {
	setCategories,
	setQueriedCategories,
	addCategory,
	updateCategory,
	deleteCategory,
	clearCategories,
} = CategoriesSlice.actions;

export default CategoriesSlice.reducer;
