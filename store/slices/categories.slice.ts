import { Category } from "@/lib/content/categories.content";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const removeDuplicateCategories = (modifiedCategories: Category[]) => {
	const unique = new Map();
	modifiedCategories.forEach((category) => {
		unique.set(category.id, category);
	});
	return Array.from(unique.values());
};

interface CategoriesState {
	categories: Category[];
	queriedCategories: Category[];
	modifiedCategories: Category[];
	selectedKey: Category["for"] | null;
}

const initialState: CategoriesState = {
	categories: [],
	queriedCategories: [],
	modifiedCategories: [],
	selectedKey: null,
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
			}
		},
		deleteCategory(state, action: PayloadAction<string>) {
			state.categories = state.categories.filter(
				(c) => c.id !== action.payload
			);
		},
		toggleCategoryKey(state, action: PayloadAction<string>) {
			const updateKey = (list: Category[]) => {
				const category = list.find((c) => c.id === action.payload);
				if (category) {
					const prevKey = category.for;
					category.for = category.for === "service" ? "product" : "service";

					if (category.for !== prevKey) {
						state.modifiedCategories.push(category);
					}
				}
			};
			updateKey(state.categories);
			updateKey(state.queriedCategories);
			state.modifiedCategories = removeDuplicateCategories(
				state.modifiedCategories
			);
		},
		setSelectedCategoryKey(
			state,
			action: PayloadAction<Category["for"] | null>
		) {
			state.selectedKey = action.payload;
			if (action.payload === null) {
				state.queriedCategories = state.categories;
			} else {
				state.queriedCategories = state.categories.filter(
					(c) => c.for === action.payload
				);
			}
		},
		clearCategories(state) {
			state.categories = [];
			state.queriedCategories = [];
			state.modifiedCategories = [];
			state.selectedKey = null;
		},
	},
});

export const {
	setCategories,
	setQueriedCategories,
	addCategory,
	updateCategory,
	deleteCategory,
	toggleCategoryKey,
	setSelectedCategoryKey,
	clearCategories,
} = CategoriesSlice.actions;

export default CategoriesSlice.reducer;
