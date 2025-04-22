import { TableCell } from "@/components/ui/table";
import { Appointment } from "@/lib/content/appointments.content";
import { DollarSign } from "lucide-react";
import React from "react";

interface AppointmentsCostProps {
	appointment: Appointment;
}

const AppointmentCostCell = ({ appointment }: AppointmentsCostProps) => {
	return (
		<TableCell>
			{appointment.date ? (
				<div className='flex items-center gap-1'>
					<span>${appointment.cost}</span>
				</div>
			) : (
				<span>-</span>
			)}
		</TableCell>
	);
};

export default AppointmentCostCell;
