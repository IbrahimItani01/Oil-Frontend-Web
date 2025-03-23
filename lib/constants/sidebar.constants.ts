import {
	LayoutDashboard,
	Users,
	UserCircle,
	Package,
	Calendar,
} from "lucide-react";
export const navigationItems = [
	{
		name: "Dashboard",
		href: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		name: "Employees",
		href: "/dashboard/employees",
		icon: Users,
	},
	{
		name: "Users",
		href: "/dashboard/users",
		icon: UserCircle,
	},
	{
		name: "Products",
		href: "/dashboard/products",
		icon: Package,
	},
	{
		name: "Appointments",
		href: "/dashboard/appointments",
		icon: Calendar,
	},
];
