"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LogoutModal from "./LogoutModal";

const Footer = () => {
	const { open } = useSidebar();
	const navigate = useRouter();
	const [showModal, setShowModal] = useState(false);

	const handleLogout = () => {
		// handle logout
		localStorage.removeItem("token");
		navigate.push("/");
	};

	const handleOpenModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<>
			<div
				onClick={handleOpenModal}
				className={`cursor-pointer flex items-center ${
					!open ? "justify-center" : "ml-2"
				} gap-2 text-red-400 hover:text-red-700 transition-all`}
			>
				<LogOut size={18} />
				{open && <p>Logout</p>}
			</div>
			{showModal && (
				<LogoutModal
					handleCloseModal={handleCloseModal}
					handleLogout={handleLogout}
				/>
			)}
		</>
	);
};

export default Footer;
