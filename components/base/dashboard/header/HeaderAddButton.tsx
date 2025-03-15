"use client";
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

interface HeaderAddButtonProps {
	onClick?: () => void;
}
const HeaderAddButton = ({ onClick }: HeaderAddButtonProps) => {
	const pathname = usePathname();

	if (
		pathname !== "/dashboard/employees" &&
		pathname !== "/dashboard/products"
	) {
		return null;
	}

	return (
		<Button
			variant='ghost'
			size='icon'
			onClick={onClick}
			className='h-9 w-9 flex-shrink-0 cursor-pointer'
		>
			<Plus className='h-5 w-5' />
			<span className='sr-only'>Add new</span>
		</Button>
	);
};

export default HeaderAddButton;
