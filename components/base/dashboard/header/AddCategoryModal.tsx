"use client";

import type React from "react";

import { ChangeEvent, FormEvent, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Category } from "@/lib/content/categories.content";
import { addCategory, setCategories } from "@/store/slices/categories.slice";
import InputBody from "./CategoryModal/InputBody";
import ModalFooter from "./CategoryModal/ModalFooter";
import { useAppSelector } from "@/store/store";

interface CatgoryFormData {
	id: string;
	name: string;
	description: string;
	for: "product" | "service";
}
interface AddCategoryModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const CategoryModal = ({ open, onOpenChange }: AddCategoryModalProps) => {
	const [formData, setFormData] = useState<CatgoryFormData>({
		name: "",
		description: "",
		id: "",
		for: "product",
	});
	const dispatch = useDispatch();
	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};
	const handleTypeChange = (value: "product" | "service") => {
		setFormData((prev) => ({ ...prev, for: value }));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const id = uuidv4().slice(0, 3);

		const newCategory: Category = {
			id,
			name: formData.name,
			description: formData.description,
			for: formData.for,
		};

		dispatch(addCategory(newCategory));
		onOpenChange(false);
		resetForm();
	};
	const resetForm = () => {
		setFormData({
			name: "",
			description: "",
			id: "",
			for: "product",
		});
	};

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent className='sm:max-w-md md:max-w-lg'>
				<DialogHeader>
					<DialogTitle className='text-xl font-medium'>
						Add Category
					</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit}
					className='space-y-6'
				>
					<InputBody
						formData={formData}
						handleInputChange={handleInputChange}
						handleTypeChange={handleTypeChange}
					/>

					<ModalFooter
						onOpenChange={onOpenChange}
						resetForm={resetForm}
						isEdit={false}
					/>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default CategoryModal;
