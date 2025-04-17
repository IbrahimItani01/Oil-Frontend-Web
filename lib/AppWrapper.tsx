"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/store";
import { setUsers } from "@/store/slices/users.slice"; // 1. Import setUsers
import { usersData } from "./content/users.content";
import { setEmployees } from "@/store/slices/employees.slice";
import { employeesData } from "./content/employees.content";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useAppDispatch();
	const router = useRouter();

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

	return <>{children}</>;
};

export default AppWrapper;
