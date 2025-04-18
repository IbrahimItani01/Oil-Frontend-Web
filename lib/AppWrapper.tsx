"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setUsers } from "@/store/slices/users.slice";
import { setEmployees } from "@/store/slices/employees.slice";
import { usersData } from "./content/users.content";
import { employeesData } from "./content/employees.content";
import {
	useSyncOnPageUnload,
	useSyncOnRouteChange,
} from "./handlers/usersData.handlers";
import { fetchUsers } from "@/apis/users.apis";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const modifiedUsers = useAppSelector((state) => state.users.modifiedUsers);

	useEffect(() => {
		const token = localStorage.getItem("token");

		const initializeData = async () => {
			if (token) {
				const apiUsers = await fetchUsers();
				dispatch(setUsers(apiUsers.length ? apiUsers : usersData));

				dispatch(setEmployees(employeesData));
				router.push("/dashboard");
			} else {
				router.push("/auth");
			}
		};

		initializeData();
	}, [dispatch, router]);

	useSyncOnPageUnload(modifiedUsers);
	useSyncOnRouteChange(modifiedUsers);

	return <>{children}</>;
};

export default AppWrapper;
