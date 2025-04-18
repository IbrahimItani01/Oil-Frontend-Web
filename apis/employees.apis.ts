import { Employee } from "@/lib/content/employees.content";
import axios from "axios";

export const syncModifiedEmployees = async (modifiedEmployees: Employee[]) => {
	const syncUrl = process?.env?.NEXT_PUBLIC_EMPLOYEES_SYNC_DATA_URL;
	if (syncUrl) {
		try {
			await axios.post(syncUrl, modifiedEmployees, {
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
			console.error("Error syncing users:", error);
		}
	}
};
export const fetchEmployees = async (): Promise<Employee[]> => {
	try {
		// Replace with actual API call in future
		// const response = await axios.get("/api/employees");
		// return response.data;

		return [];
	} catch (error) {
		console.error("Failed to fetch employees:", error);
		return [];
	}
};
