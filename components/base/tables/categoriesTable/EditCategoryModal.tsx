"use client";

import type React from "react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import { useDispatch } from "react-redux";
import { Category } from "@/lib/content/categories.content";
import { updateCategory } from "@/store/slices/categories.slice";
import InputBody from "../../dashboard/header/CategoryModal/InputBody";
import ModalFooter from "../../dashboard/header/CategoryModal/ModalFooter";

interface CategoryFormData {
	id: string;
	name: string;
	description: string;
}

interface EditCategoryModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	category: Category;
}

const EditCategoryModal = ({
	open,
	onOpenChange,
	category,
}: EditCategoryModalProps) => {
	const dispatch = useDispatch();

	const [formData, setFormData] = useState<CategoryFormData>({
		id: category.id,
		name: category.name,
		description: category.description,
	});

	useEffect(() => {
		setFormData({
			id: category.id,
			name: category.name,
			description: category.description,
		});
	}, [category]);

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const updatedCategory: Category = {
			id: category.id,
			name: formData.name,
			description: formData.description,
		};

		dispatch(updateCategory(updatedCategory));
		onOpenChange(false);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent className='sm:max-w-md md:max-w-lg'>
				<DialogHeader>
					<DialogTitle className='text-xl font-medium'>
						Edit service
					</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit}
					className='space-y-6'
				>
					<InputBody
						formData={formData}
						handleInputChange={handleInputChange}
					/>

					<ModalFooter
						onOpenChange={onOpenChange}
						resetForm={() => setFormData(category)}
						isEdit={true}
					/>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default EditCategoryModal;
