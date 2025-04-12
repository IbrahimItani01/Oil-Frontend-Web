import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

type Login = {
	email: string;
	password: string;
};

type LoginReturn = {
	userName: string;
	jwtToken: string;
};

export const handleLogin = async ({
	email,
	password,
}: Login): Promise<LoginReturn> => {
	try {
		const response = await axios.post(`${process.env.APIS_URL}/auth/login`, {
			email,
			password,
		});

		const { data } = response.data;

		return {
			userName: data.user.name ?? data.user.email ?? "Unknown User",
			jwtToken: data.access_token,
		};
	} catch (error: any) {
		console.error("Login failed:", error.response?.data || error.message);
		throw new Error("Login request failed");
	}
};
