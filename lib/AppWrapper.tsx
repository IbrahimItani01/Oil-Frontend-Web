"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setUsers } from "@/store/slices/users.slice";
import { setEmployees } from "@/store/slices/employees.slice";
import { User, usersData } from "./content/users.content";
import { Employee, employeesData } from "./content/employees.content";
import {
	useSyncOnPageUnload,
	useSyncOnRouteChange,
} from "./handlers/data.handlers";
import { fetchUsers } from "@/apis/users.apis";
import { fetchEmployees } from "@/apis/employees.apis";
import { fetchOrders } from "@/apis/orders.apis";
import { setOrders } from "@/store/slices/orders.slice";
import { ordersData } from "./content/orders.content";
import { fetchAppointments } from "@/apis/appointments.apis";
import { setAppointments } from "@/store/slices/appointments.slice";
import { Appointment, appointmentsData } from "./content/appointments.content";
import { fetchProducts } from "@/apis/products.apis";
import { setProducts } from "@/store/slices/products.slice";
import { Product, productsData } from "./content/products.content";
import { fetchServices } from "@/apis/services.apis";
import { setServices } from "@/store/slices/services.slice";
import { Service, servicesData } from "./content/services.content";
import { fetchCategories } from "@/apis/categories.apis";
import { categoriesData, Category } from "./content/categories.content";
import { setCategories } from "@/store/slices/categories.slice";
import {
	setLoaderOff,
	setLoaderOn,
	setLoadingFalse,
} from "@/store/slices/app.slice";
import Loader from "@/components/base/Loader";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const modifiedUsers = useAppSelector((state) => state.users.modifiedUsers);
	const modifiedEmployees = useAppSelector(
		(state) => state.employees.modifiedEmployees
	);
	const modifiedAppointments = useAppSelector(
		(state) => state.appointments.modifiedAppointments
	);
	const modifiedProducts = useAppSelector(
		(state) => state.products.modifiedProducts
	);
	const modifiedServices = useAppSelector(
		(state) => state.services.modifiedServices
	);
	const modifiedCategories = useAppSelector(
		(state) => state.categories.modifiedCategories
	);

	useEffect(() => {
		const token = localStorage.getItem("token");
		const hasRedirected = sessionStorage.getItem("hasRedirected");

		const initializeData = async () => {
			dispatch(setLoaderOn());

			if (!token) {
				router.push("/auth");
				return;
			}

			// Only redirect to dashboard on the first load
			if (!hasRedirected) {
				sessionStorage.setItem("hasRedirected", "true");
				router.push("/dashboard");
			}

			try {
				const [
					apiUsers,
					apiEmployees,
					apiOrders,
					apiAppointments,
					apiProducts,
					apiServices,
					apiCategories,
				] = await Promise.all([
					fetchUsers(),
					fetchEmployees(),
					fetchOrders(),
					fetchAppointments(),
					fetchProducts(),
					fetchServices(),
					fetchCategories(),
				]);

				// Dispatch data to store
				dispatch(setUsers(apiUsers.length ? apiUsers : usersData));
				dispatch(
					setEmployees(apiEmployees.length ? apiEmployees : employeesData)
				);
				dispatch(setOrders(apiOrders.length ? apiOrders : ordersData));
				dispatch(
					setAppointments(
						apiAppointments.length ? apiAppointments : appointmentsData
					)
				);
				dispatch(setProducts(apiProducts.length ? apiProducts : productsData));
				dispatch(setServices(apiServices.length ? apiServices : servicesData));
				dispatch(
					setCategories(apiCategories.length ? apiCategories : categoriesData)
				);

				dispatch(setLoadingFalse());
				dispatch(setLoaderOff());
			} catch (error) {
				console.error("Failed to fetch data:", error);
			}
		};

		initializeData();
	}, [dispatch, router]);

	// Sync functions to send modified data
	const syncModifiedUsers = (data: User[]) => {
		console.log("Syncing modified users", data);
		// TODO: Call your backend API here
	};

	const syncModifiedEmployees = (data: Employee[]) => {
		console.log("Syncing modified employees", data);
		// TODO: Call your backend API here
	};
	const syncModifiedAppointments = (data: Appointment[]) => {
		console.log("Syncing modified appointments", data);
		// TODO: Call your backend API here
	};
	const syncModifiedProducts = (data: Product[]) => {
		console.log("Syncing modified products", data);
		// TODO: Call your backend API here
	};
	const syncModifiedServices = (data: Service[]) => {
		console.log("Syncing modified services", data);
		// TODO: Call your backend API here
	};
	const syncModifiedCategories = (data: Category[]) => {
		console.log("Syncing modified categories", data);
		// TODO: Call your backend API here
	};

	// Sync on unload
	useSyncOnPageUnload("users", modifiedUsers, syncModifiedUsers);
	useSyncOnPageUnload("employees", modifiedEmployees, syncModifiedEmployees);
	useSyncOnPageUnload(
		"appointments",
		modifiedAppointments,
		syncModifiedAppointments
	);
	useSyncOnPageUnload("products", modifiedProducts, syncModifiedProducts);
	useSyncOnPageUnload("services", modifiedServices, syncModifiedServices);
	useSyncOnPageUnload("categories", modifiedCategories, syncModifiedCategories);

	// Sync on route change
	useSyncOnRouteChange(modifiedUsers, "/dashboard/users", syncModifiedUsers);
	useSyncOnRouteChange(
		modifiedEmployees,
		"/dashboard/employees",
		syncModifiedEmployees
	);
	useSyncOnRouteChange(
		modifiedAppointments,
		"/dashboard/appointments",
		syncModifiedAppointments
	);
	useSyncOnRouteChange(
		modifiedProducts,
		"/dashboard/products",
		syncModifiedProducts
	);
	useSyncOnRouteChange(
		modifiedServices,
		"/dashboard/services",
		syncModifiedServices
	);
	useSyncOnRouteChange(
		modifiedCategories,
		"/dashboard/categories",
		syncModifiedCategories
	);

	return (
		<>
			<Loader />
			{children}
		</>
	);
};

export default AppWrapper;
