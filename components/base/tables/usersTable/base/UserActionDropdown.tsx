import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell } from "@/components/ui/table";
import { MoreHorizontal, Trash2 } from "lucide-react";
import React from "react";
import { UserCellProps } from "./UserNameCell";
import { usersActions } from "@/lib/content/users.content";
import { useDispatch } from "react-redux";
import { toggleBlockStatus } from "@/store/slices/users.slice";

const UserActionDropdown = ({ user }: UserCellProps) => {
	const dispatch = useDispatch();

	const handleUserAction = () => {
		dispatch(toggleBlockStatus(user.id));
	};
	return (
		<>
			<TableCell className='text-right'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='ghost'
							className='h-8 w-8 p-0'
						>
							<span className='sr-only'>Open menu</span>
							<MoreHorizontal className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuItem
							className='cursor-pointer'
							onClick={handleUserAction}
						>
							{user.status === "active" ? (
								<>
									<Trash2 className='mr-2 h-4 w-4 text-red-500' />
									<span className='text-red-500'>
										{usersActions.find((a) => a.id === "block")?.label}
									</span>
								</>
							) : (
								usersActions.find((a) => a.id === "unblock")?.label
							)}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		</>
	);
};

export default UserActionDropdown;
