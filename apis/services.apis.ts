import { Appointment } from "@/lib/content/appointments.content";
import { Product } from "@/lib/content/products.content";
import { Service } from "@/lib/content/services.content";
import axios from "axios";

export const syncModifiedServices = async (modifiedProducts: Service[]) => {
	const syncUrl = process?.env?.NEXT_PUBLIC_SERVICES_SYNC_DATA_URL;
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
		const response = await axios.get(process.env.NEXT_PUBLIC_SERVICES_GET_URL!);
		const servicesRaw = response.data.data.data;

		const services: Service[] = servicesRaw.map((s: any) => ({
			id: String(s.id),
			photo: "", // No image field in API, set blank or update if added later
			name: s.name,
			type: s.category?.name || "",
			fee: parseFloat(s.fee),
			duration: String(s.duration),
			description: s.description || "",
			status: s.status === "active" ? "active" : "inactive",
		}));

		return services;
	} catch (error) {
		console.error("Failed to fetch services:", error);
		return [];
	}
};
