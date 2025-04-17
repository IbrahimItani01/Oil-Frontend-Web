"use client";
import { useEffect, useState } from "react";
import { usersActions } from "@/lib/content/users.content";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, MoreHorizontal, Trash2 } from "lucide-react";

import UserTableHeader from "./base/UserTableHeader";
import ConfirmModal from "./ConfirmModal";
import { useAppSelector } from "@/store/store";
import UserNameCell from "./base/UserNameCell";
import UserNextAppointment from "./base/UserNextAppointment";
import UserStatusCell from "./base/UserStatusCell";
import UserActionDropdown from "./base/UserActionDropdown";

const UsersTable = () => {
	const users = useAppSelector((state) => state.users.queriedUsers);

	const [selectedUser, setSelectedUser] = useState<string | null>(null);
	const [showBlockModal, setShowBlockModal] = useState(false);
	const [userToBlock, setUserToBlock] = useState<string | null>(null);

	return (
		<div className='w-full relative'>
			<Table>
				<UserTableHeader />
				<TableBody>
					{users.map((user) => (
						<TableRow
							key={user.id}
							className={
								user.status === "blocked" ? "line-through opacity-60" : ""
							}
						>
							<TableCell className='font-medium'>{user.id}</TableCell>
							<UserNameCell user={user} />
							<TableCell>{user.phoneNumber}</TableCell>
							<TableCell>{user.email}</TableCell>
							<UserNextAppointment user={user} />
							<UserStatusCell user={user} />
							<UserActionDropdown
								user={user}
								userActions={usersActions}
							/>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default UsersTable;
