import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { productColumns } from "@/lib/content/products.content";
import React from "react";

const ProductsTableHeader = () => {
	return (
		<TableHeader>
			<TableRow className='bg-gray-50'>
				{productColumns.map((column) => (
					<TableHead
						key={column.id}
						className='text-gray-500 font-normal'
					>
						{column.label}
					</TableHead>
				))}
				<TableHead className='text-right text-gray-500 font-normal'>
					Actions
				</TableHead>
			</TableRow>
		</TableHeader>
	);
};

export default ProductsTableHeader;
