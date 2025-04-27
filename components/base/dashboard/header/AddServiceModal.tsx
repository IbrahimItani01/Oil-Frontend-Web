"use client";

import type React from "react";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import ImagePreview from "./ServiceModal/ImagePreview";
import InputBody from "./ServiceModal/InputBody";
import ModalFooter from "./ServiceModal/ModalFooter";
import { Product } from "@/lib/content/products.content";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addProduct } from "@/store/slices/products.slice";
import { Service } from "@/lib/content/services.content";
import { addService } from "@/store/slices/services.slice";

interface ServiceFormData {
	id: string;
	photo: File | null;
	name: string;
	type: string;
	fee: number;
	description: string;
	duration: string;
	status: "active" | "inactive";
}
interface AddServiceModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const ServiceModal = ({ open, onOpenChange }: AddServiceModalProps) => {
	const [formData, setFormData] = useState<ServiceFormData>({
		name: "",
		description: "",
		fee: 0,
		type: "",
		photo: null,
		duration: "",
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
			setFormData((prev) => ({ ...prev, image: file }));
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
			setFormData((prev) => ({ ...prev, image: file }));
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

		const id = uuidv4().slice(0, 3);
		let photoFilename = "";
		let uploadedImagePath;
		if (formData.photo) {
			const extension = formData.photo.name.split(".").pop();
			photoFilename = `${id}-service.${extension}`;

			const imageForm = new FormData();
			imageForm.append("image", formData.photo, photoFilename);

			// Upload the image
			// const response = await fetch("/api/upload/product-image", {
			// 	method: "POST",
			// 	body: imageForm,
			// });

			// if (!response.ok) {
			// 	console.error("Image upload failed");
			// 	return;
			// }

			uploadedImagePath = `/static/productsImages/${photoFilename}`;
		}

		const newService: Service = {
			id,
			name: formData.name,
			description: formData.description,
			fee: formData.fee,
			type: formData.type,
			photo: uploadedImagePath ?? "",
			duration: formData.duration,
			status: formData.status === "active" ? "active" : "inactive",
		};

		dispatch(addService(newService));
		onOpenChange(false);
		resetForm();
	};
	const resetForm = () => {
		setFormData({
			name: "",
			description: "",
			fee: 0,
			type: "",
			photo: null,
			id: "",
			duration: "",
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
					<DialogTitle className='text-xl font-medium'>Add Service</DialogTitle>
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

export default ServiceModal;
