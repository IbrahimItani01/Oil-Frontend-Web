"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/store/store";
import { login } from "@/store/slices/user.slice";
import { handleLogin } from "@/apis/auth.apis";

export default function AuthForm() {
	const dispatch = useAppDispatch(); // Redux dispatch hook

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const { userName, jwtToken } = await handleLogin(formData);
			localStorage.setItem("token", jwtToken);
			dispatch(login({ userName, jwtToken }));

			console.log("User logged in:", { userName, jwtToken });
		} catch (error) {
			console.error("Login failed:", error);
		}
	};

	return (
		<div className='flex min-h-screen flex-col items-center justify-center md:flex-row md:gap-12 p-4 bg-[#F7F9FB]'>
			<div className='flex flex-col items-center mb-8 md:mb-0 md:bg-[#F7F9FB] md:p-12 md:rounded-lg'>
				<Image
					src={"/logo.png"}
					alt='Company Logo'
					width={300}
					height={300}
					className='mb-4'
				/>
			</div>

			{/* Sign In Form */}
			<Card className='w-full max-w-md border-dashed border-gray-300'>
				<CardHeader>
					<CardTitle className='text-2xl font-normal'>Sign in</CardTitle>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={handleSubmit}
						className='space-y-6'
					>
						<div className='space-y-2'>
							<Label
								htmlFor='email'
								className='text-gray-700'
							>
								Email
							</Label>
							<Input
								id='email'
								type='email'
								placeholder='name@email.com'
								value={formData.email}
								onChange={handleChange}
								className='rounded-md border-gray-300'
								required
							/>
						</div>
						<div className='space-y-2'>
							<Label
								htmlFor='password'
								className='text-gray-700'
							>
								Password
							</Label>
							<Input
								id='password'
								type='password'
								placeholder='Enter your password'
								value={formData.password}
								onChange={handleChange}
								className='rounded-md border-gray-300'
								required
							/>
						</div>
						<Button
							type='submit'
							className='w-full bg-black hover:bg-gray-800 text-white rounded-full py-6 cursor-pointer'
						>
							Login
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
