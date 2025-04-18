import axios from "axios";
import { User } from "@/lib/content/users.content";

export const syncModifiedUsers = async (modifiedUsers: User[]) => {
	const syncUrl = process?.env?.NEXT_PUBLIC_USERS_SYNC_DATA_URL;
	if (syncUrl) {
		try {
			await axios.post(syncUrl, modifiedUsers, {
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
			console.error("Error syncing users:", error);
		}
	}
};
