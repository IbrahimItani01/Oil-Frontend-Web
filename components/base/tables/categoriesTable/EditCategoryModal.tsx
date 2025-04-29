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
import { Service } from "@/lib/content/services.content";
import ImagePreview from "../../dashboard/header/ServiceModal/ImagePreview";
import InputBody from "../../dashboard/header/ServiceModal/InputBody";
import ModalFooter from "../../dashboard/header/ServiceModal/ModalFooter";
import { updateService } from "@/store/slices/services.slice";

interface ServiceFormData {
	id: string;
	photo: string | null | File;
	name: string;
	type: string;
	duration: string;
	fee: number;
	description: string;
	status: "active" | "inactive";
}

interface EditServiceModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	service: Service;
}

const EditserviceModal = ({
	open,
	onOpenChange,
	service,
}: EditServiceModalProps) => {
	const dispatch = useDispatch();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [isDragging, setIsDragging] = useState(false);

	const [formData, setFormData] = useState<ServiceFormData>({
		id: service.id,
		name: service.name,
		description: service.description,
		fee: service.fee,
		type: service.type,
		photo: null,
		duration: service.duration,
		status: service.status,
	});

	useEffect(() => {
		if (service?.photo) {
			setImagePreview(service.photo);
		}
		setFormData({
			id: service.id,
			name: service.name,
			description: service.description,
			fee: service.fee,
			type: service.type,
			photo: null,
			duration: service.duration,
			status: service.status,
		});
	}, [service]);

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
		let uploadedImagePath = service.photo;

		if (formData.photo instanceof File) {
			let extension = formData.photo.name.split(".").pop();
			photoFilename = `${service.id}-service.${extension}`;

			const imageForm = new FormData();
			imageForm.append("image", formData.photo, photoFilename);

			// Upload logic here
			// await fetch("/api/upload/service-image", {
			// 	method: "POST",
			// 	body: imageForm,
			// });

			uploadedImagePath = `/static/servicesImages/${photoFilename}`;
		}

		const updatedservice: Service = {
			id: service.id,
			name: formData.name,
			description: formData.description,
			fee: formData.fee,
			type: formData.type,
			photo: uploadedImagePath ?? "",
			duration: formData.duration,
			status: formData.status,
		};

		dispatch(updateService(updatedservice));
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
						resetForm={() => setFormData(service)}
						isEdit={true}
					/>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default EditserviceModal;
