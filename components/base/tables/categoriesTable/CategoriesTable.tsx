"use client";
import { useAppSelector } from "@/store/store";
import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import CategoriesTableHeader from "./base/CategoriesTableHeader";
import CategoriesDropDownActions from "./base/CategoryDropDownActions";
import CategoryForCell from "./base/CategoryForCell";

const CategoriesTable = () => {
	const categories = useAppSelector(
		(state) => state.categories.queriedCategories
	);

	return (
		<div className='w-full relative'>
			<Table>
				<CategoriesTableHeader />
				<TableBody>
					{categories.map((category) => (
						<TableRow key={category.id}>
							<TableCell className='font-medium'>{category.id}</TableCell>
							<TableCell>{category.name}</TableCell>
							<TableCell>{category.description}</TableCell>
							<CategoryForCell category={category} />
							<CategoriesDropDownActions category={category} />
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default CategoriesTable;
