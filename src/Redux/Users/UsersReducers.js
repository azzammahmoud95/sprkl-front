import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
  users: [],
  usersLoading: false,
  usersSuccess: false,
  usersError: "",

  addUserLoading: false,
  addUserSuccess: false,
  addUserError: "",

  editUserLoading: false,
  editUserSuccess: false,
  editUserError: "",

  deleteUserLoading: false,
  deleteUserSuccess: false,
  deleteUserError: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Get Users
    usersRequest(state) {
      state.usersLoading = true;
      state.usersError = "";
      state.usersSuccess = false;
      state.users = [];
    },
    usersSuccess(state, action) {
      state.usersLoading = false;
      state.usersError = "";
      state.usersSuccess = true;
      state.users = action.payload;
    },
    usersFailure(state, action) {
      state.usersLoading = false;
      state.usersSuccess = false;
      state.usersError = action.payload;
      state.users = [];
    },

    // Add User
    addUserRequest(state) {
      state.addUserLoading = true;
      state.addUserError = "";
      state.addUserSuccess = false;
    },
    addUserSuccess(state) {
      state.addUserLoading = false;
      state.addUserError = "";
      state.addUserSuccess = true;
    },
    addUserFailure(state, action) {
      state.addUserLoading = false;
      state.addUserSuccess = false;
      state.addUserError = action.payload;
    },

    // Edit User
    editUserRequest(state) {
      state.editUserLoading = true;
      state.editUserError = "";
      state.editUserSuccess = false;
    },
    editUserSuccess(state) {
      state.editUserLoading = false;
      state.editUserError = "";
      state.editUserSuccess = true;
    },
    editUserFailure(state, action) {
      state.editUserLoading = false;
      state.editUserSuccess = false;
      state.editUserError = action.payload;
    },

    // Delete User
    deleteUserRequest(state) {
      state.deleteUserLoading = true;
      state.deleteUserError = "";
      state.deleteUserSuccess = false;
    },
    deleteUserSuccess(state) {
      state.deleteUserLoading = false;
      state.deleteUserError = "";
      state.deleteUserSuccess = true;
    },
    deleteUserFailure(state, action) {
      state.deleteUserLoading = false;
      state.deleteUserSuccess = false;
      state.deleteUserError = action.payload;
    },

    // Clear All States
    clearStates(state) {
      state.usersError = "";
      state.usersSuccess = false;
      state.addUserError = "";
      state.addUserSuccess = false;
      state.editUserError = "";
      state.editUserSuccess = false;
      state.deleteUserError = "";
      state.deleteUserSuccess = false;
    },
  },
});

export const usersActions = usersSlice.actions;
export default usersSlice.reducer;
