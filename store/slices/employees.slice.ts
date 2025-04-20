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
		updateEmployeeBalance(
			state,
			action: PayloadAction<{ employeeId: string; amount: number }>
		) {
			const { employeeId, amount } = action.payload;
			const employee = state.employees.find((e) => e.id === employeeId);
			if (employee) {
				// Round up to the nearest one decimal point
				const newBalance = (employee.balance || 0) - amount;
				employee.balance = Math.ceil(newBalance * 10) / 10; // Round to 1 decimal place
			}
		},
		setSelectedEmployeeStatus(state, action: PayloadAction<string | null>) {
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
	clearEmployees,
	setQueriedEmployees,
	setSelectedEmployeeStatus,
	toggleActiveStatus,
	updateEmployeeBalance,
} = EmployeesSlice.actions;

export default EmployeesSlice.reducer;
