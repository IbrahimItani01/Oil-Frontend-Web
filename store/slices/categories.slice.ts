import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const removeDuplicateCategories = (modifiedCategories: Category[]) => {
	const unique = new Map();
	modifiedCategories.forEach((category) => {
		unique.set(category.id, category);
	});
	return Array.from(unique.values());
};

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
			state.queriedCategories.push(action.payload);
		},
		updateCategory(state, action: PayloadAction<Category>) {
			const index = state.categories.findIndex(
				(c) => c.id === action.payload.id
			);
			if (index !== -1) {
				state.categories[index] = action.payload;
			}
			const qIndex = state.queriedCategories.findIndex(
				(c) => c.id === action.payload.id
			);
			if (qIndex !== -1) {
				state.queriedCategories[qIndex] = action.payload;
			}
			state.modifiedCategories.push(action.payload);
			state.modifiedCategories = removeDuplicateCategories(
				state.modifiedCategories
			);
		},
		deleteCategory(state, action: PayloadAction<string>) {
			state.categories = state.categories.filter(
				(c) => c.id !== action.payload
			);
			state.queriedCategories = state.queriedCategories.filter(
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
