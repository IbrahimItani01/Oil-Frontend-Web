// This is a mock of what your content file might look like
// based on the image provided

import { LucideIcon, Trash2, Unlock } from "lucide-react";

interface Column {
	id: string;
	label: string;
}

export interface Action {
	id: string;
	label: string;
	icon: LucideIcon;
}

export interface User {
	id: string;
	name: string;
	phoneNumber: string;
	email: string;
	nextAppointment: string | null;
	status: "blocked" | "active";
	photo: string;
}

export const usersColumns: Column[] = [
	{ id: "id", label: "ID" },
	{ id: "name", label: "Name" },
	{ id: "phoneNumber", label: "Phone Number" },
	{ id: "email", label: "Email Address" },
	{ id: "nextAppointment", label: "Next Appointment" },
	{ id: "status", label: "Status" },
];

export const usersActions: Action[] = [
	{
		id: "block",
		label: "Block User",
		icon: Trash2,
	},
	{
		id: "unblock",
		label: "Unblock User",
		icon: Unlock,
	},
];

export const usersFilterDefault = "all";
export interface Filter {
	value: string;
	label: string;
}

export const usersFilters: Filter[] = [
	{
		value: "all",
		label: "All",
	},
	{
		value: "active",
		label: "Active",
	},
	{
		value: "blocked",
		label: "Blocked",
	},
];

export const usersData: User[] = [
	{
		id: "#CM9801",
		name: "Natali Craig",
		phoneNumber: "+961 3 123 456",
		email: "natali@gmail.com",
		nextAppointment: null,
		status: "blocked",
		photo: "/static/usersImages/CM9801-image.jpg",
	},
	{
		id: "#CM9802",
		name: "Kate Morrison",
		phoneNumber: "+961 3 123 457",
		email: "kate@gmail.com",
		nextAppointment: null,
		status: "active",
		photo: "/static/usersImages/CM9802-image.jpg",
	},
	{
		id: "#CM9803",
		name: "Drew Cano",
		phoneNumber: "+961 3 123 458",
		email: "drew@gmail.com",
		nextAppointment: "Tomorrow 4:00 PM",
		status: "active",
		photo: "/static/usersImages/CM9803-image.jpg",
	},
	{
		id: "#CM9804",
		name: "Orlando Diggs",
		phoneNumber: "+961 3 123 459",
		email: "orlando@gmail.com",
		nextAppointment: "Thursday 21, 4 5:00 PM",
		status: "active",
		photo: "/static/usersImages/CM9804-image.jpg",
	},
	{
		id: "#CM9805",
		name: "Andi Lane",
		phoneNumber: "+961 3 123 434",
		email: "andi@gmail.com",
		nextAppointment: null,
		status: "active",
		photo: "/static/usersImages/CM9805-image.jpg",
	},
	{
		id: "#CM9806",
		name: "John Doe",
		phoneNumber: "+961 3 123 456",
		email: "john@gmail.com",
		nextAppointment: null,
		status: "blocked",
		photo: "/static/usersImages/CM9806-image.jpg",
	},
	{
		id: "#CM9807",
		name: "Nabiha Nabiha",
		phoneNumber: "+961 3 123 456",
		email: "nabiha@gmail.com",
		nextAppointment: null,
		status: "blocked",
		photo: "/static/usersImages/CM9807-image.jpg",
	},
];
