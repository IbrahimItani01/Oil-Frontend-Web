import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React from "react";

interface UserDropDownProp {
	setSelectedUser: (user: any) => void;
}

const UserDropDown = ({ setSelectedUser }: UserDropDownProp) => {
	return (
		<div className='absolute right-0 top-0 w-64 bg-white shadow-lg rounded-md p-4 border'>
			<h3 className='text-lg font-medium mb-4'>Actions Dropdown</h3>
			<Button
				variant='outline'
				className='w-full justify-start gap-2 text-red-500 border-gray-200'
				onClick={() => {
					// Handle block user action
					setSelectedUser(null);
				}}
			>
				<Trash2 className='h-4 w-4' />
				Block User
			</Button>
		</div>
	);
};

export default UserDropDown;
