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

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const modifiedUsers = useAppSelector((state) => state.users.modifiedUsers);
	const modifiedEmployees = useAppSelector(
		(state) => state.employees.modifiedEmployees
	);

	useEffect(() => {
		const token = localStorage.getItem("token");

		const initializeData = async () => {
			if (token) {
				const apiUsers = await fetchUsers();
				const apiEmployees = await fetchEmployees();
				dispatch(setUsers(apiUsers.length ? apiUsers : usersData));
				dispatch(
					setEmployees(apiEmployees.length ? apiEmployees : employeesData)
				);
				router.push("/dashboard");
			} else {
				router.push("/auth");
			}
		};

		initializeData();
	}, [dispatch, router]);

	// Define sync functions
	const syncModifiedUsers = (data: User[]) => {
		console.log("Syncing modified users on route change", data);
	};

	const syncModifiedEmployees = (data: Employee[]) => {
		console.log("Syncing modified employees on route change", data);
	};

	// Handle unload and route change
	useSyncOnPageUnload("users", modifiedUsers, syncModifiedUsers);
	useSyncOnPageUnload("employees", modifiedEmployees, syncModifiedEmployees);

	useSyncOnRouteChange(modifiedUsers, "/dashboard/users", syncModifiedUsers);
	useSyncOnRouteChange(
		modifiedEmployees,
		"/dashboard/employees",
		syncModifiedEmployees
	);

	return <>{children}</>;
};

export default AppWrapper;
