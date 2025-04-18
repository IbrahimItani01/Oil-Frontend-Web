"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const useSyncOnPageUnload = <T>(
	source: string,
	modifiedData: T[],
	syncFn?: (data: T[]) => void
) => {
	useEffect(() => {
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			if (modifiedData.length > 0) {
				if (syncFn) {
					// syncFn(modifiedData);
				} else {
					// fallback: log to localStorage
					localStorage.setItem(`${source}-data`, JSON.stringify(modifiedData));
				}
			}
		};

		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [modifiedData, syncFn]);
};

// Import sync function

export const useSyncOnRouteChange = <T>(
	modifiedData: T[],
	watchedPath: string,
	syncFn?: (data: T[]) => void
) => {
	const pathname = usePathname();

	useEffect(() => {
		if (pathname !== watchedPath && modifiedData.length > 0 && syncFn) {
			// syncFn(modifiedData);
			console.log(`Data synced on route change from ${watchedPath}`);
		}
	}, [modifiedData, pathname, watchedPath, syncFn]);
};
