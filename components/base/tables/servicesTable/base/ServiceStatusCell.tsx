import { TableCell } from "@/components/ui/table";
import React from "react";
import { ServiceCellProps } from "./ServicePhotoCell";

const ServiceStatusCell = ({ service }: ServiceCellProps) => {
	return (
		<TableCell>
			<div className='flex items-center gap-2'>
				<span
					className={`h-2 w-2 rounded-full ${
						service.status === "active" ? "bg-blue-400" : "bg-red-400"
					}`}
				></span>
				<span
					className={
						service.status === "active" ? "text-blue-400" : "text-red-400"
					}
				>
					{service.status}
				</span>
			</div>
		</TableCell>
	);
};

export default ServiceStatusCell;
