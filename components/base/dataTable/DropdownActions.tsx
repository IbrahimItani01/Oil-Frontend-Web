import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDataTableContext } from "@/hooks/context/DataTableContext";
import { MoreHorizontal } from "lucide-react";

const DropdownActions = () => {
	const { actions } = useDataTableContext();

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
						variant={action === "delete" || action.includes("block") ? "destructive" : "default"}
						key={i}
					>
						{action}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DropdownActions;
