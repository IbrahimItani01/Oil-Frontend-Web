"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { syncModifiedUsers } from "@/apis/users.apis";
import { User } from "../content/users.content";

export const useSyncOnPageUnload = (modifiedUsers: User[]) => {
	useEffect(() => {
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			if (modifiedUsers.length > 0) {
				// TODO: Uncomment below when API linked
				// syncModifiedUsers(modifiedUsers);
				localStorage.setItem(
					"Users modified synced upon refresh",
					JSON.stringify(modifiedUsers)
				);
			}
		};

		// Listen to page unload
		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [modifiedUsers]);
};
// Import sync function

export const useSyncOnRouteChange = (modifiedUsers: User[]) => {
	const pathname = usePathname();

	useEffect(() => {
		// Only trigger sync if the current pathname is '/dashboard/users' and it changes
		if (pathname !== "/dashboard/users" && modifiedUsers.length > 0) {
			// TODO: Uncomment below when API linked
			// syncModifiedUsers(modifiedUsers);
			console.log("Users Data synced on path change");
		}
	}, [modifiedUsers, pathname]); // Trigger on modifiedUsers or pathname change
};
