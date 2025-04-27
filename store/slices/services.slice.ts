import { Service } from "@/lib/content/services.content";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const removeDuplicateServices = (modifiedServices: Service[]) => {
	const unique = new Map();
	modifiedServices.forEach((service) => {
		unique.set(service.id, service);
	});
	return Array.from(unique.values());
};

interface ServicesState {
	services: Service[];
	queriedServices: Service[];
	modifiedServices: Service[];
	selectedStatus: Service["status"] | null;
}

const initialState: ServicesState = {
	services: [],
	queriedServices: [],
	modifiedServices: [],
	selectedStatus: null,
};

const ServicesSlice = createSlice({
	name: "services",
	initialState,
	reducers: {
		setServices(state, action: PayloadAction<Service[]>) {
			state.services = action.payload;
			state.queriedServices = action.payload;
		},
		setQueriedServices(state, action: PayloadAction<Service[]>) {
			state.queriedServices = action.payload;
		},
		addService(state, action: PayloadAction<Service>) {
			state.services.push(action.payload);
		},
		updateService(state, action: PayloadAction<Service>) {
			const index = state.services.findIndex((s) => s.id === action.payload.id);
			if (index !== -1) {
				state.services[index] = action.payload;
			}
		},
		deleteService(state, action: PayloadAction<string>) {
			state.services = state.services.filter((s) => s.id !== action.payload);
		},
		toggleServiceStatus(state, action: PayloadAction<string>) {
			const updateStatus = (list: Service[]) => {
				const service = list.find((s) => s.id === action.payload);
				if (service) {
					const prevStatus = service.status;
					service.status = service.status === "active" ? "inactive" : "active";

					if (service.status !== prevStatus) {
						state.modifiedServices.push(service);
					}
				}
			};
			updateStatus(state.services);
			updateStatus(state.queriedServices);
			state.modifiedServices = removeDuplicateServices(state.modifiedServices);
		},
		setSelectedServiceStatus(
			state,
			action: PayloadAction<Service["status"] | null>
		) {
			state.selectedStatus = action.payload;
		},
		clearServices(state) {
			state.services = [];
		},
	},
});

export const {
	setServices,
	setQueriedServices,
	addService,
	updateService,
	deleteService,
	toggleServiceStatus,
	setSelectedServiceStatus,
	clearServices,
} = ServicesSlice.actions;

export default ServicesSlice.reducer;
