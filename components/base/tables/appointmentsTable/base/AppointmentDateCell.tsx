import { TableCell } from "@/components/ui/table";
import { Appointment } from "@/lib/content/appointments.content";
import { Calendar } from "lucide-react";
import React from "react";

export interface AppointmentDateProps {
	appointment: Appointment;
}
const AppointmentDateCell = ({ appointment }: AppointmentDateProps) => {
	return (
		<TableCell>
			{appointment.date ? (
				<div className='flex items-center gap-2'>
					<Calendar className='h-4 w-4' />
					<span>{appointment.date}</span>
				</div>
			) : (
				<span>-</span>
			)}
		</TableCell>
	);
};

export default AppointmentDateCell;
