import { Product } from "@/lib/content/products.content";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const removeDuplicateProducts = (modifiedProducts: Product[]) => {
	const unique = new Map();
	modifiedProducts.forEach((product) => {
		unique.set(product.id, product);
	});
	return Array.from(unique.values());
};

interface ProductsState {
	products: Product[];
	queriedProducts: Product[];
	modifiedProducts: Product[];
	selectedStatus: Product["status"] | null;
}

const initialState: ProductsState = {
	products: [],
	queriedProducts: [],
	modifiedProducts: [],
	selectedStatus: null,
};

const ProductsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setProducts(state, action: PayloadAction<Product[]>) {
			state.products = action.payload;
			state.queriedProducts = action.payload;
		},
		setQueriedProducts(state, action: PayloadAction<Product[]>) {
			state.queriedProducts = action.payload;
		},
		addProduct(state, action: PayloadAction<Product>) {
			state.products.push(action.payload);
		},
		updateProduct(state, action: PayloadAction<Product>) {
			const index = state.products.findIndex((p) => p.id === action.payload.id);
			if (index !== -1) {
				state.products[index] = action.payload;
			}
		},
		deleteProduct(state, action: PayloadAction<string>) {
			state.products = state.products.filter((p) => p.id !== action.payload);
		},
		toggleProductStatus(state, action: PayloadAction<string>) {
			const updateStatus = (list: Product[]) => {
				const product = list.find((p) => p.id === action.payload);
				if (product) {
					const prevStatus = product.status;
					product.status = product.status === "active" ? "inactive" : "active";

					if (product.status !== prevStatus) {
						state.modifiedProducts.push(product);
					}
				}
			};
			updateStatus(state.products);
			updateStatus(state.queriedProducts);
			state.modifiedProducts = removeDuplicateProducts(state.modifiedProducts);
		},
		setSelectedProductStatus(
			state,
			action: PayloadAction<Product["status"] | null>
		) {
			state.selectedStatus = action.payload;
		},
		clearProducts(state) {
			state.products = [];
		},
	},
});

export const {
	setProducts,
	setQueriedProducts,
	addProduct,
	updateProduct,
	deleteProduct,
	toggleProductStatus,
	setSelectedProductStatus,
	clearProducts,
} = ProductsSlice.actions;

export default ProductsSlice.reducer;
