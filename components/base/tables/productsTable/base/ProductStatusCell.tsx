import { TableCell } from "@/components/ui/table";
import React from "react";
import { ProductCellProps } from "./ProductPhotoCell";

const ProductStatusCell = ({ product }: ProductCellProps) => {
	return (
		<TableCell>
			<div className='flex items-center gap-2'>
				<span
					className={`h-2 w-2 rounded-full ${
						product.status === "active" ? "bg-blue-400" : "bg-red-400"
					}`}
				></span>
				<span
					className={
						product.status === "active" ? "text-blue-400" : "text-red-400"
					}
				>
					{product.status}
				</span>
			</div>
		</TableCell>
	);
};

export default ProductStatusCell;
