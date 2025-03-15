// TODO: Fetch Auth apis

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
	// TODO: Fetch the login API and return JWT token and username

	// Example response (will be replaced by real data after linking)
	return {
		userName: email,
		jwtToken: "sample.jwt.token",
	};
};
