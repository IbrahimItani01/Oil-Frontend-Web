"use client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDataTableContext } from "@/hooks/context/DataTableContext";
import { DollarSign, MoreHorizontal, Trash } from "lucide-react";
import { usePathname } from "next/navigation";

const DropdownActions = () => {
	const { actions } = useDataTableContext();
	const pathname = usePathname();

	const handleAction = (action: string) => {
		if (pathname.includes("employess")) {
			// TODO: handle either cash-out or delete
		} else if (pathname.includes("users")) {
			// TODO: handle block user
		}
	};

	const formatAction = (action: string) => {
		return action
			.split(/[-\s]/) // Split by "-" or spaces
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					className='h-8 w-8 p-0'
				>
					<MoreHorizontal className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				{actions.map((action, i) => (
					<DropdownMenuItem
						variant={
							action === "delete" || action.includes("block")
								? "destructive"
								: "default"
						}
						key={i}
						onClick={() => handleAction(action)}
					>
						{/* Conditional Icon Rendering */}
						{action === "delete" || action.includes("block") ? (
							<Trash className='w-4 h-4 mr-2 text-red-500' />
						) : action === "cash-out" ? (
							<DollarSign className='w-4 h-4 mr-2' />
						) : null}

						{formatAction(action)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DropdownActions;
