import React from "react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface LogoutModalProps {
	handleCloseModal: () => void;
	handleLogout: () => void;
}

const LogoutModal = ({ handleCloseModal, handleLogout }: LogoutModalProps) => {
	return (
		<div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
			<Card className='w-[300px] max-w-[90vw]'>
				<CardHeader className='text-center pb-2'>
					<CardTitle className='text-xl'>Logout</CardTitle>
				</CardHeader>
				<CardContent className='text-center text-muted-foreground pb-4'>
					You can log in back again
				</CardContent>
				<CardFooter className='flex flex-wrap justify-between gap-2'>
					<Button
						variant='outline'
						className='w-full bg-muted/50 cursor-pointer'
						onClick={handleCloseModal}
					>
						Cancel
					</Button>
					<Button
						className='cursor-pointer w-full bg-rose-300 hover:bg-rose-400 text-foreground border-none'
						onClick={handleLogout}
					>
						Logout
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default LogoutModal;
