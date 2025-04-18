"use client";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { useAppSelector } from "@/store/store";
import EmployeesTableHeader from "./base/EmployeesTableHeader";
import EmployeeNameCell from "./base/EmployeeNameCell";
import EmployeeNextAppointmentCell from "./base/EmployeeNextAppointmentCell";
import EmployeeAvailabilityCell from "./base/EmployeeAvailabilityCell";
import EmployeeActionsDropDown from "./base/EmployeeActionsDropDown";

const employeesTable = () => {
	const employees = useAppSelector((state) => state.employees.queriedEmployees);

	return (
		<div className='w-full relative'>
			<Table>
				<EmployeesTableHeader />
				<TableBody>
					{employees.map((employee) => (
						<TableRow
							key={employee.id}
							className={employee.status==="inactive"? "opacity-60" : ""}
						>
							<TableCell className='font-medium'>{employee.id}</TableCell>
							<EmployeeNameCell employee={employee} />
							<TableCell>{employee.phoneNumber}</TableCell>
							<TableCell>{employee.balance}</TableCell>
							<EmployeeNextAppointmentCell employee={employee} />
							<EmployeeAvailabilityCell employee={employee} />
							<EmployeeActionsDropDown employee={employee} />
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default employeesTable;
