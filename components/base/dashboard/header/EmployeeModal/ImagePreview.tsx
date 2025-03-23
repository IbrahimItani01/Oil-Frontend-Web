import { Button } from "@/components/ui/button";
import React, { ChangeEvent } from "react";

interface ImagePreview {
	isDragging: boolean;
	handleDragOver: (e: React.DragEvent) => void;
	handleDragLeave: (e: React.DragEvent) => void;
	handleDrop: (e: React.DragEvent) => void;
	fileInputRef: React.RefObject<HTMLInputElement | null>;
	imagePreview: string | null;
	handleImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ImagePreview = ({
	fileInputRef,
	handleDragLeave,
	handleDragOver,
	handleDrop,
	handleImageUpload,
	imagePreview,
	isDragging,
}: ImagePreview) => {
	return (
		<div
			className={` relative mx-auto w-48 h-48 rounded-full border-2 border-dashed flex flex-col items-center justify-center cursor-pointer ${
				isDragging ? "border-primary bg-primary/5" : "border-gray-300"
			}`}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
			onClick={() => fileInputRef.current?.click()}
		>
			{imagePreview ? (
				<div className='w-full h-full rounded-full overflow-hidden'>
					<img
						src={imagePreview || "/placeholder.svg"}
						alt='Employee'
						className='w-full h-full object-cover'
					/>
				</div>
			) : (
				<>
					<p className='text-sm text-center text-gray-500'>
						Drag and drop to upload, or
					</p>
					<Button
						variant='secondary'
						size='sm'
						className='mt-2 '
						type='button'
					>
						Add image
					</Button>
				</>
			)}
			<input
				ref={fileInputRef}
				type='file'
				accept='image/*'
				className='hidden'
				onChange={handleImageUpload}
			/>
		</div>
	);
};

export default ImagePreview;
