import { TableCell } from "@/components/ui/table";
import { Calendar } from "lucide-react";
import React from "react";
import { EmployeeCellProps } from "./EmployeeNameCell";

const EmployeeNextAppointmentCell = ({ employee }: EmployeeCellProps) => {
	return (
		<TableCell>
			{employee.nextAppointment ? (
				<div className='flex items-center gap-2'>
					<Calendar className='h-4 w-4' />
					<span>{employee.nextAppointment}</span>
				</div>
			) : (
				<span>-</span>
			)}
		</TableCell>
	);
};

export default EmployeeNextAppointmentCell;
