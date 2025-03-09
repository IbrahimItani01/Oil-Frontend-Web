export const handleLogin = async (formData: {
	email: string;
	password: string;
}): Promise<{ userName: string; jwtToken?: string }> => {
	// TODO: Fetch the login API and return JWT token and username

	// Example response (will be replaced by real data after linking)
	return {
		userName: formData.email,
		jwtToken: "sample.jwt.token",
	};
};
