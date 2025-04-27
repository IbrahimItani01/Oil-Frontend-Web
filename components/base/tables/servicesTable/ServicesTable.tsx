"use client";
import { useAppSelector } from "@/store/store";
import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import ProductsTableHeader from "./base/ProductsTableHeader";
import ProductPhotoCell from "./base/ProductPhotoCell";
import ProductStatusCell from "./base/ProductStatusCell";
import ProductsDropDownActions from "./base/ProductsDropDownCell";

const ServicesTable = () => {
	const products = useAppSelector((state) => state.products.queriedProducts);

	return (
		<div className='w-full relative'>
			<Table>
				<ProductsTableHeader />
				<TableBody>
					{products.map((product) => (
						<TableRow
							key={product.id}
							className={product.status === "inactive" ? "opacity-60" : ""}
						>
							<TableCell className='font-medium'>{product.id}</TableCell>
							<ProductPhotoCell product={product} />
							<TableCell>{product.name}</TableCell>
							<TableCell>{product.type}</TableCell>
							<TableCell>{product.amountSold}</TableCell>
							<ProductStatusCell product={product} />
							<ProductsDropDownActions product={product} />
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default ServicesTable;
