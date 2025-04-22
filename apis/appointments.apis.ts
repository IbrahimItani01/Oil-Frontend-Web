import { Appointment } from "@/lib/content/appointments.content";
import { Employee } from "@/lib/content/employees.content";
import axios from "axios";

export const syncModifiedAppointments = async (
	modifiedAppointments: Appointment[]
) => {
	const syncUrl = process?.env?.NEXT_PUBLIC_APPOINTMENTS_SYNC_DATA_URL;
	if (syncUrl) {
		try {
			await axios.post(syncUrl, modifiedAppointments, {
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
			console.error("Error syncing users:", error);
		}
	}
};
export const fetchAppointments = async (): Promise<Appointment[]> => {
	try {
		// Replace with actual API call in future
		// const response = await axios.get("/api/employees");
		// return response.data;

		return [];
	} catch (error) {
		console.error("Failed to fetch appointments:", error);
		return [];
	}
};
