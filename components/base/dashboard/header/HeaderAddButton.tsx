"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import EmployeeModal from "./AddEmployeeModal";
import ProductModal from "./AddProductModal";

const HeaderAddButton = () => {
	const pathname = usePathname();
	const [openEmployee, setOpenEmployee] = useState(false);
	const [openProduct, setOpenProduct] = useState(false);
	if (
		pathname !== "/dashboard/employees" &&
		pathname !== "/dashboard/products"
	) {
		return null;
	}
	const handleOpen = () => {
		if (pathname.includes("employees")) {
			setOpenEmployee(true);
		} else if (pathname.includes("products")) {
			setOpenProduct(true);
		}
	};
	return (
		<>
			<Button
				variant='ghost'
				size='icon'
				onClick={handleOpen}
				className='h-9 w-9 flex-shrink-0 cursor-pointer'
			>
				<Plus className='h-5 w-5' />
				<span className='sr-only'>Add new</span>
			</Button>
			{openEmployee && (
				<EmployeeModal
					open={openEmployee}
					onOpenChange={setOpenEmployee}
				/>
			)}
			{openProduct && (
				<ProductModal
					open={openProduct}
					onOpenChange={setOpenProduct}
				/>
			)}
		</>
	);
};

export default HeaderAddButton;
