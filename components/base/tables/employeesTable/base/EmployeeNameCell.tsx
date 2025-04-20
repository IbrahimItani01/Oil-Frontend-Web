import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell } from "@/components/ui/table";
import { Employee } from "@/lib/content/employees.content";
import React from "react";

export interface EmployeeCellProps {
	employee: Employee;
}

const EmployeeNameCell = ({ employee }: EmployeeCellProps) => {
	return (
		<TableCell>
			<div className='flex items-center gap-2'>
				<Avatar className='h-8 w-8'>
					<AvatarImage
						src={employee.photo}
						alt={employee.name}
						className='object-cover w-full h-full rounded-full'
					/>

					<AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
				</Avatar>
				<span>{employee.name}</span>
			</div>
		</TableCell>
	);
};

export default EmployeeNameCell;
