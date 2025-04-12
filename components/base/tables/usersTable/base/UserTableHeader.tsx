import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usersColumns } from "@/lib/content/users.content";
const UserTableHeader = () => {
	return (
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
	);
};

export default UserTableHeader;
