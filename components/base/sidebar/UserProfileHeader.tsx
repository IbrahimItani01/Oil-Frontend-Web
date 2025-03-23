"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "@/components/ui/sidebar";
import React from "react";

const UserProfileHeader = () => {
	const { open } = useSidebar();
	return (
		<div className='flex items-center gap-2'>
			<Avatar>
				{/* TODO: replace with profile image url from server-side */}
				<AvatarImage src='/logo.png' />
				<AvatarFallback>ALH</AvatarFallback>
			</Avatar>
			{/* TODO: Replace with user real username */}
			{open && <p>John Doe</p>}
		</div>
	);
};

export default UserProfileHeader;
