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
	// Fetch categories from products
	try {
		const response = await axios.get(process.env.NEXT_PUBLIC_PRODUCTS_GET_URL!);
		const productsRaw = response.data.data.data;

		const seenCategoryIds = new Set<string>();
		const categories: Category[] = [];

		for (const p of productsRaw) {
			const category = p.category;

			if (category && !seenCategoryIds.has(String(category.id))) {
				seenCategoryIds.add(String(category.id));
				categories.push({
					id: String(category.id),
					name: category.name,
					description: category.description || "",
					for: "product",
				});
			}
		}

		// Sort by numeric id ascending
		categories.sort((a, b) => Number(a.id) - Number(b.id));

		return categories;
	} catch (error) {
		console.error("Failed to fetch categories:", error);
		return [];
	}
};
