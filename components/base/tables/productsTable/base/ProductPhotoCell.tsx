import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell } from "@/components/ui/table";
import { Product } from "@/lib/content/products.content";
import React from "react";

export interface ProductCellProps {
	product: Product;
}

const ProductPhotoCell = ({ product }: ProductCellProps) => {
	return (
		<TableCell>
			<div className='flex items-center gap-2'>
				<Avatar className='h-8 w-8'>
					<AvatarImage
						src={product.photo}
						alt={product.name}
						className='object-cover w-full h-full rounded-full'
					/>

					<AvatarFallback>{product.name.charAt(0)}</AvatarFallback>
				</Avatar>
			</div>
		</TableCell>
	);
};

export default ProductPhotoCell;
