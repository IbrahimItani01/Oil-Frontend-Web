"use client";

import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import { employeesFilter } from "@/lib/content/employees.content";
import { usersFilterDefault, usersFilters } from "@/lib/content/users.content";
import {
	setQueriedEmployees,
	setSelectedEmployeeStatus,
} from "@/store/slices/employees.slice";
import {
	setQueriedUsers,
	setSelectedUserStatus,
} from "@/store/slices/users.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { TabsList } from "@radix-ui/react-tabs";
import { usePathname } from "next/navigation";
import React from "react";

const FilterTabs = () => {
	const pathname = usePathname();
	const dispatch = useAppDispatch();

	const allUsers = useAppSelector((state) => state.users.users);
	const allEmployees = useAppSelector((state) => state.employees.employees);

	if (pathname === "/dashboard/users") {
		const handleUsersFilter = (status: string) => {
			dispatch(setSelectedUserStatus(status === "all" ? null : status)); // null for "all"

			if (status === "all") {
				dispatch(setQueriedUsers(allUsers));
			} else {
				const filteredUsers = allUsers.filter((user) => user.status === status);
				dispatch(setQueriedUsers(filteredUsers));
			}
		};

		return (
			<Tabs defaultValue={usersFilterDefault}>
				<TabsList className=''>
					{usersFilters.map((filter, i) => (
						<TabsTrigger
							key={i}
							className='w-[100px] cursor-pointer'
							value={filter.value}
							onClick={() => handleUsersFilter(filter.value)}
						>
							{filter.label}
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>
		);
	}
	if (pathname === "/dashboard/employees") {
		const handleEmployeesFilter = (status: string) => {
			dispatch(setSelectedEmployeeStatus(status === "all" ? null : status));

			if (status === "all") {
				dispatch(setQueriedEmployees(allEmployees));
			} else {
				const filteredEmployees = allEmployees.filter(
					(employee) => employee.status === status
				);
				dispatch(setQueriedEmployees(filteredEmployees));
			}
		};

		return (
			<Tabs defaultValue={usersFilterDefault}>
				<TabsList className=''>
					{employeesFilter.map((filter, i) => (
						<TabsTrigger
							key={i}
							className='w-[100px] cursor-pointer'
							value={filter.value}
							onClick={() => handleEmployeesFilter(filter.value)}
						>
							{filter.label}
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>
		);
	}
	return <></>;
};

export default FilterTabs;
