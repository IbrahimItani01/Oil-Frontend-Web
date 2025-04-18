import { Employee } from "@/lib/content/employees.content";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const removeDuplicates = (modifiedEmployees: Employee[]) => {
	const uniqueEmployees = new Map();

	modifiedEmployees.forEach((employee) => {
		uniqueEmployees.set(employee.id, employee);
	});

	return Array.from(uniqueEmployees.values());
};

interface EmployeesState {
	employees: Employee[];
	queriedEmployees: Employee[];
	modifiedEmployees: Employee[];
	selectedStatus: string | null;
}

const initialState: EmployeesState = {
	employees: [],
	queriedEmployees: [],
	modifiedEmployees: [],
	selectedStatus: null,
};

const EmployeesSlice = createSlice({
	name: "employees",
	initialState,
	reducers: {
		setEmployees(state, action: PayloadAction<Employee[]>) {
			state.employees = action.payload;
			state.queriedEmployees = action.payload;
		},
		setQueriedEmployees(state, action: PayloadAction<Employee[]>) {
			state.queriedEmployees = action.payload;
		},
		addEmployee(state, action: PayloadAction<Employee>) {
			state.employees.push(action.payload);
		},
		updateEmployee(state, action: PayloadAction<Employee>) {
			const index = state.employees.findIndex(
				(e) => e.id === action.payload.id
			);
			if (index !== -1) {
				state.employees[index] = action.payload;
			}
		},
		deleteEmployee(state, action: PayloadAction<string>) {
			state.employees = state.employees.filter((e) => e.id !== action.payload);
		},

		cashOutEmployee(state, action: PayloadAction<string>) {
			const employee = state.employees.find((e) => e.id === action.payload);
			if (employee) {
				employee.balance = 0;
			}
		},
		toggleActiveStatus: (state, action) => {
			const updateStatus = (employeesList: Employee[]) => {
				const employee = employeesList.find((u) => u.id === action.payload);
				if (employee) {
					const previousStatus = employee.status;

					// Toggle status
					employee.status =
						employee.status === "active" ? "inactive" : "active";

					// Set availability based on new status
					if (employee.status === "active") {
						employee.availability = "available";
					} else {
						employee.availability = null;
					}

					// Track modified if status changed
					if (employee.status !== previousStatus) {
						state.modifiedEmployees.push(employee);
					}
				}
			};

			updateStatus(state.employees);
			updateStatus(state.queriedEmployees);
			state.modifiedEmployees = removeDuplicates(state.modifiedEmployees);
		},
		setSelectedStatus(state, action: PayloadAction<string | null>) {
			state.selectedStatus = action.payload;
		},
		clearEmployees(state) {
			state.employees = [];
		},
	},
});

export const {
	setEmployees,
	addEmployee,
	updateEmployee,
	deleteEmployee,
	cashOutEmployee,
	clearEmployees,
	setQueriedEmployees,
	setSelectedStatus,
	toggleActiveStatus,
} = EmployeesSlice.actions;

export default EmployeesSlice.reducer;
