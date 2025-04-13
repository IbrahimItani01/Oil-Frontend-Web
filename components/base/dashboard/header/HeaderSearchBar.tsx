"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setQueriedUsers } from "@/store/slices/users.slice";

interface SearchBarProps {
	placeholder?: string;
}

const HeaderSearchBar = ({
	placeholder = "Press enter to search",
}: SearchBarProps) => {
	const pathname = usePathname();
	const dispatch = useDispatch();
	const allUsers = useSelector((state: RootState) => state.users.users);
	const [value, setValue] = useState("");

	const handleSearch = useCallback(() => {
		if (pathname === "/dashboard/users") {
			if (!value.trim()) {
				dispatch(setQueriedUsers(allUsers));
				return;
			}
			const filtered = allUsers.filter((user) =>
				user.name.toLowerCase().includes(value.toLowerCase())
			);
			dispatch(setQueriedUsers(filtered));
		}

		// 👉 Add more pathname conditions for other logic
	}, [value, allUsers, dispatch, pathname]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	const handleChange = (val: string) => {
		setValue(val);

		if (pathname === "/dashboard/users" && val === "") {
			dispatch(setQueriedUsers(allUsers));
		}

		// 👉 Handle resets for other paths here if needed
	};

	return (
		<div className='relative w-[100%] max-w-[350px] min-w-[180px]'>
			<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
			<Input
				type='search'
				placeholder={placeholder}
				value={value}
				onChange={(e) => handleChange(e.target.value)}
				onKeyDown={handleKeyDown}
				className='pl-9 h-9'
			/>
		</div>
	);
};

export default HeaderSearchBar;
