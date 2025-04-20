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
} from "./handlers/usersData.handlers";
import { fetchUsers } from "@/apis/users.apis";
import { fetchEmployees } from "@/apis/employees.apis";
import { fetchOrders } from "@/apis/orders.apis";
import { setOrders } from "@/store/slices/orders.slice";
import { ordersData } from "./content/orders.content";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const modifiedUsers = useAppSelector((state) => state.users.modifiedUsers);
	const modifiedEmployees = useAppSelector(
		(state) => state.employees.modifiedEmployees
	);

	useEffect(() => {
		const token = localStorage.getItem("token");
		const hasSynced = localStorage.getItem("hasSynced");

		const initializeData = async () => {
			if (!token) {
				router.push("/auth");
				return;
			}

			if (!hasSynced) {
				// Only fetch data if not already synced on unload
				try {
					const apiUsers = await fetchUsers();
					const apiEmployees = await fetchEmployees();
					const apiOrders = await fetchOrders();
					dispatch(setUsers(apiUsers.length ? apiUsers : usersData));
					dispatch(
						setEmployees(apiEmployees.length ? apiEmployees : employeesData)
					);
					dispatch(setOrders(apiOrders.length ? apiOrders : ordersData));
				} catch (error) {
					console.error("Failed to fetch data:", error);
				}
			}

			// Clear sync flag after reload
			localStorage.removeItem("hasSynced");

			router.push("/dashboard");
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

	// Sync on unload
	useSyncOnPageUnload("users", modifiedUsers, syncModifiedUsers);
	useSyncOnPageUnload("employees", modifiedEmployees, syncModifiedEmployees);

	// Sync on route change
	useSyncOnRouteChange(modifiedUsers, "/dashboard/users", syncModifiedUsers);
	useSyncOnRouteChange(
		modifiedEmployees,
		"/dashboard/employees",
		syncModifiedEmployees
	);

	return <>{children}</>;
};

export default AppWrapper;
