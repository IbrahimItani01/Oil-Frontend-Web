"use client";

import { usePathname } from "next/navigation";
import HeaderAddButton from "./dashboard/header/HeaderAddButton";
import HeaderSearchBar from "./dashboard/header/HeaderSearchBar";
import { SidebarTrigger } from "../ui/sidebar";

interface DashboardHeaderProps {
	onSearch?: (search: string) => void;
	onAdd?: () => void;
}

export function DashboardHeader({ onSearch, onAdd }: DashboardHeaderProps) {
	const pathname = usePathname();
	const title = pathname.split("/").pop() || "Dashboard";

	const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1);

	return (
		<header className='flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between'>
			<div
				className='flex
            items-center gap-2'
			>
				<SidebarTrigger />

				<h1 className='text-2xl font-semibold tracking-tight'>
					{formattedTitle}
				</h1>
			</div>
			<div className='flex items-center gap-2'>
				<HeaderAddButton onClick={onAdd} />
				<HeaderSearchBar onChange={onSearch} />
			</div>
		</header>
	);
}
