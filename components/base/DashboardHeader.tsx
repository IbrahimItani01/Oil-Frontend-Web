"use client";

import { usePathname } from "next/navigation";
import HeaderAddButton from "./dashboard/header/HeaderAddButton";
import HeaderSearchBar from "./dashboard/header/HeaderSearchBar";
import { SidebarTrigger } from "../ui/sidebar";
import FilterTabs from "./dashboard/header/FilterTabs";

interface DashboardHeaderProps {}

export function DashboardHeader({}: DashboardHeaderProps) {
	const pathname = usePathname();
	const title = pathname.split("/").pop() || "Dashboard";

	const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1);

	return (
		<header className='flex flex-col gap-4 border-b p-4  sm:flex-row sm:items-center sm:justify-between'>
			<div
				className='flex
            items-center gap-2'
			>
				<SidebarTrigger />
				<h1 className='text-2xl font-semibold tracking-tight'>
					{formattedTitle}
				</h1>
				<div className="pl-4 ">
					<FilterTabs />
				</div>
			</div>
			<div className='flex items-center gap-2'>
				<HeaderAddButton />
				<HeaderSearchBar />
			</div>
		</header>
	);
}
