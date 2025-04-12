// This is a mock of what your content file might look like
// based on the image provided

interface Column {
	id: string;
	label: string;
}

interface Action {
	id: string;
	label: string;
	onClick: (userId: string) => void;
}

interface User {
	id: string;
	name: string;
	avatar: string;
	phoneNumber: string;
	email: string;
	nextAppointment: string | null;
	status: string;
}

export const usersColumns: Column[] = [
	{ id: "id", label: "ID" },
	{ id: "name", label: "Name" },
	{ id: "phoneNumber", label: "Phone Number" },
	{ id: "email", label: "Email Address" },
	{ id: "nextAppointment", label: "Next Appointment" },
	{ id: "status", label: "Status" },
];

export const usersActions: Action[] = [
	{
		id: "block",
		label: "Block User",
		onClick: (userPhone: string) => {
			console.log(`Block user with ID: ${userPhone}`);
		},
	},
];

export const usersData: User[] = [
	{
		id: "#CM9801",
		name: "Natali Craig",
		avatar: "/placeholder.svg?height=32&width=32",
		phoneNumber: "+961 3 123 456",
		email: "natali@gmail.com",
		nextAppointment: null,
		status: "Blocked",
	},
	{
		id: "#CM9802",
		name: "Kate Morrison",
		avatar: "/placeholder.svg?height=32&width=32",
		phoneNumber: "+961 3 123 456",
		email: "kate@gmail.com",
		nextAppointment: null,
		status: "Active",
	},
	{
		id: "#CM9803",
		name: "Drew Cano",
		avatar: "/placeholder.svg?height=32&width=32",
		phoneNumber: "+961 3 123 456",
		email: "drew@gmail.com",
		nextAppointment: "Tomorrow 4:00 PM",
		status: "Active",
	},
	{
		id: "#CM9804",
		name: "Orlando Diggs",
		avatar: "/placeholder.svg?height=32&width=32",
		phoneNumber: "+961 3 123 456",
		email: "orlando@gmail.com",
		nextAppointment: "Thursday 21, 4 5:00 PM",
		status: "Active",
	},
	{
		id: "#CM9805",
		name: "Andi Lane",
		avatar: "/placeholder.svg?height=32&width=32",
		phoneNumber: "+961 3 123 456",
		email: "andi@gmail.com",
		nextAppointment: null,
		status: "Active",
	},
];
