import { Order } from "@/lib/content/orders.content";

export const fetchOrders = async (): Promise<Order[]> => {
	try {
		// Replace with actual API call in future
		// const response = await axios.get("/api/employees");
		// return response.data;

		return [];
	} catch (error) {
		console.error("Failed to fetch orders:", error);
		return [];
	}
};
