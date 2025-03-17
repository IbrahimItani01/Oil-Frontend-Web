"use client"; // Ensure this runs in a Client Component

import { Column } from "@/components/base/dataTable/DataTable";
import ImageCell from "@/components/base/dataTable/ImageCell"; // Ensure correct path
import StatusBadge from "@/components/base/dataTable/StatusBadge"; // Ensure correct path
import { Calendar } from "lucide-react";

export type User = {
	id: string;
	name: string;
	avatar: string;
	phone: string;
	email: string;
	appointment: string | null;
	status: string;
};

export const usersColumns: Column[] = [
	{
		key: "id",
		label: "ID",
	},
	{
		key: "name",
		label: "Name",
		render: (value) => (
			<ImageCell
				isAvatar
				src={""}
			/>
		),
	},
	{
		key: "phone",
		label: "Phone Number",
	},
	{
		key: "email",
		label: "Email Address",
		render: (value) => <span>{value}</span>,
	},
	{
		key: "appointment",
		label: "Next Appointment",
		render: (value) => (
			<div className='flex items-center gap-1'>
				<Calendar />
				<span>{value ? value : "-"}</span>
			</div>
		),
	},
	{
		key: "status",
		label: "Status",
		render: (value) => <StatusBadge status={value} />,
	},
];

export const usersData: User[] = [
	{
		id: "#CM9801",
		name: "Natali Craig",
		avatar: "/avatars/natali.png",
		phone: "+961 3 123 456",
		email: "test@example.com",
		appointment: "12:00 PM",
		status: "In Progress",
	},
	{
		id: "#CM9802",
		name: "John Doe",
		avatar: "/avatars/john.png",
		phone: "+961 3 654 321",
		email: "john@example.com",
		appointment: null,
		status: "Completed",
	},
];

export const usersActions = ["block-user"];
