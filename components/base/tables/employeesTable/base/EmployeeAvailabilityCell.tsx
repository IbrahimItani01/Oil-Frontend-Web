import { TableCell } from "@/components/ui/table";
import React from "react";
import { EmployeeCellProps } from "./EmployeeNameCell";

const EmployeeAvailabilityCell = ({ employee }: EmployeeCellProps) => {
	return (
		<TableCell>
			<div className='flex items-center gap-2'>
				{employee.status === "active" ? (
					<>
						<span
							className={`h-2 w-2 rounded-full ${
								employee.availability === "available"
									? "bg-blue-400"
									: "bg-red-400"
							}`}
						></span>
						<span
							className={
								employee.availability === "available"
									? "text-blue-400"
									: "text-red-400"
							}
						>
							{employee.availability}
						</span>
					</>
				) : (
					<span>-</span>
				)}
			</div>
		</TableCell>
	);
};

export default EmployeeAvailabilityCell;
