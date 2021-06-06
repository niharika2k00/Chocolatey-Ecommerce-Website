

import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Mess from '../Components/Message.js';
import Load from '../Components/Loading.js';
import { UserAll_ListAction } from '../Actions/User_action.js'




const UsersListScreen = ({ history }) => {

    const dispatch = useDispatch();
    const users_List = useSelector(state => state.users_List);
    const { loading, error, allUsers } = users_List;

    const user_Login = useSelector(state => state.user_Login);  //user_Login -> from the store
    const { UserInfo } = user_Login;




    useEffect(() => {
        if (UserInfo && UserInfo.isAdmin)
            dispatch(UserAll_ListAction())
        else
            history.push('/login');
    }, [dispatch])



    const deleteHandler = (id) => {
        console.log("User Deleted Successfully")
    }



    return (
        <div>
            <h1 className="cartHead" style={{ paddingBottom: "2rem" }} >Users</h1>
            {
                loading ? (<Load />) :
                    error ? (<Mess variant='danger'>{error}</Mess>) :
                        (
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>ADMIN</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {allUsers.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.name}</td>
                                            <td>  <a href={`mailto:${user.email}`}>{user.email}</a>  </td>
                                            <td>
                                                {user.isAdmin ? (
                                                    <i className='fas fa-check' style={{ color: 'green', fontSize: "1.5rem" }}></i>
                                                ) : (
                                                    <i className='fas fa-times' style={{ color: 'red', fontSize: "1.5rem" }}></i>
                                                )}
                                            </td>
                                            <td>
                                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>
                                                <Button
                                                    variant='danger'
                                                    className='btn-sm'
                                                    onClick={() => deleteHandler(user._id)}
                                                >
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )
            }
        </div >
    )
}

export default UsersListScreen;
