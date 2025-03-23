"use client";

import type React from "react";

import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import ImagePreview from "./EmployeeModal/ImagePreview";
import FormInput from "./EmployeeModal/FormInput";
import ModalFooter from "./EmployeeModal/ModalFooter";

interface EmployeeFormData {
	name: string;
	phoneNumber: string;
	emailAddress: string;
	image: File | null;
}

interface EmployeeModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const EmployeeModal = ({ open, onOpenChange }: EmployeeModalProps) => {
	const [formData, setFormData] = useState<EmployeeFormData>({
		name: "",
		phoneNumber: "",
		emailAddress: "",
		image: null,
	});
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
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

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		// Call the onSubmit callback with the form data

		// Close the modal and reset the form
		onOpenChange(false);
		resetForm();
	};

	const resetForm = () => {
		setFormData({
			name: "",
			phoneNumber: "",
			emailAddress: "",
			image: null,
		});
		setImagePreview(null);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(isOpen) => {
				onOpenChange(isOpen);
				if (!isOpen) resetForm();
			}}
		>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle className='text-xl font-medium'>
						Add Employee
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
						isDragging
					/>
					<div className='space-y-4'>
						<FormInput
							id='name'
							name='Name'
							value={formData.name}
							onChange={handleInputChange}
							placeholder='John Doe'
							required
						/>

						<FormInput
							id='phoneNumber'
							name='Phone Number'
							value={formData.phoneNumber}
							onChange={handleInputChange}
							placeholder='+961'
							required
						/>

						<FormInput
							id='emailAddress'
							name='Email Address'
							type='email'
							value={formData.emailAddress}
							onChange={handleInputChange}
							placeholder='name@email.com'
							required
						/>
					</div>

					<ModalFooter
						onOpenChange={onOpenChange}
						resetForm={resetForm}
					/>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default EmployeeModal;
