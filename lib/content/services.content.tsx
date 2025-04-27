import { Edit, LucideIcon, Trash } from "lucide-react";
import { Filter } from "./users.content";
interface Column {
	id: string;
	label: string;
}

export interface Action {
	id: "edit" | "delete";
	label: string;
	icon: LucideIcon;
	color: string;
}

export interface Service {
	id: string;
	photo: string;
	name: string;
	type: string;
	fee: number;
	duration: string;
	description: string;
	status: "active" | "inactive";
}

export const serviceColumns: Column[] = [
	{ id: "id", label: "ID" },
	{ id: "photo", label: "Photo" },
	{ id: "name", label: "Name" },
	{ id: "type", label: "Type" },
	{ id: "fee", label: "Fee" },
	{ id: "duration", label: "Duration" },
	{ id: "status", label: "Status" },
];

export const servicesActions: Action[] = [
	{
		id: "edit",
		label: "Edit",
		icon: Edit,
		color: "black",
	},
	{
		id: "delete",
		label: "Delete",
		icon: Trash,
		color: "red",
	},
];

export const servicesFilterDefault = "all";

export const servicesFilters: Filter[] = [
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

export const servicesData: Service[] = [
	{
		id: "s001",
		photo: "/static/servicesImages/s001-image.jpg",
		name: "Oil Change",
		type: "Maintenance",
		fee: 50,
		duration: "45 mins",
		description: "Engine oil change with filter replacement.",
		status: "active",
	},
	{
		id: "s002",
		photo: "/static/servicesImages/s002-image.jpg",
		name: "Tire Rotation",
		type: "Maintenance",
		fee: 30,
		duration: "30 mins",
		description:
			"Rotating all tires to extend their lifespan and improve safety.",
		status: "active",
	},
	{
		id: "s003",
		photo: "/static/servicesImages/s003-image.jpg",
		name: "Brake Inspection",
		type: "Safety",
		fee: 40,
		duration: "35 mins",
		description: "Comprehensive brake system check-up and report.",
		status: "inactive",
	},
	{
		id: "s004",
		photo: "/static/servicesImages/s004-image.jpg",
		name: "Battery Replacement",
		type: "Repair",
		fee: 150,
		duration: "1 hour",
		description: "Battery testing and full replacement if needed.",
		status: "active",
	},
	{
		id: "s005",
		photo: "/static/servicesImages/s005-image.jpg",
		name: "Engine Diagnostics",
		type: "Diagnostics",
		fee: 80,
		duration: "1 hour",
		description:
			"Full engine diagnostics to detect and solve performance issues.",
		status: "active",
	},
];
