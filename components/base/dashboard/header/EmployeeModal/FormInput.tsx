"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	countryCodes,
	countryPhoneMaxLengths,
} from "@/lib/constants/codes.constants";

interface FormInputProps {
	id: string;
	name: string;
	type?: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	required?: boolean;
	isPhoneInput?: boolean;
}

// Common country codes with flags

const FormInput: React.FC<FormInputProps> = ({
	id,
	name,
	type = "text",
	value,
	onChange,
	placeholder,
	required,
	isPhoneInput = false,
}) => {
	const [countryCode, setCountryCode] = useState("+961"); // Default to Lebanon as in your placeholder
	const [phoneNumber, setPhoneNumber] = useState("");

	// Extract country code from value on initial render
	useEffect(() => {
		if (isPhoneInput && value) {
			// Try to find a matching country code in the value
			const matchedCode = countryCodes.find((c) => value.startsWith(c.code));
			if (matchedCode) {
				setCountryCode(matchedCode.code);
				setPhoneNumber(value.substring(matchedCode.code.length).trim());
			} else {
				setPhoneNumber(value);
			}
		}
	}, []);

	// Handle phone number input change
	const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value;
		const digitsOnly = rawValue.replace(/\D/g, ""); // remove non-digits

		const maxDigits = countryPhoneMaxLengths[countryCode] || 10;
		const limitedDigits = digitsOnly.slice(0, maxDigits);

		// Format with spaces every 3 digits
		const formatted = limitedDigits.replace(/(\d{3})(?=\d)/g, "$1 ").trim();

		setPhoneNumber(formatted);

		// Prepare unformatted number to pass in value
		const fullNumber = `${countryCode}${limitedDigits}`;

		const syntheticEvent = {
			...e,
			target: {
				...e.target,
				name: id,
				id,
				value: fullNumber,
			},
		} as React.ChangeEvent<HTMLInputElement>;

		onChange(syntheticEvent);
	};

	// Handle country code change
	const handleCountryCodeChange = (newCode: string) => {
		setCountryCode(newCode);

		// Create a synthetic event to pass to the parent's onChange
		const syntheticEvent = {
			target: {
				name: id,
				id,
				value: `${newCode}${phoneNumber}`,
			},
		} as React.ChangeEvent<HTMLInputElement>;

		onChange(syntheticEvent);
	};

	return (
		<div className='flex flex-col gap-2'>
			<Label
				htmlFor={id}
				className='flex items-center'
			>
				{name} {required && <span className='text-red-500'>*</span>}
			</Label>

			{isPhoneInput ? (
				<div className='flex'>
					<Select
						value={countryCode}
						onValueChange={handleCountryCodeChange}
					>
						<SelectTrigger className='w-[110px] rounded-r-none border-r-0'>
							<SelectValue placeholder={countryCode} />
						</SelectTrigger>
						<SelectContent>
							{countryCodes.map((country) => (
								<SelectItem
									key={country.code}
									value={country.code}
								>
									<span className='flex items-center gap-2'>
										<span>{country.flag}</span>
										<span>{country.code}</span>
									</span>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Input
						id={id}
						name={id}
						type='tel'
						value={phoneNumber}
						onChange={handlePhoneNumberChange}
						placeholder='Phone number'
						required={required}
						className='rounded-l-none'
					/>
				</div>
			) : (
				<Input
					id={id}
					name={id}
					type={type}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					required={required}
				/>
			)}
		</div>
	);
};

export default FormInput;
