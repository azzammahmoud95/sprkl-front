import { useDispatch, useSelector } from "react-redux";
import Layout from "../Components/Layout/Layout";
import { useEffect, useState } from "react";
import { getAllUsers } from "../Redux/Users/UsersActions";
import Table from "../Components/TableComponent/Table";
import TableHeader from "../Components/TableComponent/TableHeader";
import Row from "../Components/TableComponent/Row";
import TableBody from "../Components/TableComponent/TableBody";
import EditModal from "./HomeActions/EditModal";
import DeleteModal from "./HomeActions/DeleteModal";

export default function Home() {
    const [counter, setCounter] = useState(0);

    const [filter, setFilter] = useState({
        limit: 10,
        offset: 0,
        search: null,
        sortName: null,
        sortType: null, // 'asc' or 'desc'
    });

    const dispatch = useDispatch();

    // Function to handle sorting by column
    const sortByColumn = (columnName) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            sortName: columnName,
            sortType: prevFilter.sortName === columnName && prevFilter.sortType === "asc" 
                      ? "desc" 
                      : "asc",
        }));
    };

    useEffect(() => {
        if (filter.search) {
            setCounter(counter + 1);
            const timer = setTimeout(() => {
                dispatch(getAllUsers(filter));
            }, 800);

            return () => clearTimeout(timer);
        } else if (counter > 0 && !filter.search) {
            setCounter(0);
            const timer = setTimeout(() => {
                dispatch(getAllUsers(filter));
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            dispatch(getAllUsers(filter));
        }
    }, [filter]);

    const {
        users,
        usersLoading,
        usersSuccess,
        usersError,
        addUserLoading,
        addUserSuccess,
        addUserError,

        editUserLoading,
        editUserSuccess,
        editUserError,

        deleteUserLoading,
        deleteUserSuccess,
        deleteUserError,
    } = useSelector((store) => store.usersReducer);

    useEffect(() => {
        if (deleteUserSuccess || addUserSuccess || editUserSuccess) {
            dispatch(getAllUsers(filter));
        }
    }, [deleteUserSuccess, addUserSuccess, editUserSuccess]);

    return (
        <Layout>
            <Table>
                <TableHeader>
                    <Row key="header">
                        <th>
                            <div
                                className="cursor-pointer flex items-center"
                                onClick={() => sortByColumn("name")}
                            >
                                Name
                                <svg
                                    className={`w-4 h-4 ml-2 ${
                                        filter.sortName === "name" && filter.sortType === "asc"
                                            ? "text-white rotate-180"
                                            : "text-white"
                                    }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                    />
                                </svg>
                            </div>
                        </th>
                        <th>Email</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Action</th>
                    </Row>
                </TableHeader>
                <TableBody>
                    {users.length > 0 &&
                        users.map((user) => (
                            <Row key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {new Date(
                                        user.createdAt
                                    ).toLocaleDateString()}
                                </td>
                                <td>
                                    {new Date(
                                        user.updatedAt
                                    ).toLocaleDateString()}
                                </td>
                                <td>
                                    <div className="flex p-0.5 gap-2">
                                        <EditModal data={user} />
                                        <DeleteModal data={user} />
                                    </div>
                                </td>
                            </Row>
                        ))}
                </TableBody>
            </Table>
        </Layout>
    );
}
