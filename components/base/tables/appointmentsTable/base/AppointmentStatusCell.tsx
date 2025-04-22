import { TableCell } from "@/components/ui/table";
import { Appointment } from "@/lib/content/appointments.content";
import React from "react";

interface AppointmentStatusProps {
	appointment: Appointment;
}

export const statusStyles: Record<
	Appointment["status"],
	{ dot: string; text: string }
> = {
	canceled: {
		dot: "bg-red-300",
		text: "text-red-400",
	},
	"in-progress": {
		dot: "bg-indigo-400",
		text: "text-indigo-400",
	},
	scheduled: {
		dot: "bg-yellow-300",
		text: "text-yellow-600  decoration-purple-400",
	},
	completed: {
		dot: "bg-sky-200",
		text: "text-sky-500",
	},
};

const AppointmentStatusCell = ({ appointment }: AppointmentStatusProps) => {
	const styles = statusStyles[appointment.status];

	return (
		<TableCell>
			<div className='flex items-center gap-2'>
				<span className={`h-2 w-2 rounded-full ${styles.dot}`} />
				<span className={styles.text}>
					{appointment.status
						.split("-")
						.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
						.join(" ")}
				</span>
			</div>
		</TableCell>
	);
};

export default AppointmentStatusCell;
