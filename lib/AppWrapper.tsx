"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setUsers } from "@/store/slices/users.slice";
import { setEmployees } from "@/store/slices/employees.slice";
import { usersData } from "./content/users.content";
import { employeesData } from "./content/employees.content";
import {
	useSyncOnPageUnload,
	useSyncOnRouteChange,
} from "./handlers/usersData.handlers";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const modifiedUsers = useAppSelector((state) => state.users.modifiedUsers);

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			dispatch(setUsers(usersData));
			dispatch(setEmployees(employeesData));
			router.push("/dashboard");
		} else {
			router.push("/auth");
		}
	}, [dispatch, router]);

	useSyncOnPageUnload(modifiedUsers);
	useSyncOnRouteChange(modifiedUsers);

	return <>{children}</>;
};

export default AppWrapper;
