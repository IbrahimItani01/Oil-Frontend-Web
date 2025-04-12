"use client";
import { fetchInitialData } from "@/store/slices/app.slice";
import { useAppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			dispatch(fetchInitialData(token));
			router.push("/dashboard");
		} else {
			router.push("/");
		}
	}, [dispatch, router]);

	return <>{children}</>;
};

export default AppWrapper;
