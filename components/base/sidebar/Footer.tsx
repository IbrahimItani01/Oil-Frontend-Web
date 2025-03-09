"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = () => {
	const { open } = useSidebar();
	const navigate = useRouter();
	const handleLogout = () => {
		// handle logout
		localStorage.removeItem("token");
		navigate.push("/");

	};
	return (
		<div onClick={handleLogout} className={`cursor-pointer flex items-center ${!open? 'justify-center':'ml-2'} gap-2 text-red-400 hover:text-red-700 transition-all`}>
			<LogOut size={18} />
			{open && <p>Logout</p>}
		</div>
	);
};

export default Footer;
