import { Button } from "@/components/ui/button";
import React from "react";

interface ImagePreviewProps {
	handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
	handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
	imagePreview: string | null;
	setImageFile: (n: File | null) => void;
	setImagePreview: (n: string | null) => void;
	handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImagePreview = ({
	handleDragOver,
	handleDrop,
	handleImageChange,
	imagePreview,
	setImageFile,
	setImagePreview,
}: ImagePreviewProps) => {
	return (
		<div
			className='border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer'
			onDrop={handleDrop}
			onDragOver={handleDragOver}
		>
			{imagePreview ? (
				<div className='relative w-full h-48'>
					<img
						src={imagePreview || "/placeholder.svg"}
						alt='Product preview'
						className='w-full h-full object-contain'
					/>
					<Button
						type='button'
						variant='secondary'
						size='sm'
						className='absolute bottom-2 right-2'
						onClick={() => {
							setImageFile(null);
							setImagePreview(null);
						}}
					>
						Remove
					</Button>
				</div>
			) : (
				<>
					<p className='text-lg font-medium mb-2'>Nothing Here Yet</p>
					<p className='text-sm text-muted-foreground mb-4'>
						Drag and drop to upload, or
					</p>
					<div className='relative'>
						<Button
							type='button'
							variant='secondary'
							className='bg-black text-white hover:bg-gray-800'
						>
							Add image
						</Button>
						<input
							type='file'
							accept='image/*'
							className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
							onChange={handleImageChange}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default ImagePreview;
