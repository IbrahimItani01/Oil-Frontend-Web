"use client";

import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import { usersFilterDefault, usersFilters } from "@/lib/content/users.content";
import { setQueriedUsers, setSelectedStatus } from "@/store/slices/users.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { TabsList } from "@radix-ui/react-tabs";
import { usePathname } from "next/navigation";
import React from "react";

const FilterTabs = () => {
	const pathname = usePathname();
	const dispatch = useAppDispatch();

	const allUsers = useAppSelector((state) => state.users.users);

	if (pathname === "/dashboard/users") {
		const handleUsersFilter = (status: string) => {
			dispatch(setSelectedStatus(status === "all" ? null : status)); // null for "all"

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
	return <></>;
};

export default FilterTabs;
