"use client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDataTableContext } from "@/hooks/context/DataTableContext";
import { MoreHorizontal } from "lucide-react";
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
						{action}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DropdownActions;
