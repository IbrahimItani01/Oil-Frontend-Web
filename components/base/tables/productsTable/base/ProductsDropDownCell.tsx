import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { ProductCellProps } from "./ProductPhotoCell";
import { Action, productsActions } from "@/lib/content/products.content";

const ProductsDropDownActions = ({ product }: ProductCellProps) => {
	const renderDropDown = (action: Action) => {
		const Icon = action.icon;

		return (
			<DropdownMenuItem
				key={action.id}
				onClick={() => {}}
				className='cursor-pointer'
			>
				<div
					className={`flex items-center gap-2 ${
						action.id === "delete" && "text-red-500"
					}`}
				>
					<Icon
						className='h-4 w-4'
						color={action.color}
					/>
					<span>{action.label}</span>
				</div>
			</DropdownMenuItem>
		);
	};
	return (
		<TableCell className='text-right'>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='ghost'
						className='h-8 w-8 p-0'
					>
						<span className='sr-only'>Open menu</span>
						<MoreHorizontal className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					{productsActions.map((action) => renderDropDown(action))}
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	);
};

export default ProductsDropDownActions;
