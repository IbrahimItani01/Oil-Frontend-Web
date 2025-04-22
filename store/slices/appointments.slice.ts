import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Appointment } from "@/lib/content/appointments.content";

interface AppointmentsState {
	appointments: Appointment[];
	queriedAppointments: Appointment[];
	selectedStatus: Appointment["status"] | null;
	modifiedAppointments: Appointment[];
}

const initialState: AppointmentsState = {
	appointments: [],
	queriedAppointments: [],
	selectedStatus: null,
	modifiedAppointments: [],
};

const appointmentsSlice = createSlice({
	name: "appointments",
	initialState,
	reducers: {
		setAppointments(state, action: PayloadAction<Appointment[]>) {
			state.appointments = action.payload;
			state.queriedAppointments = action.payload;
		},
		setQueriedAppointments(state, action: PayloadAction<Appointment[]>) {
			state.queriedAppointments = action.payload;
		},
		setSelectedAppointmentStatus(
			state,
			action: PayloadAction<Appointment["status"] | null>
		) {
			state.selectedStatus = action.payload;
		},
		clearAppointments(state) {
			state.appointments = [];
			state.queriedAppointments = [];
			state.selectedStatus = null;
		},
		addAppointment(state, action: PayloadAction<Appointment>) {
			state.appointments.push(action.payload);
			state.queriedAppointments.push(action.payload);
		},
		updateAppointment(state, action: PayloadAction<Appointment>) {
			const updateInList = (list: Appointment[]) => {
				const index = list.findIndex((a) => a.id === action.payload.id);
				if (index !== -1) {
					list[index] = action.payload;
				}
			};
			updateInList(state.appointments);
			updateInList(state.queriedAppointments);
		},
		deleteAppointment(state, action: PayloadAction<string>) {
			state.appointments = state.appointments.filter(
				(a) => a.id !== action.payload
			);
			state.queriedAppointments = state.queriedAppointments.filter(
				(a) => a.id !== action.payload
			);
		},
	},
});

export const {
	setAppointments,
	setQueriedAppointments,
	setSelectedAppointmentStatus,
	clearAppointments,
	addAppointment,
	updateAppointment,
	deleteAppointment,
} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
