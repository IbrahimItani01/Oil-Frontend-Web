import { Appointment } from "@/lib/content/appointments.content";
import { Product } from "@/lib/content/products.content";
import { Service } from "@/lib/content/services.content";
import axios from "axios";

export const syncModifiedServices = async (modifiedProducts: Service[]) => {
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
export const fetchServices = async (): Promise<Service[]> => {
	try {
		// Replace with actual API call in future
		// const response = await axios.get("/api/employees");
		// return response.data;

		return [];
	} catch (error) {
		console.error("Failed to fetch services:", error);
		return [];
	}
};
