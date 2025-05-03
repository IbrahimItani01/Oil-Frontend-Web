import dotenv from "dotenv";
import axios, { AxiosError } from "axios";

dotenv.config();

type Login = {
	email: string;
	password: string;
};

type LoginReturn = {
	userName: string;
	userPhoto: string | null;
	jwtToken: string;
};

export const handleLogin = async ({
	email,
	password,
}: Login): Promise<LoginReturn> => {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_APIS_URL}/admin/login`,
			{
				email,
				password,
			}
		);

		const { data } = response.data;

		const user = data.user;

		return {
			userName:
				user.first_name && user.last_name
					? `${user.first_name} ${user.last_name}`
					: user.email ?? "Unknown User",
			userPhoto: user.profile_image ?? null,
			jwtToken: data.access_token,
		};
	} catch (error: any) {
		console.error("Login failed:", error.response?.data || error.message);
		throw new Error("Login request failed");
	}
};
