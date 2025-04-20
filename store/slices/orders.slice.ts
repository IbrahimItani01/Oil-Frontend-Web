import { Order } from "@/lib/content/orders.content";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const removeDuplicates = (modifiedOrders: Order[]) => {
	const uniqueOrders = new Map();

	modifiedOrders.forEach((order) => {
		uniqueOrders.set(order.id, order);
	});

	return Array.from(uniqueOrders.values());
};

interface OrdersState {
	orders: Order[];
	selectedOrderIds: String[];
	modifiedOrders: Order[];
}

const initialState: OrdersState = {
	orders: [],
	selectedOrderIds: [],
	modifiedOrders: [],
};

const ordersSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {
		setOrders(state, action: PayloadAction<Order[]>) {
			state.orders = action.payload;
		},
		toggleOrderSelection: (state, action: PayloadAction<string>) => {
			const orderId = action.payload;
			if (state.selectedOrderIds.includes(orderId)) {
				state.selectedOrderIds = state.selectedOrderIds.filter(
					(id) => id !== orderId
				);
			} else {
				state.selectedOrderIds.push(orderId);
			}
		},
		selectAllOrders: (state) => {
			if (state.selectedOrderIds.length === state.orders.length) {
				state.selectedOrderIds = [];
			} else {
				state.selectedOrderIds = state.orders.map((order) => order.id);
			}
		},
		cashOutSelectedOrders: (state) => {
			state.orders = state.orders.map((order) =>
				state.selectedOrderIds.includes(order.id)
					? { ...order, cashedOut: true }
					: order
			);
			state.selectedOrderIds = []; // Clear selection after cashing out
		},

		resetSelection: (state) => {
			state.selectedOrderIds = [];
		},
	},
});

export const {
	setOrders,
	toggleOrderSelection,
	selectAllOrders,
	cashOutSelectedOrders,
	resetSelection,
} = ordersSlice.actions;

export default ordersSlice.reducer;
