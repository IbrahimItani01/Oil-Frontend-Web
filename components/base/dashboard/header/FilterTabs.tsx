"use client";

import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import {
	employeesFilter,
	employeesFilterDefault,
} from "@/lib/content/employees.content";
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
import React, { useEffect, useState } from "react";

const FilterTabs = () => {
	const pathname = usePathname();
	const dispatch = useAppDispatch();
	const allUsers = useAppSelector((state) => state.users.users);
	const allEmployees = useAppSelector((state) => state.employees.employees);

	// Each section gets its own tab state
	const [userTab, setUserTab] = useState(usersFilterDefault);
	const [employeeTab, setEmployeeTab] = useState(employeesFilterDefault);

	// Reset tabs when switching routes
	useEffect(() => {
		if (pathname === "/dashboard/users") {
			setUserTab(usersFilterDefault); // "all"
			dispatch(setSelectedUserStatus(null)); // clear filter
			dispatch(setQueriedUsers(allUsers)); // show all users
		}
		if (pathname === "/dashboard/employees") {
			setEmployeeTab(employeesFilterDefault);
			dispatch(setSelectedEmployeeStatus(null));
			dispatch(setQueriedEmployees(allEmployees));
		}
	}, [pathname, dispatch, allUsers, allEmployees]);

	if (pathname === "/dashboard/users") {
		const handleUsersFilter = (status: string) => {
			setUserTab(status);
			dispatch(setSelectedUserStatus(status === "all" ? null : status));
			const filtered =
				status === "all"
					? allUsers
					: allUsers.filter((u) => u.status === status);
			dispatch(setQueriedUsers(filtered));
		};

		return (
			<Tabs value={userTab}>
				<TabsList className='bg-gray-100 p-1 rounded-lg'>
					{usersFilters.map((filter, i) => (
						<TabsTrigger
							key={i}
							className='min-w-[100px] cursor-pointer transition-all duration-300 ease-in-out data-[state=active]:bg-white data-[state=active]:shadow-sm'
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
			setEmployeeTab(status);
			dispatch(setSelectedEmployeeStatus(status === "all" ? null : status));
			const filtered =
				status === "all"
					? allEmployees
					: allEmployees.filter((e) => e.status === status);
			dispatch(setQueriedEmployees(filtered));
		};

		return (
			<Tabs value={employeeTab}>
				<TabsList className='bg-gray-100 p-1 rounded-lg'>
					{employeesFilter.map((filter, i) => (
						<TabsTrigger
							key={i}
							className='min-w-[100px]  cursor-pointer transition-all duration-300 ease-in-out data-[state=active]:bg-white data-[state=active]:shadow-sm'
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
