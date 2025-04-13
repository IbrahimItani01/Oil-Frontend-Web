import React from "react";
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
import { handleBlockUser } from "@/apis/users.apis";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { toggleBlockStatus } from "@/store/slices/users.slice";

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
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) =>
		state.users.users.find((u) => u.id === userToBlock)
	);

	if (!user) return null;

	const isBlocked = user.status === "blocked";

	const handleUserBlock = async () => {
		const token = localStorage.token;
		await handleBlockUser(token, userToBlock);
		dispatch(toggleBlockStatus(user.id));
		setShowBlockModal(false);
		setUserToBlock(null);
	};

	return (
		<Dialog
			open={showBlockModal}
			onOpenChange={setShowBlockModal}
		>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2'>
						<AlertCircle className='h-5 w-5 text-red-500' />
						{isBlocked ? "Unblock User" : "Block User"}
					</DialogTitle>
					<DialogDescription>
						Are you sure you want to {isBlocked ? "unblock" : "block"} this
						user?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className='sm:justify-start gap-2 mt-4'>
					<Button
						type='button'
						variant='destructive'
						onClick={handleUserBlock}
					>
						Yes, {isBlocked ? "Unblock" : "Block"} User
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
