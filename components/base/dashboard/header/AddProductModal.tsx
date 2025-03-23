"use client";

import type React from "react";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import ImagePreview from "./ProductModal/ImagePreview";
import InputBody from "./ProductModal/InputBody";
import ModalFooter from "./ProductModal/ModalFooter";

interface AddProductModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const ProductModal = ({ open, onOpenChange }: AddProductModalProps) => {
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		if (file) {
			setImageFile(file);
			const reader = new FileReader();
			reader.onload = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const file = e.dataTransfer.files?.[0] || null;
		if (file) {
			setImageFile(file);
			const reader = new FileReader();
			reader.onload = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const handleCancel = () => {
		onOpenChange(false);
		// Reset form state
		setImageFile(null);
		setImagePreview(null);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission logic here
		console.log("Form submitted");
		onOpenChange(false);
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
						handleDragOver={handleDragOver}
						handleDrop={handleDrop}
						handleImageChange={handleImageChange}
						imagePreview={imagePreview}
						setImageFile={setImageFile}
						setImagePreview={setImagePreview}
					/>

					<InputBody />

					<ModalFooter handleCancel={handleCancel} />
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default ProductModal;
