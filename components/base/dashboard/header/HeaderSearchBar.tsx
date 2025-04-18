"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setQueriedUsers } from "@/store/slices/users.slice";

interface SearchBarProps {
	placeholder?: string;
}

const HeaderSearchBar = ({
	placeholder = "Type to search...",
}: SearchBarProps) => {
	const pathname = usePathname();
	const dispatch = useDispatch();
	const allUsers = useSelector((state: RootState) => state.users.users);
	const [value, setValue] = useState("");
	const selectedStatus = useSelector(
		(state: RootState) => state.users.selectedStatus
	);

	const handleSearch = useCallback(
		(searchVal: string) => {
			if (pathname === "/dashboard/users") {
				const trimmed = searchVal.trim();

				// 🔄 Reset filter on empty search
				if (!trimmed) {
					const filtered = selectedStatus
						? allUsers.filter((user) => user.status === selectedStatus)
						: allUsers;

					dispatch(setQueriedUsers(filtered));
					return;
				}

				// 🔍 Apply search + status filter
				const filtered = allUsers.filter((user) => {
					const matchesName = user.name
						.toLowerCase()
						.includes(trimmed.toLowerCase());
					const matchesStatus = selectedStatus
						? user.status === selectedStatus
						: true;
					return matchesName && matchesStatus;
				});

				dispatch(setQueriedUsers(filtered));
			}
		},
		[allUsers, dispatch, pathname, selectedStatus]
	);

	const handleChange = (val: string) => {
		setValue(val);
		handleSearch(val);

		// 👉 Handle resets for other paths here if needed
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
