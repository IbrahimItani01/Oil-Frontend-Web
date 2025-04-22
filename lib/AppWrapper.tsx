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
import { fetchAppointments } from "@/apis/appointments.apis";
import { setAppointments } from "@/store/slices/appointments.slice";
import { Appointment, appointmentsData } from "./content/appointments.content";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const modifiedUsers = useAppSelector((state) => state.users.modifiedUsers);
	const modifiedEmployees = useAppSelector(
		(state) => state.employees.modifiedEmployees
	);
	const modifiedAppointments = useAppSelector(
		(state) => state.appintments.modifiedAppointments
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
					const apiAppointments = await fetchAppointments();
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
	const syncModifiedAppointments = (data: Appointment[]) => {
		console.log("Syncing modiifed appointments", data);
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

	return <>{children}</>;
};

export default AppWrapper;
