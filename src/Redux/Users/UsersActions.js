import { axiosReq } from "../../Utils/utils";
import { usersActions } from "./UsersReducers";


export const getAllUsers = (query) => async (dispatch) => {
    dispatch(usersActions.usersRequest());
    dispatch(
        axiosReq(
            "get",
            process.env.REACT_APP_API + "/user/all",
            {},
            {},
            {
                search: query?.search,
                sortType:query?.sortName,
                sortOrder:query?.sortType
            },
            
        )
    ).then((res) => {
        if (res?.success) {
            dispatch(usersActions.usersSuccess(res?.data));
        } else {
            dispatch(usersActions.usersFailure(res?.data?.message));
        }
        dispatch(clearAll());
    });
};

export const addUser = (body) => async (dispatch) => {
    dispatch(usersActions.addUserRequest());
    dispatch(
        axiosReq("post", process.env.REACT_APP_API + "/user/add", {}, body, {})
    ).then((res ) => {
        if (res?.success) {
            dispatch(usersActions.addUserSuccess());
        } else {
            dispatch(usersActions.addUserFailure(res?.data?.message));
        }
        dispatch(clearAll());
    });
};

export const editUser =
    (id, body) => async (dispatch) => {
        dispatch(usersActions.editUserRequest());
        dispatch(
            axiosReq(
                "patch",
                `${process.env.REACT_APP_API}/user/${id}`,
                {},
                body,
                {}
            )
        ).then((res) => {
            if (res?.success) {
                dispatch(usersActions.editUserSuccess());
            } else {
                dispatch(usersActions.editUserFailure(res?.data?.message));
            }
            dispatch(clearAll());
        });
    };

export const deleteUser = (id) => async (dispatch) => {
    dispatch(usersActions.deleteUserRequest());
    dispatch(
        axiosReq(
            "delete",
            `${process.env.REACT_APP_API}/user/${id}`,
            {},
            {},
            {}
        )
    ).then((res) => {
        if (res?.success) {
            dispatch(usersActions.deleteUserSuccess());
        } else {
            dispatch(usersActions.deleteUserFailure(res?.data?.message));
        }
        dispatch(clearAll());
    });
};

// Clear All States
export const clearAll = () => async (dispatch) => {
    setTimeout(() => {
        dispatch(usersActions.clearStates());
    }, 3000);
};
