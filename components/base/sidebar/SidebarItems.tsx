"use client";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { navigationItems } from "@/lib/constants/sidebar.constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SidebarItems = () => {
	const pathname = usePathname();

	return (
		<>
			{navigationItems.map((item) => (
				<SidebarMenuItem key={item.name}>
					<SidebarMenuButton
						isActive={pathname === item.href}
						asChild
					>
						<Link href={item.href}>
							<item.icon />
							<span>{item.name}</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</>
	);
};

export default SidebarItems;
