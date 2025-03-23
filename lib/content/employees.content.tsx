"use client"; // Ensure this runs in a Client Component

import { Column } from "@/components/base/dataTable/DataTable";
import ImageCell from "@/components/base/dataTable/ImageCell"; // Ensure correct path
import StatusBadge from "@/components/base/dataTable/StatusBadge"; // Ensure correct path
import { Calendar } from "lucide-react";

export const employeesColumns: Column[] = [
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
		key: "balance",
		label: "Available Balance",
		render: (value) => <span>${(value || 0).toFixed(2)}</span>,
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

export const employeesData = [
	{
		id: "#CM9801",
		name: "Natali Craig",
		avatar: "/avatars/natali.png",
		phone: "+961 3 123 456",
		balance: 0.0,
		appointment: "12:00 PM",
		status: "In Progress",
	},
	{
		id: "#CM9802",
		name: "Kate Morrison",
		avatar: "/avatars/kate.png",
		phone: "+961 3 123 456",
		balance: 79.0,
		appointment: "12:00 PM",
		status: "In Progress",
	},
	{
		id: "#CM9803",
		name: "Drew Cano",
		avatar: "/avatars/drew.png",
		phone: "+961 3 123 456",
		balance: 50.0,
		appointment: "Tomorrow 4:00 PM",
		status: "Available",
	},
	{
		id: "#CM9804",
		name: "Orlando Diggs",
		avatar: "/avatars/orlando.png",
		phone: "+961 3 123 456",
		balance: 129.0,
		appointment: "Thursday 21, 4 5:00 PM",
		status: "Available",
	},
	{
		id: "#CM9805",
		name: "Andi Lane",
		avatar: "/avatars/andi.png",
		phone: "+961 3 123 456",
		balance: 85.45,
		appointment: "Thursday 22, 4 6:00 PM",
		status: "Available",
	},
];

export const employeesActions = ["cash-out", "delete"];
