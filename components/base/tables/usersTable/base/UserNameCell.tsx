import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell } from "@/components/ui/table";
import { User } from "@/lib/content/users.content";
import { Avatar } from "@radix-ui/react-avatar";
import React from "react";

export interface UserCellProps {
	user: User;
}

const UserNameCell = ({ user }: UserCellProps) => {
	return (
		<TableCell>
			<div className='flex items-center gap-2'>
				<Avatar className='h-8 w-8'>
					<AvatarImage
						src={user.photo}
						alt={user.name}
						className='object-cover w-full h-full rounded-full'
					/>
					<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
				</Avatar>
				<span>{user.name}</span>
			</div>
		</TableCell>
	);
};

export default UserNameCell;
