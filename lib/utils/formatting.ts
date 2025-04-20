import { countryCodes } from "../constants/codes.constants";

export const formatPhoneNumber = (phoneNumber: string): string => {
	if (!phoneNumber.startsWith("+")) return phoneNumber;

	// Sort country codes by length to match the longest first
	const sortedCodes = countryCodes.sort(
		(a, b) => b.code.length - a.code.length
	);

	// Find the longest matching country code
	const matchedCode = sortedCodes.find((entry) =>
		phoneNumber.startsWith(entry.code)
	);
	if (!matchedCode) return phoneNumber; // If no match, return as is

	const localNumber = phoneNumber.slice(matchedCode.code.length);

	if (!localNumber) return matchedCode.code;

	// Format the local number with spaces every 3 digits (except the first one)
	const firstDigit = localNumber.charAt(0);
	const rest = localNumber.slice(1);
	const spacedRest = rest.replace(/(\d{3})(?=\d)/g, "$1 ").trim();

	const formattedLocal = [firstDigit, spacedRest].filter(Boolean).join(" ");

	return `${matchedCode.code} ${formattedLocal}`;
};
