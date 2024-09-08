import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../Redux/Users/UsersActions";
import Error from "./Error";

export default function DeleteModal({ data }) {
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const closeModal = () => setOpenModal(false);

    const {
        users,
        usersLoading,
        usersSuccess,
        usersError,
        addUserLoading,
        addUserError,
        addUserSuccess,
        editUserSuccess,

        // deleteUserLoading,
        deleteUserSuccess,
        // deleteUserError,
    } = useSelector((store) => store.usersReducer);

    useEffect(() => {
        if (deleteUserSuccess ||addUserSuccess|| editUserSuccess) {
            setOpenModal(false);
        }
    }, [deleteUserSuccess, addUserSuccess, editUserSuccess]);

    return (
        <>
            <button
                onClick={() => setOpenModal(true)}
                className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                type="button"
            >
                Delete
            </button>

            {openModal && (
                <Popup
                    setShowPopup={() => setOpenModal(false)}
                    showPopup={openModal}
                    title="Delete User"
                >
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="p-4 md:p-5 text-center">
                            <svg
                                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete {data?.name}?
                            </h3>
                            {addUserError && <Error>{addUserError}</Error>}

                            <button
                                onClick={() => {
                                    // Handle the delete action here
                                    dispatch(deleteUser(data?.id));
                                }}
                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                            >
                                Yes, I'm sure
                            </button>
                            <button
                                onClick={closeModal}
                                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                No, cancel
                            </button>
                        </div>
                    </div>
                </Popup>
            )}
        </>
    );
}
