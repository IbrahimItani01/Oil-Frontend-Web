export interface Order {
	id: string;
	customerId: string;
	date: string;
	total: number;
	cashedOut: boolean;
	employeeId: string;
}

export const ordersData: Order[] = [
	{
		id: "ORD-1234",
		customerId: "#CM9801",
		date: "09:15 AM",
		total: 42.9,
		cashedOut: false,
		employeeId: "#EMP001",
	},
	{
		id: "ORD-1235",
		customerId: "#CM9803",
		date: "10:30 AM",
		total: 67.5,
		cashedOut: false,
		employeeId: "#EMP001",
	},
	{
		id: "ORD-1236",
		customerId: "#CM9803",
		date: "11:45 AM",
		total: 29.9,
		cashedOut: false,
		employeeId: "#EMP002",
	},
	{
		id: "ORD-1237",
		customerId: "#CM9805",
		date: "01:20 PM",
		total: 54.7,
		cashedOut: false,
		employeeId: "#EMP002",
	},
	{
		id: "ORD-1238",
		customerId: "#CM9806n",
		date: "02:35 PM",
		total: 38.2,
		cashedOut: false,
		employeeId: "#EMP004",
	},
	{
		id: "ORD-1239",
		customerId: "#CM9804",
		date: "03:50 PM",
		total: 72.0,
		cashedOut: false,
		employeeId: "#EMP004",
	},
];
