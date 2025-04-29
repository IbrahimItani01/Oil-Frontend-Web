import { TableCell } from "@/components/ui/table";
import React from "react";
import { CategoryCellProps } from "./CategoryDropDownActions";

const CategoryForCell = ({ category }: CategoryCellProps) => {
	return (
		<TableCell>
			<div className='flex items-center gap-2'>
				<span
					className={`h-2 w-2 rounded-full ${
						category.for === "product" ? "bg-orange-400" : "bg-blue-400"
					}`}
				></span>
				<span
					className={
						category.for === "product" ? "text-orange-400" : "text-blue-400"
					}
				>
					{category.for}
				</span>
			</div>
		</TableCell>
	);
};

export default CategoryForCell;
