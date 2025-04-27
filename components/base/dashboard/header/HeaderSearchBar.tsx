"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setQueriedUsers } from "@/store/slices/users.slice";
import { setQueriedEmployees } from "@/store/slices/employees.slice";
import { setQueriedAppointments } from "@/store/slices/appointments.slice";
import {
	setQueriedProducts,
	setSelectedProductStatus,
} from "@/store/slices/products.slice";
import { setQueriedServices } from "@/store/slices/services.slice";

interface SearchBarProps {
	placeholder?: string;
}

const HeaderSearchBar = ({
	placeholder = "Type to search...",
}: SearchBarProps) => {
	const pathname = usePathname();
	const dispatch = useDispatch();
	const allUsers = useSelector((state: RootState) => state.users.users);
	const allEmployees = useSelector(
		(state: RootState) => state.employees.employees
	);
	const allAppointments = useSelector(
		(state: RootState) => state.appointments.appointments
	);
	const allProducts = useSelector(
		(state: RootState) => state.products.products
	);
	const allServices = useSelector(
		(state: RootState) => state.services.services
	);
	const [value, setValue] = useState("");
	const selectedUsersStatus = useSelector(
		(state: RootState) => state.users.selectedStatus
	);
	const selectedEmployeesStatus = useSelector(
		(state: RootState) => state.employees.selectedStatus
	);
	const selectedAppointmentsStatus = useSelector(
		(state: RootState) => state.appointments.selectedStatus
	);
	const selectedProductsStatus = useSelector(
		(state: RootState) => state.products.selectedStatus
	);
	const selectedServiceStatus = useSelector(
		(state: RootState) => state.services.selectedStatus
	);
	const handleSearch = useCallback(
		(searchVal: string) => {
			if (pathname === "/dashboard/users") {
				const trimmed = searchVal.trim();

				// 🔄 Reset filter on empty search
				if (!trimmed) {
					const filtered = selectedUsersStatus
						? allUsers.filter((user) => user.status === selectedUsersStatus)
						: allUsers;

					dispatch(setQueriedUsers(filtered));
					return;
				}

				// 🔍 Apply search + status filter
				const filtered = allUsers.filter((user) => {
					const matchesName = user.name
						.toLowerCase()
						.includes(trimmed.toLowerCase());
					const matchesStatus = selectedUsersStatus
						? user.status === selectedUsersStatus
						: true;
					return matchesName && matchesStatus;
				});

				dispatch(setQueriedUsers(filtered));
			}
			if (pathname === "/dashboard/employees") {
				const trimmed = searchVal.trim();

				if (!trimmed) {
					const filtered = selectedEmployeesStatus
						? allEmployees.filter(
								(user) => user.status === selectedEmployeesStatus
						  )
						: allEmployees;

					dispatch(setQueriedEmployees(filtered));
					return;
				}

				// 🔍 Apply search + status filter
				const filtered = allEmployees.filter((user) => {
					const matchesName = user.name
						.toLowerCase()
						.includes(trimmed.toLowerCase());
					const matchesStatus = selectedEmployeesStatus
						? user.status === selectedEmployeesStatus
						: true;
					return matchesName && matchesStatus;
				});

				dispatch(setQueriedEmployees(filtered));
			}
			if (pathname === "/dashboard/appointments") {
				const trimmed = searchVal.trim();

				if (!trimmed) {
					const filtered = selectedAppointmentsStatus
						? allAppointments.filter(
								(appointment) =>
									appointment.status === selectedAppointmentsStatus
						  )
						: allAppointments;

					dispatch(setQueriedAppointments(filtered));
					return;
				}

				// 🔍 Apply search + status filter
				const filtered = allAppointments.filter((appointment) => {
					const matchesId = appointment.id
						.toLowerCase()
						.includes(trimmed.toLowerCase());
					const matchesStatus = selectedAppointmentsStatus
						? appointment.status === selectedAppointmentsStatus
						: true;
					return matchesId && matchesStatus;
				});

				dispatch(setQueriedAppointments(filtered));
			}
			if (pathname === "/dashboard/products") {
				const trimmed = searchVal.trim();

				if (!trimmed) {
					const filtered = selectedProductsStatus
						? allProducts.filter(
								(product) => product.status === selectedProductsStatus
						  )
						: allProducts;

					dispatch(setQueriedProducts(filtered));
					return;
				}

				// 🔍 Apply search + status filter
				const filtered = allProducts.filter((product) => {
					const matchesName = product.name
						.toLowerCase()
						.includes(trimmed.toLowerCase());
					const matchesStatus = selectedProductsStatus
						? product.status === selectedProductsStatus
						: true;
					return matchesName && matchesStatus;
				});

				dispatch(setQueriedProducts(filtered));
			}
			if (pathname === "/dashboard/services") {
				const trimmed = searchVal.trim();

				if (!trimmed) {
					const filtered = selectedServiceStatus
						? allServices.filter(
								(service) => service.status === selectedServiceStatus
						  )
						: allServices;

					dispatch(setQueriedServices(filtered));
					return;
				}

				// 🔍 Apply search + status filter
				const filtered = allServices.filter((service) => {
					const matchesName = service.name
						.toLowerCase()
						.includes(trimmed.toLowerCase());
					const matchesStatus = selectedServiceStatus
						? service.status === selectedServiceStatus
						: true;
					return matchesName && matchesStatus;
				});

				dispatch(setQueriedServices(filtered));
			}
		},
		[
			allUsers,
			allEmployees,
			allAppointments,
			allProducts,
			allServices,
			dispatch,
			pathname,
			selectedUsersStatus,
			selectedEmployeesStatus,
			selectedAppointmentsStatus,
			selectedProductsStatus,
			selectedServiceStatus,
		]
	);

	const handleChange = (val: string) => {
		setValue(val);
		handleSearch(val);
	};

	if (pathname === "/dashboard") return null;

	return (
		<div className='relative w-[100%] max-w-[350px] min-w-[200px]'>
			<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
			<Input
				type='search'
				placeholder={placeholder}
				value={value}
				onChange={(e) => handleChange(e.target.value)}
				className='pl-9 h-9'
			/>
		</div>
	);
};

export default HeaderSearchBar;
