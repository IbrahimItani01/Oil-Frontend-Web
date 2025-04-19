"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const useSyncOnPageUnload = <T>(
	source: string,
	modifiedData: T[],
	syncFn?: (data: T[]) => void
) => {
	useEffect(() => {
		const handleBeforeUnload = () => {
			if (modifiedData.length === 0) return;

			localStorage.setItem("hasSynced", "true");

			const payload = JSON.stringify(modifiedData);
			const endpoint = `/api/sync/${source}`; // TODO: adjust to match your backend

			// try {
			// 	const success = navigator.sendBeacon(
			// 		endpoint,
			// 		new Blob([payload], { type: "application/json" })
			// 	);

			// 	if (!success) {
			// 		console.warn("sendBeacon failed, falling back...");
			// 		fallback();
			// 	}
			// } catch (err) {
			// 	console.error("Beacon sync error:", err);
			// 	fallback();
			// }

			// function fallback() {
			// 	if (syncFn) {
			// 		syncFn(modifiedData);
			// 	} else {
			// 		localStorage.setItem(`${source}-data`, payload);
			// 	}
			// }
			localStorage.setItem(`${source}-data`, payload);
		};

		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [modifiedData, syncFn, source]);
};

// Import sync function

export const useSyncOnRouteChange = <T>(
	modifiedData: T[],
	watchedPath: string,
	syncFn?: (data: T[]) => void
) => {
	const pathname = usePathname();

	useEffect(() => {
		const hasLeftWatchedPath =
			modifiedData.length > 0 && pathname !== watchedPath;

		if (hasLeftWatchedPath && syncFn) {
			console.log(`Syncing on route change from ${watchedPath}`);
			// syncFn(modifiedData);
		}
	}, [modifiedData, pathname, watchedPath, syncFn]);
};
