"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setQueriedUsers } from "@/store/slices/users.slice";
import { setQueriedEmployees } from "@/store/slices/employees.slice";

interface SearchBarProps {
	placeholder?: string;
}

const HeaderSearchBar = ({
	placeholder = "Type to search...",
}: SearchBarProps) => {
	const pathname = usePathname();
	const dispatch = useDispatch();
	const allUsers = useSelector((state: RootState) => state.users.users);
	const allEmployees = useSelector(
		(state: RootState) => state.employees.employees
	);
	const [value, setValue] = useState("");
	const selectedUsersStatus = useSelector(
		(state: RootState) => state.users.selectedStatus
	);
	const selectedEmployeesStatus = useSelector(
		(state: RootState) => state.employees.selectedStatus
	);
	const handleSearch = useCallback(
		(searchVal: string) => {
			if (pathname === "/dashboard/users") {
				const trimmed = searchVal.trim();

				// 🔄 Reset filter on empty search
				if (!trimmed) {
					const filtered = selectedUsersStatus
						? allUsers.filter((user) => user.status === selectedUsersStatus)
						: allUsers;

					dispatch(setQueriedUsers(filtered));
					return;
				}

				// 🔍 Apply search + status filter
				const filtered = allUsers.filter((user) => {
					const matchesName = user.name
						.toLowerCase()
						.includes(trimmed.toLowerCase());
					const matchesStatus = selectedUsersStatus
						? user.status === selectedUsersStatus
						: true;
					return matchesName && matchesStatus;
				});

				dispatch(setQueriedUsers(filtered));
			}
			if (pathname === "/dashboard/employees") {
				const trimmed = searchVal.trim();

				if (!trimmed) {
					const filtered = selectedEmployeesStatus
						? allEmployees.filter(
								(user) => user.status === selectedEmployeesStatus
						  )
						: allEmployees;

					dispatch(setQueriedEmployees(filtered));
					return;
				}

				// 🔍 Apply search + status filter
				const filtered = allEmployees.filter((user) => {
					const matchesName = user.name
						.toLowerCase()
						.includes(trimmed.toLowerCase());
					const matchesStatus = selectedEmployeesStatus
						? user.status === selectedEmployeesStatus
						: true;
					return matchesName && matchesStatus;
				});

				dispatch(setQueriedEmployees(filtered));
			}
		},
		[
			allUsers,
			allEmployees,
			dispatch,
			pathname,
			selectedUsersStatus,
			selectedEmployeesStatus,
		]
	);

	const handleChange = (val: string) => {
		setValue(val);
		handleSearch(val);
	};

	if (pathname === "/dashboard") return null;

	return (
		<div className='relative w-[100%] max-w-[350px] min-w-[200px]'>
			<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
			<Input
				type='search'
				placeholder={placeholder}
				value={value}
				onChange={(e) => handleChange(e.target.value)}
				className='pl-9 h-9'
			/>
		</div>
	);
};

export default HeaderSearchBar;
