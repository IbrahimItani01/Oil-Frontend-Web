import { ProductFormData } from "@/components/base/dashboard/header/AddProductModal";
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
export const createProduct = async (data: ProductFormData, token: string) => {
	try {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("price", data.price.toString());
		formData.append("description", data.description);
		formData.append("category_id", data.type);

		if (data.photo) {
			formData.append("image", data.photo);
		}

		const response = await axios.post(
			process.env.NEXT_PUBLIC_PRODUCTS_CREATE_URL!,
			formData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			}
		);

		return response.data.data.product;
	} catch (error) {
		console.error("Product creation failed", error);
		throw error;
	}
};
