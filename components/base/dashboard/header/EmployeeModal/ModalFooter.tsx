import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import React from "react";

interface ModalFooterProps {
	onOpenChange: (n: boolean) => void;
	resetForm: () => void;
}

const ModalFooter = ({ onOpenChange, resetForm }: ModalFooterProps) => {
	return (
		<DialogFooter className=' sm:justify-between'>
			<Button
				type='button'
				variant='outline'
				className='w-[100px]'
				onClick={() => {
					onOpenChange(false);
					resetForm();
				}}
			>
				Cancel
			</Button>
			<Button
				className='w-[100px]'
				type='submit'
			>
				Add
			</Button>
		</DialogFooter>
	);
};

export default ModalFooter;
