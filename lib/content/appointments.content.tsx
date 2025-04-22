import { Filter } from "./users.content";

interface Column {
	id: string;
	label: string;
}
export interface Appointment {
	id: string;
	userName: string;
	userId: string;
	employeeName: string;
	employeeId: string;
	carId: string;
	carModel: string;
	date: string;
	cost: number;
	status: "canceled" | "in-progress" | "scheduled" | "completed";
	address: string;
}

export const appointmentsColumns: Column[]= [
    { id: "id", label: "ID" },
    {id:"user",label:"User"},
    { id: "employee", label: "Employee"},
    { id: "date", label: "Date" },
    { id: "cost", label: "Cost" },
    { id: "status", label: "Status" },
]

export const appointmentsData: Appointment[] = [
	{
		id: "APPT001",
		userName: "Kate Morrison",
		userId: "#CM9802",
		employeeName: "Lea Haddad",
		employeeId: "#EMP001",
		carId: "CAR101",
		carModel: "Toyota Corolla",
		date: "2025-04-21T17:00:00",
		cost: 45.0,
		status: "scheduled",
		address: "Beirut, Sassine Square",
	},
	{
		id: "APPT002",
		userName: "Drew Cano",
		userId: "#CM9803",
		employeeName: "Jad Nassar",
		employeeId: "#EMP002",
		carId: "CAR102",
		carModel: "Hyundai Elantra",
		date: "2025-04-21T17:00:00",
		cost: 60.0,
		status: "in-progress",
		address: "Tripoli, Mina Road",
	},
	{
		id: "APPT003",
		userName: "Orlando Diggs",
		userId: "#CM9804",
		employeeName: "Bob Nassar",
		employeeId: "#EMP005",
		carId: "CAR103",
		carModel: "Honda Civic",
		date: "2025-04-21T17:00:00",
		cost: 50.0,
		status: "scheduled",
		address: "Saida, Coastal Highway",
	},
	{
		id: "APPT004",
		userName: "Andi Lane",
		userId: "#CM9805",
		employeeName: "John Haddad",
		employeeId: "#EMP004",
		carId: "CAR104",
		carModel: "Kia Sportage",
		date: "2025-04-20T15:00:00",
		cost: 70.0,
		status: "completed",
		address: "Jounieh, Main Street",
	},
	{
		id: "APPT005",
		userName: "Natali Craig",
		userId: "#CM9801",
		employeeName: "Maya Chamoun",
		employeeId: "#EMP003",
		carId: "CAR105",
		carModel: "Ford Focus",
		date: "2025-04-18T10:30:00",
		cost: 55.0,
		status: "canceled",
		address: "Zahle, Industrial Zone",
	},
];

export const appointmentsFilterDefault = "all";
export const appointmentsFilters: Filter[] = [
	{
		value: "all",
		label: "All",
	},
	{
		value: "canceled",
		label: "Canceled",
	},
	{
		value: "in-progress",
		label: "In progress",
	},
	{
		value: "scheduled",
		label: "Scheduled",
	},
	{
		value: "completed",
		label: "Completed",
	},
];
