import { Appointment } from "@/lib/content/appointments.content";
import { Category } from "@/lib/content/categories.content";
import { Product } from "@/lib/content/products.content";
import { Service } from "@/lib/content/services.content";
import axios from "axios";

// Helper to merge 'for' values
const mergeFor = (
	existing: "product" | "service" | "both",
	incoming: "product" | "service"
): "product" | "service" | "both" => {
	if (existing === incoming || existing === "both") return existing;
	return "both";
};

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
		const [productsRes, servicesRes] = await Promise.all([
			axios.get(process.env.NEXT_PUBLIC_PRODUCTS_GET_URL!),
			axios.get(process.env.NEXT_PUBLIC_SERVICES_GET_URL!),
		]);

		const productsRaw = productsRes.data.data.data;
		const servicesRaw = servicesRes.data.data.data;

		const categoryMap: Map<string, Category> = new Map();

		// Extract from products
		for (const p of productsRaw) {
			const category = p.category;
			if (!category) continue;

			const id = String(category.id);
			if (!categoryMap.has(id)) {
				categoryMap.set(id, {
					id,
					name: category.name,
					description: category.description || "",
					for: "product",
				});
			} else {
				const existing = categoryMap.get(id)!;
				existing.for = mergeFor(existing.for, "product");
			}
		}

		// Extract from services
		for (const s of servicesRaw) {
			const category = s.category;
			if (!category) continue;

			const id = String(category.id);
			if (!categoryMap.has(id)) {
				categoryMap.set(id, {
					id,
					name: category.name,
					description: category.description || "",
					for: "service",
				});
			} else {
				const existing = categoryMap.get(id)!;
				existing.for = mergeFor(existing.for, "service");
			}
		}

		// Convert to array and sort by id
		const categories: Category[] = Array.from(categoryMap.values()).sort(
			(a, b) => Number(a.id) - Number(b.id)
		);

		return categories;
	} catch (error) {
		console.error("Failed to fetch categories:", error);
		return [];
	}
};
