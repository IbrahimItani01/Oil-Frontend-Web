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

export interface Product {
	id: string;
	photo: string;
	name: string;
	type: string;
	amountSold: number;
	status: "active" | "inactive";
}

export const productColumns: Column[] = [
	{ id: "id", label: "ID" },
	{ id: "photo", label: "Photo" },
	{ id: "name", label: "Name" },
	{ id: "type", label: "Type" },
	{ id: "amountSold", label: "Amount Sold" },
	{ id: "status", label: "Status" },
];

export const productsActions: Action[] = [
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

export const productsFilterDefault = "all";

export const productsFilters: Filter[] = [
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

export const productsData: Product[] = [
	{
		id: "p001",
		photo: "/static/productsImages/p001-image.jpg",
		name: "Herbal Shampoo",
		type: "Haircare",
		amountSold: 120,
		status: "active",
	},
	{
		id: "p002",
		photo: "/static/productsImages/p002-image.jpg",
		name: "Silky Conditioner",
		type: "Haircare",
		amountSold: 95,
		status: "active",
	},
	{
		id: "p003",
		photo: "/static/productsImages/p003-image.jpg",
		name: "Aloe Face Wash",
		type: "Skincare",
		amountSold: 200,
		status: "inactive",
	},
	{
		id: "p004",
		photo: "/static/productsImages/p004-image.jpg",
		name: "Vitamin C Serum",
		type: "Skincare",
		amountSold: 180,
		status: "active",
	},
	{
		id: "p005",
		photo: "/static/productsImages/p005-image.jpg",
		name: "Styling Gel",
		type: "Haircare",
		amountSold: 60,
		status: "inactive",
	},
];
