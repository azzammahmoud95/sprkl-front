import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UsersReducers from "./Redux/Users/UsersReducers";
import {thunk}  from "redux-thunk";

const rootReducer = combineReducers({
    usersReducer: UsersReducers,
});

const ReduxStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
});
export default ReduxStore;

