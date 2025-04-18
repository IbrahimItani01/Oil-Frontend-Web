interface Column {
	id: string;
	label: string;
}

export interface Action {
	id: "cashOut" | "activate" | "deactivate";
	label: string;
	icon: LucideIcon;
	color: string;
}

export interface Employee {
	id: string;
	name: string;
	avatar: string;
	phoneNumber: string;
	balance: number;
	nextAppointment: string | null;
	status: "active" | "inactive";
	availability: "available" | "busy" | null;
}

export const employeesColumns: Column[] = [
	{ id: "id", label: "ID" },
	{ id: "name", label: "Name" },
	{ id: "phoneNumber", label: "Phone Number" },
	{ id: "balance", label: "Available Balance" },
	{ id: "nextAppointment", label: "Next Appointment" },
	{ id: "availability", label: "Availability" },
];

import {
	Trash2,
	HandCoins,
	LucideIcon,
	ShieldMinus,
	ShieldPlus,
} from "lucide-react";

export const employeesActions: Action[] = [
	{
		id: "cashOut",
		label: "Cash Out",
		icon: HandCoins,
		color: "black",
	},
	{
		id: "activate",
		label: "Activate",
		icon: ShieldPlus,
		color: "green",
	},
	{
		id: "deactivate",
		label: "Deactivate",
		icon: ShieldMinus,
		color: "red",
	},
];

export const employeesData: Employee[] = [
	{
		id: "#EMP001",
		name: "Lea Haddad",
		avatar: "/placeholder.svg",
		phoneNumber: "+961 000 000 242",
		balance: 150.5,
		nextAppointment: "Thursday 21, 4 5:00 PM",
		status: "active",
		availability: "available",
	},
	{
		id: "#EMP002",
		name: "Jad Nassar",
		avatar: "/placeholder.svg",
		phoneNumber: "+961 000 000 243",
		balance: 320,
		nextAppointment: "Thursday 21, 4 5:00 PM",
		status: "active",
		availability: "busy",
	},
	{
		id: "#EMP003",
		name: "Maya Chamoun",
		avatar: "/placeholder.svg",
		phoneNumber: "+961 000 000 244",
		balance: 75,
		nextAppointment: null,
		status: "inactive",
		availability: null,
	},
];
