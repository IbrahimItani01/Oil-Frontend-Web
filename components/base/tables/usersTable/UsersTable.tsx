"use client";

import { useEffect, useState } from "react";
import { usersActions, usersData } from "@/lib/content/users.content";
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
import UserDropDown from "./base/UserDropDown";
import ConfirmModal from "./base/ConfirmModal";

const UsersTable = () => {
	const [selectedUser, setSelectedUser] = useState<string | null>(null);
	const [showBlockModal, setShowBlockModal] = useState(false);
	const [userToBlock, setUserToBlock] = useState<string | null>(null);
	const [blockedUsers, setBlockedUsers] = useState<Set<string>>(new Set());
	useEffect(() => {
		console.log(blockedUsers);
	}, [setBlockedUsers]);
	return (
		<div className='w-full relative'>
			<Table>
				<UserTableHeader />
				<TableBody>
					{usersData.map((user) => (
						<TableRow
							key={user.id}
							className={
								blockedUsers.has(user.phoneNumber)
									? "line-through opacity-60"
									: ""
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
											user.status === "Active" ? "bg-blue-400" : "bg-red-400"
										}`}
									></span>
									<span
										className={`${
											user.status === "Active"
												? "text-blue-400"
												: "text-red-400"
										}`}
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
													if (action.label === "Block/Un-block User") {
														setUserToBlock(user.phoneNumber);
														setShowBlockModal(true);
                            setSelectedUser(user.id);
														action.onClick(user.id);
													} else {
														setSelectedUser(user.id);
														action.onClick(user.id);
													}
												}}
												className='cursor-pointer'
											>
												{action.label === "Block/Un-block User" ? (
													<div className='flex items-center gap-2 text-red-500'>
														<Trash2 className='h-4 w-4' />
														<span>Block/Un-block User</span>
													</div>
												) : (
													<div className='flex items-center gap-2 text-red-500'>
														<Trash2 className='h-4 w-4' />
														<span>Block/Un-block User</span>
													</div>
												)}
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{/* Confirmation Modal */}
			<ConfirmModal
				setShowBlockModal={setShowBlockModal}
				setUserToBlock={setUserToBlock}
				showBlockModal={showBlockModal}
				userToBlock={userToBlock}
				setIsBlocked={setBlockedUsers}
				blockedUsers={blockedUsers}
			/>
		</div>
	);
};

export default UsersTable;
