import { HandCoins, LucideIcon, ShieldMinus, ShieldPlus } from "lucide-react";
import { Filter } from "./users.content";
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
	phoneNumber: string;
	balance: number;
	nextAppointment: string | null;
	status: "active" | "inactive";
	availability: "available" | "busy" | null;
	photo: string;
}

export const employeesColumns: Column[] = [
	{ id: "id", label: "ID" },
	{ id: "name", label: "Name" },
	{ id: "phoneNumber", label: "Phone Number" },
	{ id: "balance", label: "Available Balance" },
	{ id: "nextAppointment", label: "Next Appointment" },
	{ id: "availability", label: "Availability" },
];

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
export const employeesFilterDefault = "all";

export const employeesFilter: Filter[] = [
	{
		value: "all",
		label: "All",
	},
	{
		value: "active",
		label: "Active",
	},
	{
		value: "inactive",
		label: "Inactive",
	},
];
export const employeesData: Employee[] = [
	{
		id: "#EMP001",
		name: "Lea Haddad",
		phoneNumber: "+961 000 000 242",
		balance: 110.4,
		nextAppointment: "Thursday 21, 4 5:00 PM",
		status: "active",
		availability: "available",
		photo: "/static/employeesImages/EMP001-image.jpg",
	},
	{
		id: "#EMP002",
		name: "Jad Nassar",
		phoneNumber: "+961 000 000 243",
		balance: 84.6,
		nextAppointment: "Thursday 21, 4 5:00 PM",
		status: "active",
		availability: "busy",
		photo: "/static/employeesImages/EMP002-image.jpg",
	},
	{
		id: "#EMP003",
		name: "Maya Chamoun",
		phoneNumber: "+961 000 000 244",
		balance: 0,
		nextAppointment: null,
		status: "inactive",
		availability: null,
		photo: "/static/employeesImages/EMP003-image.jpg",
	},
	{
		id: "#EMP004",
		name: "John Haddad",
		phoneNumber: "+961 000 000 242",
		balance: 110.2,
		nextAppointment: "Thursday 21, 4 5:00 PM",
		status: "inactive",
		availability: null,
		photo: "/static/employeesImages/EMP004-image.jpg",
	},
	{
		id: "#EMP005",
		name: "Bob Nassar",
		phoneNumber: "+961 000 000 243",
		balance: 0,
		nextAppointment: "Thursday 21, 4 5:00 PM",
		status: "active",
		availability: "busy",
		photo: "/static/employeesImages/EMP005-image.jpg",
	},
];
