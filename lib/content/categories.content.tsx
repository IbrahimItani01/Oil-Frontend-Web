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
	for: "product" | "service" | "both";
}

export const categoriesColums: Column[] = [
	{ id: "id", label: "ID" },
	{ id: "name", label: "Name" },
	{ id: "description", label: "Description" },
	{ id: "for", label: "For" },
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
		value: "product",
		label: "For Product",
	},
	{
		value: "service",
		label: "For Service",
	},
	{
		value: "both",
		label: "For Both",
	},
];

export const categoriesData: Category[] = [
	{
		id: "c001",
		name: "Engine Services",
		description:
			"Maintenance and repair services related to engine performance and diagnostics.",
		for: "service",
	},
	{
		id: "c002",
		name: "Tires & Wheels",
		description:
			"Products and services including tire replacement, balancing, and alignment.",
		for: "product",
	},
	{
		id: "c003",
		name: "Car Wash & Detailing",
		description:
			"Exterior washing, interior cleaning, waxing, and full detailing services.",
		for: "service",
	},
	{
		id: "c004",
		name: "Oil Change",
		description:
			"Regular oil replacement and filter changes for engine longevity.",
		for: "service",
	},
	{
		id: "c005",
		name: "Battery Services",
		description: "Battery testing, replacement, and charging services.",
		for: "service",
	},
	{
		id: "c006",
		name: "Brakes & Suspension",
		description: "Brake pad replacement, suspension repair, and safety checks.",
		for: "service",
	},
	{
		id: "c007",
		name: "AC & Heating",
		description:
			"Air conditioning and heater diagnostics, repair, and recharging.",
		for: "service",
	},
	{
		id: "c008",
		name: "Car Accessories",
		description:
			"Interior and exterior accessories including mats, covers, and tech add-ons.",
		for: "product",
	},
];
