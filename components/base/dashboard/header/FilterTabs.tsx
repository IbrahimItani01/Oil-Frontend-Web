"use client";

import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import {
	Appointment,
	appointmentsFilterDefault,
	appointmentsFilters,
} from "@/lib/content/appointments.content";
import {
	categoriesFilter,
	categoriesFilterDefault,
	Category,
} from "@/lib/content/categories.content";
import {
	Employee,
	employeesFilter,
	employeesFilterDefault,
} from "@/lib/content/employees.content";
import {
	Product,
	productsFilterDefault,
	productsFilters,
} from "@/lib/content/products.content";
import {
	servicesFilterDefault,
	servicesFilters,
} from "@/lib/content/services.content";
import { usersFilterDefault, usersFilters } from "@/lib/content/users.content";
import {
	setQueriedAppointments,
	setSelectedAppointmentStatus,
} from "@/store/slices/appointments.slice";
import {
	setQueriedCategories,
	setSelectedCategoryKey,
} from "@/store/slices/categories.slice";
import {
	setQueriedEmployees,
	setSelectedEmployeeStatus,
} from "@/store/slices/employees.slice";
import {
	setQueriedProducts,
	setSelectedProductStatus,
} from "@/store/slices/products.slice";
import {
	setQueriedServices,
	setSelectedServiceStatus,
} from "@/store/slices/services.slice";
import {
	setQueriedUsers,
	setSelectedUserStatus,
} from "@/store/slices/users.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { TabsList } from "@radix-ui/react-tabs";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const FilterTabs = () => {
	const pathname = usePathname();
	const dispatch = useAppDispatch();
	const allUsers = useAppSelector((state) => state.users.users);
	const allEmployees = useAppSelector((state) => state.employees.employees);
	const allAppointments = useAppSelector(
		(state) => state.appointments.appointments
	);
	const allProducts = useAppSelector((state) => state.products.products);
	const allServices = useAppSelector((state) => state.services.services);
	const allCategories = useAppSelector((state) => state.categories.categories);

	// Each section gets its own tab state
	const [userTab, setUserTab] = useState(usersFilterDefault);
	const [employeeTab, setEmployeeTab] = useState(employeesFilterDefault);
	const [appointmentTab, setAppointmentTab] = useState(
		appointmentsFilterDefault
	);
	const [productTab, setProductTab] = useState(productsFilterDefault);
	const [serviceTab, setServiceTab] = useState(servicesFilterDefault);
	const [categoryTab, setCategoryTab] = useState(categoriesFilterDefault);
	// Reset tabs when switching routes
	useEffect(() => {
		if (pathname === "/dashboard/users") {
			setUserTab(usersFilterDefault); // "all"
			dispatch(setSelectedUserStatus(null)); // clear filter
			dispatch(setQueriedUsers(allUsers)); // show all users
		}
		if (pathname === "/dashboard/employees") {
			setEmployeeTab(employeesFilterDefault);
			dispatch(setSelectedEmployeeStatus(null));
			dispatch(setQueriedEmployees(allEmployees));
		}
		if (pathname === "/dashboard/appointments") {
			setAppointmentTab(appointmentsFilterDefault);
			dispatch(setSelectedAppointmentStatus(null));
			dispatch(setQueriedAppointments(allAppointments));
		}
		if (pathname === "/dashboard/products") {
			setProductTab(productsFilterDefault);
			dispatch(setSelectedProductStatus(null));
			dispatch(setQueriedProducts(allProducts));
		}
		if (pathname === "/dashboard/services") {
			setServiceTab(servicesFilterDefault);
			dispatch(setSelectedServiceStatus(null));
			dispatch(setQueriedServices(allServices));
		}
		if (pathname === "/dashboard/categories") {
			setCategoryTab(categoriesFilterDefault);
			dispatch(setSelectedCategoryKey(null));
			dispatch(setQueriedCategories(allCategories));
		}
	}, [
		pathname,
		dispatch,
		allUsers,
		allEmployees,
		allAppointments,
		allProducts,
		allServices,
		allCategories,
	]);

	if (pathname === "/dashboard/users") {
		const handleUsersFilter = (status: string) => {
			setUserTab(status);
			dispatch(setSelectedUserStatus(status === "all" ? null : status));
			const filtered =
				status === "all"
					? allUsers
					: allUsers.filter((u) => u.status === status);
			dispatch(setQueriedUsers(filtered));
		};

		return (
			<Tabs value={userTab}>
				<TabsList className='bg-gray-100 p-1 rounded-lg'>
					{usersFilters.map((filter, i) => (
						<TabsTrigger
							key={i}
							className='min-w-[100px] cursor-pointer transition-all duration-300 ease-in-out data-[state=active]:bg-white data-[state=active]:shadow-sm'
							value={filter.value}
							onClick={() => handleUsersFilter(filter.value)}
						>
							{filter.label}
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>
		);
	}

	if (pathname === "/dashboard/employees") {
		const handleEmployeesFilter = (status: string) => {
			setEmployeeTab(status);
			const validStatuses = ["active", "inactive"] as const;

			if (status === "all") {
				dispatch(setSelectedEmployeeStatus(null));
			} else if (validStatuses.includes(status as any)) {
				dispatch(setSelectedEmployeeStatus(status as Employee["status"]));
			}

			const filtered =
				status === "all"
					? allEmployees
					: allEmployees.filter((e) => e.status === status);
			dispatch(setQueriedEmployees(filtered));
		};

		return (
			<Tabs value={employeeTab}>
				<TabsList className='bg-gray-100 p-1 rounded-lg'>
					{employeesFilter.map((filter, i) => (
						<TabsTrigger
							key={i}
							className='min-w-[100px] cursor-pointer transition-all duration-300 ease-in-out data-[state=active]:bg-white data-[state=active]:shadow-sm'
							value={filter.value}
							onClick={() => handleEmployeesFilter(filter.value)}
						>
							{filter.label}
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>
		);
	}

	if (pathname === "/dashboard/appointments") {
		const handleAppointmentsFilter = (status: string) => {
			setAppointmentTab(status);
			const validStatuses = [
				"canceled",
				"in-progress",
				"scheduled",
				"completed",
			] as const;

			if (status === "all") {
				dispatch(setSelectedAppointmentStatus(null));
			} else if (validStatuses.includes(status as any)) {
				dispatch(setSelectedAppointmentStatus(status as Appointment["status"]));
			}
			const filtered =
				status === "all"
					? allAppointments
					: allAppointments.filter((e) => e.status === status);
			dispatch(setQueriedAppointments(filtered));
		};

		return (
			<Tabs value={appointmentTab}>
				<TabsList className='bg-gray-100 p-1 rounded-lg'>
					{appointmentsFilters.map((filter, i) => (
						<TabsTrigger
							key={i}
							className='min-w-[100px]  cursor-pointer transition-all duration-300 ease-in-out data-[state=active]:bg-white data-[state=active]:shadow-sm'
							value={filter.value}
							onClick={() => handleAppointmentsFilter(filter.value)}
						>
							{filter.label}
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>
		);
	}
	if (pathname === "/dashboard/products") {
		const handleProductsFilter = (status: string) => {
			setProductTab(status);
			const validStatuses = ["active", "inactive"] as const;

			if (status === "all") {
				dispatch(setSelectedProductStatus(null));
			} else if (validStatuses.includes(status as any)) {
				dispatch(setSelectedProductStatus(status as Product["status"]));
			}
			const filtered =
				status === "all"
					? allProducts
					: allProducts.filter((e) => e.status === status);
			dispatch(setQueriedProducts(filtered));
		};

		return (
			<Tabs value={productTab}>
				<TabsList className='bg-gray-100 p-1 rounded-lg'>
					{productsFilters.map((filter, i) => (
						<TabsTrigger
							key={i}
							className='min-w-[100px]  cursor-pointer transition-all duration-300 ease-in-out data-[state=active]:bg-white data-[state=active]:shadow-sm'
							value={filter.value}
							onClick={() => handleProductsFilter(filter.value)}
						>
							{filter.label}
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>
		);
	}
	if (pathname === "/dashboard/services") {
		const handleServicesFilter = (status: string) => {
			setServiceTab(status); // ✅ FIXED
			const validStatuses = ["active", "inactive"] as const;

			if (status === "all") {
				dispatch(setSelectedServiceStatus(null));
			} else if (validStatuses.includes(status as any)) {
				dispatch(setSelectedServiceStatus(status as Product["status"]));
			}

			const filtered =
				status === "all"
					? allServices
					: allServices.filter((e) => e.status === status);
			dispatch(setQueriedServices(filtered));
		};

		return (
			<Tabs value={serviceTab}>
				<TabsList className='bg-gray-100 p-1 rounded-lg'>
					{servicesFilters.map((filter, i) => (
						<TabsTrigger
							key={i}
							className='min-w-[100px] cursor-pointer transition-all duration-300 ease-in-out data-[state=active]:bg-white data-[state=active]:shadow-sm'
							value={filter.value}
							onClick={() => handleServicesFilter(filter.value)}
						>
							{filter.label}
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>
		);
	}
	if (pathname === "/dashboard/categories") {
		const handleCategoryFilter = (status: string) => {
			setCategoryTab(status); // ✅ FIXED
			const validStatuses = ["product", "service", "both"] as const;

			if (status === "all") {
				dispatch(setSelectedCategoryKey(null));
			} else if (validStatuses.includes(status as any)) {
				dispatch(setSelectedCategoryKey(status as Category["for"]));
			}

			const filtered =
				status === "all"
					? allCategories
					: allCategories.filter((e) => e.for === status);
			dispatch(setQueriedCategories(filtered));
		};

		return (
			<Tabs value={categoryTab}>
				<TabsList className='bg-gray-100 p-1 rounded-lg'>
					{categoriesFilter.map((filter, i) => (
						<TabsTrigger
							key={i}
							className='min-w-[100px] cursor-pointer transition-all duration-300 ease-in-out data-[state=active]:bg-white data-[state=active]:shadow-sm'
							value={filter.value}
							onClick={() => handleCategoryFilter(filter.value)}
						>
							{filter.label}
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>
		);
	}

	return <></>;
};

export default FilterTabs;
