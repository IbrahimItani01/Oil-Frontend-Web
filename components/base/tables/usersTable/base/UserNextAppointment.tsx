import { TableCell } from "@/components/ui/table";
import { Calendar } from "lucide-react";
import React from "react";
import { UserCellProps } from "./UserNameCell";

const UserNextAppointment = ({ user }: UserCellProps) => {
	return (
		<TableCell>
			{user.nextAppointment ? (
				<div className='flex items-center gap-2'>
					<Calendar className='h-4 w-4' />
					<span>{user.nextAppointment}</span>
				</div>
			) : (
				<span>-</span>
			)}
		</TableCell>
	);
};

export default UserNextAppointment;
