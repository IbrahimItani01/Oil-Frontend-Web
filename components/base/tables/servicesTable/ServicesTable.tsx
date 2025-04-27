"use client";
import { useAppSelector } from "@/store/store";
import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import ServicePhotoCell from "./base/ServicePhotoCell";
import ServicesTableHeader from "./base/ServicesTableHeader";
import ServiceStatusCell from "./base/ServiceStatusCell";
import ServicesDropDownActions from "./base/ServiceDropDownActions";

const ServicesTable = () => {
	const services = useAppSelector((state) => state.services.queriedServices);

	return (
		<div className='w-full relative'>
			<Table>
				<ServicesTableHeader />
				<TableBody>
					{services.map((service) => (
						<TableRow
							key={service.id}
							className={service.status === "inactive" ? "opacity-60" : ""}
						>
							<TableCell className='font-medium'>{service.id}</TableCell>
							<ServicePhotoCell service={service} />
							<TableCell>{service.name}</TableCell>
							<TableCell>{service.type}</TableCell>
							<TableCell>${service.fee}</TableCell>
							<TableCell>{service.duration}</TableCell>
							<ServiceStatusCell service={service} />
							<ServicesDropDownActions service={service} />
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default ServicesTable;
