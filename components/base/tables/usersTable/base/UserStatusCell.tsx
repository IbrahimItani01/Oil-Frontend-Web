import { TableCell } from "@/components/ui/table";
import React from "react";
import { UserCellProps } from "./UserNameCell";

const UserStatusCell = ({ user }: UserCellProps) => {
	return (
		<TableCell>
			<div className='flex items-center gap-2'>
				<span
					className={`h-2 w-2 rounded-full ${
						user.status === "active" ? "bg-blue-400" : "bg-red-400"
					}`}
				></span>
				<span
					className={
						user.status === "active" ? "text-blue-400" : "text-red-400"
					}
				>
					{user.status}
				</span>
			</div>
		</TableCell>
	);
};

export default UserStatusCell;
