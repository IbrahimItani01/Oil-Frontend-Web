"use client"
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

interface SearchBarProps {
	placeholder?: string;
	onChange?: (value: string) => void;
}

const HeaderSearchBar = ({
	placeholder = "Search...",
	onChange,
}: SearchBarProps) => {

    const pathname = usePathname();

    if(pathname === '/dashboard') return null;

	return (
		<div>
			<div className='relative w-full max-w-[300px] min-w-[180px]'>
				<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
				<Input
					type='search'
					placeholder={placeholder}
					onChange={(e) => onChange?.(e.target.value)}
					className='pl-9 h-9'
				/>
			</div>
		</div>
	);
};

export default HeaderSearchBar;
