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
import { handleBlockUser } from "@/apis/users.apis";
interface ConfirmModalProp {
	showBlockModal: boolean;
	setShowBlockModal: (n: boolean) => void;
	userToBlock: string | null;
	setUserToBlock: (n: string | null) => void;
	setIsBlocked: (n: any) => void;
	blockedUsers: any;
}
const ConfirmModal = ({
	showBlockModal,
	setShowBlockModal,
	userToBlock,
	setUserToBlock,
	setIsBlocked,
	blockedUsers,
}: ConfirmModalProp) => {
	const handleUserBlock = async () => {
		const token = localStorage.token;
		await handleBlockUser(token, userToBlock);

		setIsBlocked((prev: Set<string>) => {
			const updated = new Set(prev);
			if (userToBlock) {
				if (updated.has(userToBlock)) {
					updated.delete(userToBlock); // unblocking
				} else {
					updated.add(userToBlock); // blocking
				}
			}
			return updated;
		});
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
						{blockedUsers.has(userToBlock ?? "")
							? "Unblock User"
							: "Block User"}
					</DialogTitle>
					<DialogDescription>
						Are you sure you want to{" "}
						{blockedUsers.has(userToBlock ?? "") ? "unblock" : "block"} this
						user?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className='sm:justify-start gap-2 mt-4'>
					<Button
						type='button'
						variant='destructive'
						onClick={handleUserBlock}
					>
						Yes, {blockedUsers.has(userToBlock ?? "") ? "Unblock" : "Block"}{" "}
						User
					</Button>
					<Button
						type='button'
						variant='outline'
						onClick={() => {
							setShowBlockModal(false);
							setUserToBlock(null);
							setIsBlocked((prev) => new Set(prev).add(userToBlock));
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
