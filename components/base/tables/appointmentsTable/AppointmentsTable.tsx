"use client";
import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { useAppSelector } from "@/store/store";
import AppointmentsTableHeader from "./base/AppointmentsTableHeader";
import EmployeeNameCell from "./base/EmployeeNameCell";
import UserNameCell from "./base/UserNameCell";
import AppointmentDateCell from "./base/AppointmentDateCell";
import AppointmentCostCell from "./base/AppointmentCostCell";
import AppointmentStatusCell from "./base/AppointmentStatusCell";
import { Info } from "lucide-react";
import AppointmentModal from "./base/AppointmentModal";

const AppointmentsTable = () => {
	const appointments = useAppSelector(
		(state) => state.appintments.queriedAppointments
	);

	return (
		<div className='w-full relative'>
			<Table>
				<AppointmentsTableHeader />
				<TableBody>
					{appointments.map((appointment) => (
						<TableRow key={appointment.id}>
							<TableCell className='font-medium'>{appointment.id}</TableCell>
							<EmployeeNameCell appointment={appointment} />
							<UserNameCell appointment={appointment} />
							<AppointmentDateCell appointment={appointment} />
							<AppointmentCostCell appointment={appointment} />
							<AppointmentStatusCell appointment={appointment} />
							<AppointmentModal appointment={appointment} />
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default AppointmentsTable;
