import { User } from "@/lib/content/users.content";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsersState {
	users: User[];
	queriedUsers: User[];
}

const initialState: UsersState = {
	users: [],
	queriedUsers: [],
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
					user.status = user.status === "active" ? "blocked" : "active";
				}
			};

			updateStatus(state.users);
			updateStatus(state.queriedUsers);
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
} = usersSlice.actions;

export default usersSlice.reducer;
