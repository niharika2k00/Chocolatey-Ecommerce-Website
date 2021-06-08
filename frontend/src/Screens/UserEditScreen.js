


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Form } from 'react-bootstrap';
import '../index.css';
import '../STYLES/Loginform.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, userUpdateAction } from '../Actions/User_action.js';
import Loginform_Container from "../Components/Loginform_Container.js";
import Mess from '../Components/Message.js';
import Load from '../Components/Loading.js';
import { USER_UPDATE_RESET } from '../Constants/User_constant.js';



const UserEditScreen = ({ history, match }) => {

    // Id of the specific USER
    const urlID = match.params.id;
    console.log(urlID)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isadmin, setIsAdmin] = useState(false);



    const dispatch = useDispatch();

    const user_Details = useSelector(state => state.user_Details);  //user_Details -> from the store
    const { loading, error, USER } = user_Details;
    console.log(user_Details)

    const user_Update = useSelector(state => state.user_Update);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = user_Update;





    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            history.push("/admin/usersList");
        }

        else {
            if (!USER.name || urlID !== USER._id)           // if the user details is not set
                dispatch(getUserDetails(urlID));
            else {
                setName(USER.name);
                setEmail(USER.email);
                setIsAdmin(USER.isAdmin);
            }
        }
    }, [USER, dispatch, urlID, successUpdate, history])



    const submitHandler = (e) => {
        e.preventDefault();
        const Obj = {
            _id: USER._id,
            name: name,
            email: email,
            isAdmin: isadmin
        }
        console.log(Obj)
        dispatch(userUpdateAction(Obj));
    }





    return (
        <>
            <Link to="/admin/usersList" style={{ fontSize: "1.05rem", color: "white" }}> <i className="arrow left"></i> GO BACK </Link>

            <Loginform_Container>
                <h1 className="cartHead" style={{ paddingBottom: "2.1rem" }} >Edit User</h1>


                {errorUpdate && <Mess variant='danger'>{errorUpdate}</Mess>}
                {/* {successUpdate && <Mess variant='success'>Profile Updated</Mess>} */}
                {loadingUpdate && <Load />}

                {
                    loading ? <Load /> :
                        error ? <Mess variant='danger'>{error}</Mess> :
                            (
                                <Form onSubmit={submitHandler} id="login_form">
                                    <Form.Group controlId='name'>
                                        <Form.Label><b>Name</b></Form.Label>
                                        <Form.Control
                                            className="form_box"
                                            type='name'
                                            placeholder='name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='email'>
                                        <Form.Label><b>Email Address</b></Form.Label>
                                        <Form.Control
                                            className="form_box"
                                            type='email'
                                            placeholder='email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>


                                    <Form.Group controlId='isAdmin'>
                                        <Form.Check
                                            type='checkbox'
                                            label="Is Admin"
                                            checked={isadmin}
                                            onChange={(e) => setIsAdmin(e.target.checked)}
                                        ></Form.Check>
                                    </Form.Group>


                                    <Button type='submit' variant='success'>
                                        <b style={{ fontSize: "16px" }}>Edit</b>
                                    </Button>
                                </Form>
                            )
                }
            </Loginform_Container>
        </>
    )
}

export default UserEditScreen;
