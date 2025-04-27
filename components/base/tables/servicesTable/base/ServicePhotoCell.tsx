import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell } from "@/components/ui/table";
import { Service } from "@/lib/content/services.content";
import React from "react";

export interface ServiceCellProps {
	service: Service;
}

const ServicePhotoCell = ({ service }: ServiceCellProps) => {
	return (
		<TableCell>
			<div className='flex items-center gap-2'>
				<Avatar className='h-8 w-8'>
					<AvatarImage
						src={service.photo}
						alt={service.name}
						className='object-cover w-full h-full rounded-full'
					/>

					<AvatarFallback>{service.name.charAt(0)}</AvatarFallback>
				</Avatar>
			</div>
		</TableCell>
	);
};

export default ServicePhotoCell;
