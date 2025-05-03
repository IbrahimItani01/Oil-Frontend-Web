"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "@/components/ui/sidebar";
import { useAppSelector } from "@/store/store";
import React from "react";

const UserProfileHeader = () => {
	const { open } = useSidebar();
	const { userName, userPhoto } = useAppSelector((state) => state.user);

	// Generate fallback initials
	const getInitials = (name: string) => {
		const names = name.trim().split(" ");
		return names.length > 1
			? `${names[0][0]}${names[1][0]}`.toUpperCase()
			: names[0].slice(0, 2).toUpperCase();
	};

	return (
		<div className='flex items-center gap-2'>
			<Avatar>
				<AvatarImage src={userPhoto || "/logo.png"} />
				<AvatarFallback>{getInitials(userName || "User")}</AvatarFallback>
			</Avatar>
			{open && <p>{userName || "Unknown User"}</p>}
		</div>
	);
};

export default UserProfileHeader;
