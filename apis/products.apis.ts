import { Appointment } from "@/lib/content/appointments.content";
import { Product } from "@/lib/content/products.content";
import axios from "axios";

export const syncModifiedProducts = async (modifiedProducts: Appointment[]) => {
	const syncUrl = process?.env?.NEXT_PUBLIC_PRODUCTS_SYNC_DATA_URL;
	if (syncUrl) {
		try {
			await axios.post(syncUrl, modifiedProducts, {
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
			console.error("Error syncing products:", error);
		}
	}
};
export const fetchProducts = async (): Promise<Product[]> => {
	try {
		// Replace with actual API call in future
		// const response = await axios.get("/api/employees");
		// return response.data;

		return [];
	} catch (error) {
		console.error("Failed to fetch products:", error);
		return [];
	}
};
