import { User } from "@/lib/content/users.content";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const removeDuplicates = (modifiedUsers: User[]) => {
	const uniqueUsersMap = new Map();

	modifiedUsers.forEach((user) => {
		uniqueUsersMap.set(user.id, user);
	});

	return Array.from(uniqueUsersMap.values());
};

interface UsersState {
	users: User[];
	queriedUsers: User[];
	modifiedUsers: User[];
	selectedStatus: string | null;
}

const initialState: UsersState = {
	users: [],
	queriedUsers: [],
	modifiedUsers: [],
	selectedStatus: null,
};
const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		setUsers(state, action: PayloadAction<User[]>) {
			state.users = action.payload;
			state.queriedUsers = action.payload;
		},
		setQueriedUsers(state, action: PayloadAction<User[]>) {
			state.queriedUsers = action.payload;
		},
		addUser(state, action: PayloadAction<User>) {
			state.users.push(action.payload);
		},
		updateUser(state, action: PayloadAction<User>) {
			const index = state.users.findIndex(
				(user) => user.id === action.payload.id
			);
			if (index !== -1) {
				state.users[index] = action.payload;
			}
		},
		deleteUser(state, action: PayloadAction<string>) {
			state.users = state.users.filter((user) => user.id !== action.payload);
		},
		toggleBlockStatus: (state, action) => {
			const updateStatus = (userList: User[]) => {
				const user = userList.find((u) => u.id === action.payload);
				if (user) {
					const previousStatus = user.status;
					user.status = user.status === "active" ? "blocked" : "active";

					if (user.status !== previousStatus) {
						state.modifiedUsers.push(user);
					}
				}
			};

			updateStatus(state.users);
			updateStatus(state.queriedUsers);
			state.modifiedUsers = removeDuplicates(state.modifiedUsers);
		},
		setSelectedStatus(state, action: PayloadAction<string | null>) {
			state.selectedStatus = action.payload;
		},

		clearUsers(state) {
			state.users = [];
		},
	},
});

export const {
	setUsers,
	addUser,
	updateUser,
	deleteUser,
	toggleBlockStatus,
	clearUsers,
	setQueriedUsers,
	setSelectedStatus,
} = usersSlice.actions;

export default usersSlice.reducer;
