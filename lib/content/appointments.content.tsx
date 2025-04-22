import { Filter } from "./users.content";

interface Column {
	id: string;
	label: string;
}
export interface Appointment {
	id: string;
	userName: string;
	userId: string;
	userPhoto: string;
	employeeName: string;
	employeeId: string;
	employeePhoto: string;
	carId: string;
	carModel: string;
	carPhoto: string;
	date: string;
	time: string;
	cost: number;
	status: "canceled" | "in-progress" | "scheduled" | "completed";
	address: string;
}

export const appointmentsColumns: Column[] = [
	{ id: "id", label: "ID" },
	{ id: "user", label: "User" },
	{ id: "employee", label: "Employee" },
	{ id: "date", label: "Date" },
	{ id: "cost", label: "Cost" },
	{ id: "status", label: "Status" },
];

export const appointmentsData: Appointment[] = [
	{
		id: "APPT001",
		userName: "Kate Morrison",
		userId: "#CM9802",
		userPhoto: "/static/usersImages/CM9802-image.jpg",
		employeeName: "Lea Haddad",
		employeeId: "#EMP001",
		employeePhoto: "/static/employeesImages/EMP001-image.jpg",
		carId: "CAR101",
		carModel: "Toyota Corolla",
		carPhoto: "/static/carImages/CAR101-image.jpg",
		date: "Thursday 21, 4",
		time: "5:00 PM",
		cost: 45.0,
		status: "scheduled",
		address: "Beirut, Sassine Square",
	},
	{
		id: "APPT002",
		userName: "Drew Cano",
		userId: "#CM9803",
		userPhoto: "/static/usersImages/CM9803-image.jpg",
		employeeName: "Jad Nassar",
		employeeId: "#EMP002",
		employeePhoto: "/static/employeesImages/EMP002-image.jpg",
		carId: "CAR102",
		carModel: "Hyundai Elantra",
		carPhoto: "/static/carImages/CAR102-image.jpg",
		date: "Thursday 21, 4",
		time: "5:00 PM",
		cost: 60.0,
		status: "in-progress",
		address: "Tripoli, Mina Road",
	},
	{
		id: "APPT003",
		userName: "Orlando Diggs",
		userId: "#CM9804",
		userPhoto: "/static/usersImages/CM9804-image.jpg",
		employeeName: "Bob Nassar",
		employeeId: "#EMP005",
		employeePhoto: "/static/employeesImages/EMP005-image.jpg",
		carId: "CAR103",
		carModel: "Honda Civic",
		carPhoto: "/static/carImages/CAR103-image.jpg",
		date: "Thursday 21, 4",
		time: "5:00 PM",
		cost: 50.0,
		status: "scheduled",
		address: "Saida, Coastal Highway",
	},
	{
		id: "APPT004",
		userName: "Andi Lane",
		userId: "#CM9805",
		userPhoto: "/static/usersImages/CM9805-image.jpg",
		employeeName: "John Haddad",
		employeeId: "#EMP004",
		employeePhoto: "/static/employeesImages/EMP004-image.jpg",
		carId: "CAR104",
		carModel: "Kia Sportage",
		carPhoto: "/static/carImages/CAR104-image.jpg",
		date: "Thursday 21, 4",
		time: "5:00 PM",
		cost: 70.0,
		status: "completed",
		address: "Jounieh, Main Street",
	},
	{
		id: "APPT005",
		userName: "Natali Craig",
		userId: "#CM9801",
		userPhoto: "/static/usersImages/CM9801-image.jpg",
		employeeName: "Maya Chamoun",
		employeeId: "#EMP003",
		employeePhoto: "/static/employeesImages/EMP003-image.jpg",
		carId: "CAR105",
		carModel: "Ford Focus",
		carPhoto: "/static/carImages/CAR105-image.jpg",
		date: "Thursday 21, 4",
		time: "5:00 PM",
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
