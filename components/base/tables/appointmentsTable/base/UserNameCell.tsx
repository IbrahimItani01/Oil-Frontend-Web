import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell } from "@/components/ui/table";
import { Appointment } from "@/lib/content/appointments.content";
import React from "react";

export interface UserCellProps {
	appointment: Appointment;
}

const UserNameCell = ({ appointment }: UserCellProps) => {
	return (
		<TableCell>
			<div className='flex items-center gap-2'>
				<Avatar className='h-8 w-8'>
					<AvatarImage
						src={appointment.userPhoto}
						alt={appointment.userName}
						className='object-cover w-full h-full rounded-full'
					/>

					<AvatarFallback>{appointment.userName.charAt(0)}</AvatarFallback>
				</Avatar>
				<span>{appointment.userName}</span>
			</div>
		</TableCell>
	);
};

export default UserNameCell;
