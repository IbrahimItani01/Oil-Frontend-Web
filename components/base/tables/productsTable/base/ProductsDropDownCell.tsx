import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import { ProductCellProps } from "./ProductPhotoCell";
import { Action, productsActions } from "@/lib/content/products.content";
import EditProductModal from "../EditProductModal";
import { useDispatch } from "react-redux";
import { deleteProduct } from "@/store/slices/products.slice";

const ProductsDropDownActions = ({ product }: ProductCellProps) => {
	const [editModalOpen, setEditModalOpen] = useState(false);
	const dispatch = useDispatch();

	const renderDropDown = (action: Action) => {
		const Icon = action.icon;

		const handleAction = () => {
			if (action.id === "edit") {
				setEditModalOpen(true);
			} else if (action.id === "delete") {
				dispatch(deleteProduct(product.id));
			}
		};

		return (
			<DropdownMenuItem
				key={action.id}
				onClick={handleAction}
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

			<EditProductModal
				open={editModalOpen}
				onOpenChange={setEditModalOpen}
				product={product}
			/>
		</TableCell>
	);
};

export default ProductsDropDownActions;
