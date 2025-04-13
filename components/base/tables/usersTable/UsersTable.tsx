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
import ConfirmModal from "./base/ConfirmModal";
import { useAppSelector } from "@/store/store";

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
							<TableCell>
								<div className='flex items-center gap-2'>
									<Avatar className='h-8 w-8'>
										<AvatarImage
											src={user.avatar || "/placeholder.svg"}
											alt={user.name}
										/>
										<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
									</Avatar>
									<span>{user.name}</span>
								</div>
							</TableCell>
							<TableCell>{user.phoneNumber}</TableCell>
							<TableCell>{user.email}</TableCell>
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
							<TableCell>
								<div className='flex items-center gap-2'>
									<span
										className={`h-2 w-2 rounded-full ${
											user.status === "active" ? "bg-blue-400" : "bg-red-400"
										}`}
									></span>
									<span
										className={
											user.status === "active"
												? "text-blue-400"
												: "text-red-400"
										}
									>
										{user.status}
									</span>
								</div>
							</TableCell>
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
													setSelectedUser(user.id);
													if (action.label === "Block/Un-block User") {
														setUserToBlock(user.id);
														setShowBlockModal(true);
													}
													action.onClick(user.id);
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
							<ConfirmModal
								setShowBlockModal={setShowBlockModal}
								setUserToBlock={setUserToBlock}
								showBlockModal={showBlockModal}
								userToBlock={userToBlock}
							/>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default UsersTable;
