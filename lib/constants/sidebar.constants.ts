import {
	LayoutDashboard,
	Users,
	UserCircle,
	Package,
	Calendar,
	Wrench,
	Layers,
} from "lucide-react";
export const navigationItems = [
	{
		name: "Dashboard",
		href: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		name: "Users",
		href: "/dashboard/users",
		icon: UserCircle,
	},
	{
		name: "Employees",
		href: "/dashboard/employees",
		icon: Users,
	},
	{
		name: "Products",
		href: "/dashboard/products",
		icon: Package,
	},
	{
		name: "Services",
		href: "/dashboard/services",
		icon: Wrench,
	},
	{
		name: "Categories",
		href: "/dashboard/categories",
		icon: Layers,
	},
	{
		name: "Appointments",
		href: "/dashboard/appointments",
		icon: Calendar,
	},
];
