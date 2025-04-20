import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell } from "@/components/ui/table";
import { Action, employeesActions } from "@/lib/content/employees.content";
import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import { EmployeeCellProps } from "./EmployeeNameCell";
import { useDispatch } from "react-redux";
import { toggleActiveStatus } from "@/store/slices/employees.slice";
import CashOutModal from "../cashout/CashoutModal";

const EmployeeActionsDropDown = ({ employee }: EmployeeCellProps) => {
	const dispatch = useDispatch();
	const [cashOutOpen, setCashOutOpen] = useState(false);
	const handleDropDownAction = (action: Action) => {
		if (action.id === "activate" || action.id === "deactivate") {
			dispatch(toggleActiveStatus(employee.id));
		} else if (action.id === "cashOut") {
			// TODO: complete the cashout logic
			setCashOutOpen(true);
		}
	};
	const renderDropDown = (action: Action) => {
		const Icon = action.icon;
		if (
			(employee.status === "inactive" && action.id === "deactivate") ||
			(employee.status === "active" && action.id === "activate") || (action.id==="cashOut" && employee.status==="inactive") || (employee.balance === 0 && action.id==="cashOut")
		)
			return null;
		
		return (
			<DropdownMenuItem
				key={action.id}
				onClick={() => handleDropDownAction(action)}
				className='cursor-pointer'
			>
				<div
					className={`flex items-center gap-2 ${
						action.id === "deactivate"
							? "text-red-500"
							: action.id === "activate"
							? "text-green-800"
							: ""
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
					{employeesActions.map((action) => renderDropDown(action))}
				</DropdownMenuContent>
			</DropdownMenu>
			{cashOutOpen && (
				<CashOutModal
					setCashOutOpen={setCashOutOpen}
					cashOutOpen={cashOutOpen}
					employee={employee}
				/>
			)}
		</TableCell>
	);
};

export default EmployeeActionsDropDown;
