"use client";

import { useState } from "react";
import {
	usersActions,
	usersColumns,
	usersData,
} from "@/lib/content/users.content";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, MoreHorizontal, Trash2 } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";

const UsersTable = () => {
	const [selectedUser, setSelectedUser] = useState<string | null>(null);
	const [showBlockModal, setShowBlockModal] = useState(false);
	const [userToBlock, setUserToBlock] = useState<string | null>(null);

	return (
		<div className='w-full relative'>
			<Table>
				<TableHeader>
					<TableRow className='bg-gray-50'>
						{usersColumns.map((column) => (
							<TableHead
								key={column.id}
								className='text-gray-500 font-normal'
							>
								{column.label}
							</TableHead>
						))}
						<TableHead className='text-right text-gray-500 font-normal'>
							Actions
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{usersData.map((user) => (
						<TableRow key={user.id}>
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
													if (action.label === "Block User") {
														setUserToBlock(user.phoneNumber);
														setShowBlockModal(true);
													} else {
														setSelectedUser(user.id);
														action.onClick(user.id);
													}
												}}
												className='cursor-pointer'
											>
												{action.label === "Block User" ? (
													<div className='flex items-center gap-2 text-red-500'>
														<Trash2 className='h-4 w-4' />
														<span>Block User</span>
													</div>
												) : (
													action.label
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

			{/* Actions Dropdown Panel (shown on the right in the image) */}
			{selectedUser && (
				<div className='absolute right-0 top-0 w-64 bg-white shadow-lg rounded-md p-4 border'>
					<h3 className='text-lg font-medium mb-4'>Actions Dropdown</h3>
					<Button
						variant='outline'
						className='w-full justify-start gap-2 text-red-500 border-gray-200'
						onClick={() => {
							// Handle block user action
							setSelectedUser(null);
						}}
					>
						<Trash2 className='h-4 w-4' />
						Block User
					</Button>
				</div>
			)}

			{/* Confirmation Modal */}
			<Dialog
				open={showBlockModal}
				onOpenChange={setShowBlockModal}
			>
				<DialogContent className='sm:max-w-md'>
					<DialogHeader>
						<DialogTitle className='flex items-center gap-2'>
							<AlertCircle className='h-5 w-5 text-red-500' />
							Block User
						</DialogTitle>
						<DialogDescription>
							Are you sure you want to block this user? This action cannot be
							undone.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className='sm:justify-start gap-2 mt-4'>
						<Button
							type='button'
							variant='destructive'
							onClick={() => {
								// Find the block action and execute it
								const blockAction = usersActions.find(
									(action) => action.label === "Block User"
								);
								if (blockAction && userToBlock) {
									blockAction.onClick(userToBlock);
								}
								setShowBlockModal(false);
								setUserToBlock(null);
							}}
						>
							Yes, Block User
						</Button>
						<Button
							type='button'
							variant='outline'
							onClick={() => {
								setShowBlockModal(false);
								setUserToBlock(null);
							}}
						>
							Cancel
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default UsersTable;
