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

export interface Category {
	id: string;
	name: string;
	description: string;
}

export const categoriesColums: Column[] = [
	{ id: "id", label: "ID" },
	{ id: "name", label: "Name" },
	{ id: "description", label: "Description" },
];

export const categoriesActions: Action[] = [
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

export const categoriesFilterDefault = "all";

export const categoriesFilter: Filter[] = [
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

export const categoriesData: Category[] = [
	{
		id: "c001",
		name: "Engine Services",
		description:
			"Maintenance and repair services related to engine performance and diagnostics.",
	},
	{
		id: "c002",
		name: "Tires & Wheels",
		description:
			"Products and services including tire replacement, balancing, and alignment.",
	},
	{
		id: "c003",
		name: "Car Wash & Detailing",
		description:
			"Exterior washing, interior cleaning, waxing, and full detailing services.",
	},
	{
		id: "c004",
		name: "Oil Change",
		description:
			"Regular oil replacement and filter changes for engine longevity.",
	},
	{
		id: "c005",
		name: "Battery Services",
		description: "Battery testing, replacement, and charging services.",
	},
	{
		id: "c006",
		name: "Brakes & Suspension",
		description: "Brake pad replacement, suspension repair, and safety checks.",
	},
	{
		id: "c007",
		name: "AC & Heating",
		description:
			"Air conditioning and heater diagnostics, repair, and recharging.",
	},
	{
		id: "c008",
		name: "Car Accessories",
		description:
			"Interior and exterior accessories including mats, covers, and tech add-ons.",
	},
];
