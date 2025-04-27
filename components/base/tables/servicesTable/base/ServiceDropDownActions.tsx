import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import { Action, servicesActions } from "@/lib/content/services.content";
import EditserviceModal from "../EditServiceModal";
import { useDispatch } from "react-redux";
import { ServiceCellProps } from "./ServicePhotoCell";
import { deleteService } from "@/store/slices/services.slice";

const ServicesDropDownActions = ({ service }: ServiceCellProps) => {
	const [editModalOpen, setEditModalOpen] = useState(false);
	const dispatch = useDispatch();

	const renderDropDown = (action: Action) => {
		const Icon = action.icon;

		const handleAction = () => {
			if (action.id === "edit") {
				setEditModalOpen(true);
			} else if (action.id === "delete") {
				dispatch(deleteService(service.id));
			}
		};

		return (
			<DropdownMenuItem
				key={action.id}
				onClick={handleAction}
				className='cursor-pointer'
			>
				<div
					className={`flex items-center gap-2 ${
						action.id === "delete" && "text-red-500"
					}`}
				>
					<Icon
						className='h-4 w-4'
						color={action.color}
					/>
					<span>{action.label}</span>
				</div>
			</DropdownMenuItem>
		);
	};

	return (
		<TableCell className='text-right'>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='ghost'
						className='h-8 w-8 p-0'
					>
						<span className='sr-only'>Open menu</span>
						<MoreHorizontal className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					{servicesActions.map((action) => renderDropDown(action))}
				</DropdownMenuContent>
			</DropdownMenu>

			<EditserviceModal
				open={editModalOpen}
				onOpenChange={setEditModalOpen}
				service={service}
			/>
		</TableCell>
	);
};

export default ServicesDropDownActions;
