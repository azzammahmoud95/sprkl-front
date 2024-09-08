import React, { useEffect, useState } from "react";
import Button from "../../Components/Button";
import Label from "../../Components/Label";
import Input from "../../Components/Input";
import DropDown from "../../Components/DropDown";
import Textarea from "../../Components/Textarea";
import Popup from "../../Components/Popup";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../Redux/Users/UsersActions";
import Error from "../../Components/Error";

function AddModal() {
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addUser(formData));
    };

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
        if (deleteUserSuccess|| addUserSuccess|| editUserSuccess) {
            setOpenModal(false);
        }
    }, [deleteUserSuccess, addUserSuccess, editUserSuccess]);

    return (
        <>
            {/* Modal toggle */}
            <Button onClick={() => setOpenModal(true)} type="button">
                Add User
            </Button>

            {/* Main modal */}
            {openModal && (
                <Popup
                    setShowPopup={() => setOpenModal(false)}
                    showPopup={openModal}
                    title="Create new User"
                >
                    <form
                        onSubmit={handleSubmit}
                        className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700"
                    >
                        {/* Modal body */}
                        <div className="p-4">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-4">
                                    <Label>Name</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="User name"
                                        required
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="col-span-2 w-full">
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        name="name"
                                        placeholder="User name"
                                        required
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="col-span-2">
                                    <Label children={"Password"} />
                                    <Input
                                        type="password"
                                        name="name"
                                        placeholder="User name"
                                        required
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            {addUserError && <Error>{addUserError}</Error>}
                            <Button
                                type="submit"
                                //   className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Add new User
                            </Button>
                        </div>
                    </form>
                </Popup>
            )}
        </>
    );
}

export default AddModal;
