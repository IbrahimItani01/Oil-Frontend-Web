import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from "./slices/user.slice";
import appReducer from "./slices/app.slice";
import usersReducer from "./slices/users.slice";
import employeesReducer from "./slices/employees.slice";
import ordersReducer from "./slices/orders.slice";
import appointmentsReducer from "./slices/appointments.slice";
import productsReducer from "./slices/products.slice";
import servicesReducer from "./slices/services.slice";
import categoriesReducer from "./slices/categories.slice";
export const store = configureStore({
	reducer: {
		user: userReducer,
		app: appReducer,
		users: usersReducer,
		employees: employeesReducer,
		orders: ordersReducer,
		appointments: appointmentsReducer,
		products: productsReducer,
		services: servicesReducer,
		categories: categoriesReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks for use in components
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
