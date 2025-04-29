import { Appointment } from "@/lib/content/appointments.content";
import { Category } from "@/lib/content/categories.content";
import { Product } from "@/lib/content/products.content";
import { Service } from "@/lib/content/services.content";
import axios from "axios";

export const syncModifiedCategories = async (modifiedCatgories: Category[]) => {
	const syncUrl = process?.env?.NEXT_PUBLIC_CATEGORIES_SYNC_DATA_URL;
	if (syncUrl) {
		try {
			await axios.post(syncUrl, modifiedCatgories, {
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
			console.error("Error syncing products:", error);
		}
	}
};
export const fetchCategories = async (): Promise<Category[]> => {
	try {
		// Replace with actual API call in future
		// const response = await axios.get("/api/employees");
		// return response.data;

		return [];
	} catch (error) {
		console.error("Failed to fetch categories:", error);
		return [];
	}
};
