"use client";

import type React from "react";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import ImagePreview from "./ProductModal/ImagePreview";
import InputBody from "./ProductModal/InputBody";
import ModalFooter from "./ProductModal/ModalFooter";
import { Product } from "@/lib/content/products.content";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addProduct } from "@/store/slices/products.slice";
import { createProduct } from "@/apis/products.apis";
import { setLoaderOff, setLoaderOn } from "@/store/slices/app.slice";

export interface ProductFormData {
	id: string;
	photo: File | null;
	name: string;
	type: string;
	amountSold: number;
	price: number;
	description: string;
	status: "active" | "inactive";
}
interface AddProductModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const ProductModal = ({ open, onOpenChange }: AddProductModalProps) => {
	const [formData, setFormData] = useState<ProductFormData>({
		name: "",
		description: "",
		price: 0,
		type: "",
		photo: null,
		amountSold: 0,
		id: "",
		status: "inactive",
	});
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setFormData((prev) => ({ ...prev, photo: file }));
			const reader = new FileReader();
			reader.onload = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	};
	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
		const file = e.dataTransfer.files?.[0];
		if (file) {
			setFormData((prev) => ({ ...prev, photo: file }));
			const reader = new FileReader();
			reader.onload = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};
	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		onOpenChange(false);
		dispatch(setLoaderOn());
		const token = localStorage.token;
		const productData = await createProduct(formData, token);
		const returnedProduct: Product = {
			id: productData.id.toString(),
			name: productData.name,
			description: productData.description,
			price: parseFloat(productData.price),
			type: productData.category_id,
			photo: productData.image_url,
			amountSold: 0,
			status: "active",
		};
		dispatch(addProduct(returnedProduct));
		resetForm();
		dispatch(setLoaderOff());
	};
	const resetForm = () => {
		setFormData({
			name: "",
			description: "",
			price: 0,
			type: "",
			photo: null,
			id: "",
			amountSold: 0,
			status: "inactive",
		});
		setImagePreview(null);
	};
	const handleTypeChange = (value: string) => {
		setFormData((prev) => ({ ...prev, type: value }));
	};

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent className='sm:max-w-md md:max-w-lg'>
				<DialogHeader>
					<DialogTitle className='text-xl font-medium'>Add Product</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit}
					className='space-y-6'
				>
					<ImagePreview
						fileInputRef={fileInputRef}
						handleDragLeave={handleDragLeave}
						handleDragOver={handleDragOver}
						handleDrop={handleDrop}
						handleImageUpload={handleImageUpload}
						imagePreview={imagePreview}
						isDragging={isDragging}
					/>

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

export default ProductModal;
