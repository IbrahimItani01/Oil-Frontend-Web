"use client";
import { TableCell } from "@/components/ui/table";
import { Appointment } from "@/lib/content/appointments.content";
import { Info } from "lucide-react";
import React, { useState } from "react";
import AppointmentDetails from "./AppointmentDetails";

interface AppointmentModalProps {
	appointment: Appointment;
}

const AppointmentModal = ({ appointment }: AppointmentModalProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleRowClick = () => {
		setIsModalOpen(true);
	};
	return (
		<>
			<TableCell className='text-right'>
				<div className='flex justify-end items-center'>
					<Info
						size={20}
						className='text-muted-foreground cursor-pointer'
						onClick={handleRowClick}
					/>
				</div>
			</TableCell>
			<AppointmentDetails
				appointment={appointment}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</>
	);
};

export default AppointmentModal;
