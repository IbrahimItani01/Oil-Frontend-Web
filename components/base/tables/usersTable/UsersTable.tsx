"use client";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import UserTableHeader from "./base/UserTableHeader";
import { useAppSelector } from "@/store/store";
import UserNameCell from "./base/UserNameCell";
import UserNextAppointment from "./base/UserNextAppointment";
import UserStatusCell from "./base/UserStatusCell";
import UserActionDropdown from "./base/UserActionDropdown";
import { formatPhoneNumber } from "@/lib/utils/formatting";

const UsersTable = () => {
	const users = useAppSelector((state) => state.users.queriedUsers);

	

	return (
		<div className='w-full relative'>
			<Table>
				<UserTableHeader />
				<TableBody>
					{users.map((user) => (
						<TableRow key={user.id}>
							<TableCell className='font-medium'>{user.id}</TableCell>
							<UserNameCell user={user} />
							<TableCell>{formatPhoneNumber(user.phoneNumber)}</TableCell>
							<TableCell>{user.email}</TableCell>
							<UserNextAppointment user={user} />
							<UserStatusCell user={user} />
							<UserActionDropdown user={user} />
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default UsersTable;
