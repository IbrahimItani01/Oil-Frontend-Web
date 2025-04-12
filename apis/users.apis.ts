import axios from "axios";
import { headers } from "next/headers";

export const handleBlockUser = async (token: string, phone: string) => {
	try {
		await axios.post(
			`${process.env.APIS_URL}/admin/block_user`,
			{
				phone_number: phone,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
	} catch (error) {
		console.error("Error blocking user:", error);
	}
};
