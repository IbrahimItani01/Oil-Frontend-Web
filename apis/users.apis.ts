import axios from "axios";

export const handleBlockUser = async (token: string, phone: string | null) => {
	// try {
	// 	await axios.post(
	// 		`${process.env.NEXT_PUBLIC_APIS_URL}/admin/block_user`,
	// 		{
	// 			phone_number: phone,
	// 		},
	// 		{
	// 			headers: {
	// 				Authorization: `Bearer ${token}`,
	// 			},
	// 		}
	// 	);
	// } catch (error) {
	// 	console.error("Error blocking user:", error);
	// }
};
