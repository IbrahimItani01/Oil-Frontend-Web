import { Product } from "@/lib/content/products.content";
import axios from "axios";

export const syncModifiedProducts = async (modifiedProducts: Product[]) => {
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
		const response = await axios.get(process.env.NEXT_PUBLIC_PRODUCTS_GET_URL!);
		const products = response.data.data.data;

		const formattedProducts: Product[] = products.map((p: any) => ({
			id: String(p.id),
			photo: p.image_url,
			name: p.name,
			type: p.category?.name || "",
			amountSold: 0,
			price: parseFloat(p.price),
			description: p.description || "",
			status: p.status === "active" ? "active" : "inactive",
		}));

		return formattedProducts;
	} catch (error) {
		console.error("Failed to fetch products:", error);
		return [];
	}
};
