"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { useDispatch } from "react-redux";
import { store } from "../store/store";
import { fetchInitialData } from "./slices/app.slice";
import AppWrapper from "@/lib/AppWrapper";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<AppWrapper>{children}</AppWrapper>
		</Provider>
	);
}
