import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { categoriesColums } from "@/lib/content/categories.content";
import { serviceColumns } from "@/lib/content/services.content";
import React from "react";

const CategoriesTableHeader = () => {
	return (
		<TableHeader>
			<TableRow className='bg-gray-50'>
				{categoriesColums.map((column) => (
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

export default CategoriesTableHeader;
