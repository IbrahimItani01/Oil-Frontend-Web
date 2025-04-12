import React from "react";
import { usersActions } from "@/lib/content/users.content";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";
interface ConfirmModalProp {
	showBlockModal: boolean;
	setShowBlockModal: (n: boolean) => void;
	userToBlock: string | null;
	setUserToBlock: (n: string | null) => void;
}
const ConfirmModal = ({
	showBlockModal,
	setShowBlockModal,
	userToBlock,
	setUserToBlock,
}: ConfirmModalProp) => {
	return (
		<Dialog
			open={showBlockModal}
			onOpenChange={setShowBlockModal}
		>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2'>
						<AlertCircle className='h-5 w-5 text-red-500' />
						Block User
					</DialogTitle>
					<DialogDescription>
						Are you sure you want to block this user? This action cannot be
						undone.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className='sm:justify-start gap-2 mt-4'>
					<Button
						type='button'
						variant='destructive'
						onClick={() => {
							// Find the block action and execute it
							const blockAction = usersActions.find(
								(action) => action.label === "Block User"
							);
							if (blockAction && userToBlock) {
								blockAction.onClick(userToBlock);
							}
							setShowBlockModal(false);
							setUserToBlock(null);
						}}
					>
						Yes, Block User
					</Button>
					<Button
						type='button'
						variant='outline'
						onClick={() => {
							setShowBlockModal(false);
							setUserToBlock(null);
						}}
					>
						Cancel
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ConfirmModal;
