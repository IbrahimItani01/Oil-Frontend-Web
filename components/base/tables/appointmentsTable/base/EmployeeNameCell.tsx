import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell } from "@/components/ui/table";
import { Appointment } from "@/lib/content/appointments.content";
import React from "react";

export interface EmployeeCellProps {
	appointment: Appointment;
}

const EmployeeNameCell = ({ appointment }: EmployeeCellProps) => {
	return (
		<TableCell>
			<div className='flex items-center gap-2'>
				<Avatar className='h-8 w-8'>
					<AvatarImage
						src={appointment.employeePhoto}
						alt={appointment.employeeName}
						className='object-cover w-full h-full rounded-full'
					/>

					<AvatarFallback>{appointment.employeeName.charAt(0)}</AvatarFallback>
				</Avatar>
				<span>{appointment.employeeName}</span>
			</div>
		</TableCell>
	);
};

export default EmployeeNameCell;
