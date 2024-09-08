import React, { useEffect, useState } from "react";
import Button from "../../Components/Button";
import Label from "../../Components/Label";
import Input from "../../Components/Input";
import DropDown from "../../Components/DropDown";
import Textarea from "../../Components/Textarea";
import Popup from "../../Components/Popup";
import { useDispatch, useSelector } from "react-redux";
import { addUser, editUser } from "../../Redux/Users/UsersActions";
import Error from "../../Components/Error";

function EditModal({ data }) {
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    useEffect(() => {
        if (data) {
            setFormData({
                email: data?.email,
                name: data?.name,
            });
        }
    }, [data]);
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(editUser(data?.id, formData));
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
        editUserError,
        // deleteUserLoading,
        deleteUserSuccess,
        // deleteUserError,
    } = useSelector((store) => store.usersReducer);
    useEffect(() => {
        if (deleteUserSuccess || addUserSuccess || editUserSuccess) {
            setOpenModal(false);
        }
    }, [deleteUserSuccess, addUserSuccess, editUserSuccess]);

    return (
        <>
            {/* Modal toggle */}
            <Button onClick={() => setOpenModal(true)} type="button">
                Edit
            </Button>

            {/* Main modal */}
            {openModal && (
                <Popup
                    setShowPopup={() => setOpenModal(false)}
                    showPopup={openModal}
                    title="Edit User"
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
                                <div className="col-span-4">
                                    <Label>Email</Label>
                                    <Input
                                        type="text"
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
                            </div>
                            {editUserError && <Error>{editUserError}</Error>}
                            <Button type="submit">Edit User</Button>
                        </div>
                    </form>
                </Popup>
            )}
        </>
    );
}

export default EditModal;
