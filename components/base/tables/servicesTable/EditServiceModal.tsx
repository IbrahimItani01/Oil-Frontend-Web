"use client";

import type React from "react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import { Product } from "@/lib/content/products.content";
import { useDispatch } from "react-redux";
import { updateProduct } from "@/store/slices/products.slice";
import ImagePreview from "../../dashboard/header/ProductModal/ImagePreview";
import InputBody from "../../dashboard/header/ProductModal/InputBody";
import ModalFooter from "../../dashboard/header/ProductModal/ModalFooter";

interface ServiceFormData {
	id: string;
	photo: string | null | File;
	name: string;
	type: string;
	amountSold: number;
	price: number;
	description: string;
	status: "active" | "inactive";
}

interface EditServiceModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	product: Product;
}

const EditProductModal = ({
	open,
	onOpenChange,
	product,
}: EditServiceModalProps) => {
	const dispatch = useDispatch();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [isDragging, setIsDragging] = useState(false);

	const [formData, setFormData] = useState<ServiceFormData>({
		id: product.id,
		name: product.name,
		description: product.description,
		price: product.price,
		type: product.type,
		photo: null,
		amountSold: product.amountSold,
		status: product.status,
	});

	useEffect(() => {
		if (product?.photo) {
			setImagePreview(product.photo);
		}
		setFormData({
			id: product.id,
			name: product.name,
			description: product.description,
			price: product.price,
			type: product.type,
			photo: null,
			amountSold: product.amountSold,
			status: product.status,
		});
	}, [product]);

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
			reader.onload = () => setImagePreview(reader.result as string);
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
			reader.onload = () => setImagePreview(reader.result as string);
			reader.readAsDataURL(file);
		}
	};
	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const handleTypeChange = (value: string) => {
		setFormData((prev) => ({ ...prev, type: value }));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		let photoFilename = "";
		let uploadedImagePath = product.photo;

		if (formData.photo instanceof File) {
			let extension = formData.photo.name.split(".").pop();
			photoFilename = `${product.id}-product.${extension}`;

			const imageForm = new FormData();
			imageForm.append("image", formData.photo, photoFilename);

			// Upload logic here
			// await fetch("/api/upload/product-image", {
			// 	method: "POST",
			// 	body: imageForm,
			// });

			uploadedImagePath = `/static/productsImages/${photoFilename}`;
		}

		const updatedProduct: Product = {
			id: product.id,
			name: formData.name,
			description: formData.description,
			price: formData.price,
			type: formData.type,
			photo: uploadedImagePath ?? "",
			amountSold: formData.amountSold,
			status: formData.status,
		};

		dispatch(updateProduct(updatedProduct));
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
						Edit Product
					</DialogTitle>
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
						resetForm={() => setFormData(product)}
                        isEdit= {true}
					/>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default EditProductModal;
