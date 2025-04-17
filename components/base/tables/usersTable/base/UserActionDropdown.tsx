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
import ConfirmModal from "../ConfirmModal";
import { UserCellProps } from "./UserNameCell";
import { Action, usersActions } from "@/lib/content/users.content";

interface UserActionProp extends UserCellProps {
	userActions: Action[];
}

const UserActionDropdown = ({ user, userActions }: UserActionProp) => {
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
						{usersActions.map((action) => (
							<DropdownMenuItem
								key={action.id}
								onClick={() => {
									// TODO: rehandle the logic
								}}
								className='cursor-pointer'
							>
								<div className='flex items-center gap-2 text-red-500'>
									<Trash2 className='h-4 w-4' />
									<span>{action.label}</span>
								</div>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
			{/* TODO: Re-check the modal for re-structuring */}
			<ConfirmModal
				setShowBlockModal={setShowBlockModal}
				setUserToBlock={setUserToBlock}
				showBlockModal={showBlockModal}
				userToBlock={userToBlock}
			/>
		</>
	);
};

export default UserActionDropdown;
