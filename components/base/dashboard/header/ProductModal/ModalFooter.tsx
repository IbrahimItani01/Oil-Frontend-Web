import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import React from "react";

interface ModalFooterProps {
	resetForm: () => void;
	onOpenChange: (open: boolean) => void;
	isEdit: boolean;
}

const ModalFooter = ({
	resetForm,
	onOpenChange,
	isEdit = false,
}: ModalFooterProps) => {
	return (
		<DialogFooter className='flex justify-between sm:justify-between gap-2 pt-4 border-t'>
			<Button
				type='button'
				variant='outline'
				onClick={() => {
					onOpenChange(false);
					resetForm();
				}}
				className='flex-1 sm:flex-none w-[100px]'
			>
				Cancel
			</Button>
			<Button
				type='submit'
				className='flex-1 sm:flex-none bg-black text-white hover:bg-gray-800 w-[100px]'
			>
				{isEdit ? "Edit" : "Add"}
			</Button>
		</DialogFooter>
	);
};

export default ModalFooter;
