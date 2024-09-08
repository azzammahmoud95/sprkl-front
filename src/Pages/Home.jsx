import { useDispatch, useSelector } from "react-redux";
import Layout from "../Components/Layout/Layout";
import { useEffect, useState } from "react";
import { getAllUsers } from "../Redux/Users/UsersActions";
import Table from "../Components/TableComponent/Table";
import TableHeader from "../Components/TableComponent/TableHeader";
import Row from "../Components/TableComponent/Row";
import TableBody from "../Components/TableComponent/TableBody";
import EditModal from "../Components/EditModal";
import DeleteModal from "../Components/DeleteModal";

export default function Home() {
    const [counter, setCounter] = useState(0);

    const [filter, setFilter] = useState({
        limit: 10,
        offset: 0,
        search: null,
    });
    const dispatch = useDispatch();
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
      if (deleteUserSuccess || addUserSuccess ||editUserSuccess) {
        dispatch(getAllUsers(filter));

      }
    }, [deleteUserSuccess,addUserSuccess,editUserSuccess])
    
    return (
        <Layout>
            <Table>
                <TableHeader>
                    <Row key="header">
                        <th>Name</th>
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
                                        <EditModal data={user}/>
                                        <DeleteModal data={user}/>
                                    </div>
                                </td>
                            </Row>
                        ))}
                </TableBody>
            </Table>
        </Layout>
    );
}
