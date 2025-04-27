"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import EmployeeModal from "./AddEmployeeModal";
import ProductModal from "./AddProductModal";
import ServiceModal from "./AddServiceModal";

const HeaderAddButton = () => {
	const pathname = usePathname();
	const [openEmployee, setOpenEmployee] = useState(false);
	const [openProduct, setOpenProduct] = useState(false);
	const [openService, setOpenService] = useState(false);
	if (
		pathname !== "/dashboard/employees" &&
		pathname !== "/dashboard/products" &&
		pathname !== "/dashboard/services"
	) {
		return null;
	}
	const handleOpen = () => {
		if (pathname.includes("employees")) {
			setOpenEmployee(true);
		} else if (pathname.includes("products")) {
			setOpenProduct(true);
		} else if (pathname.includes("services")) {
			setOpenService(true);
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
			{openService && (
				<ServiceModal
					open={openService}
					onOpenChange={setOpenService}
				/>
			)}
		</>
	);
};

export default HeaderAddButton;
