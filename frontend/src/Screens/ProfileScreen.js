
import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Button, Form } from 'react-bootstrap';
import '../index.css';
import '../STYLES/Loginform.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, UserUpdateProfile } from '../Actions/User_action.js';
import Mess from '../Components/Message.js';
import Load from '../Components/Loading.js';


const LoginScreen = ({ history }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpass, setConfirmpass] = useState('');
    const [msg, setMsg] = useState(null);

    const dispatch = useDispatch();

    const user_Details = useSelector(state => state.user_Details);
    const { loading, error, USER } = user_Details;

    const user_Login = useSelector(state => state.user_Login); //user_Login -> from the store
    const { UserInfo } = user_Login;

    const user_UpdateProfileDetails = useSelector(state => state.user_UpdateProfileDetails);
    const { success } = user_UpdateProfileDetails;



    useEffect(() => {
        if (!UserInfo)
            history.push('/login');
        else {
            if (!USER.name)
                dispatch(getUserDetails('profile'));
            else {
                console.log(USER.name)
                setName(USER.name);
                setEmail(USER.email);
            }
        }
    }, [dispatch, history, UserInfo, USER]) //useEffect will be fired off when there is any change in these attributes.


    const submitHandler = (e) => {
        e.preventDefault();
        if (password != confirmpass)
            setMsg("Password doesn't match!");
        else {
            //DISPATCH Updated PROFILE
            dispatch(UserUpdateProfile({ id: USER._id, name, email, password }))
        }
    }




    return (
        <Row>
            <Col md={5} >
                <Container>
                    <Row className="justify-content-md-center" >
                        <Col md={6} xs={12} >
                            {/* <Loginform_Container> */}
                            <h2 className="loginhead" >PROFILE</h2>

                            {msg && <Mess variant='danger'>{msg}</Mess>}
                            {error && <Mess variant='danger'>{error}</Mess>}
                            {success && <Mess variant='success'>Profile Updated</Mess>}
                            {loading && <Load />}


                            <Form onSubmit={submitHandler} id="login_form">
                                <Form.Group controlId='name'>
                                    <Form.Label><b>Name</b></Form.Label>
                                    <Form.Control
                                        className="form_box"
                                        type='name'
                                        placeholder='Enter name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='email'>
                                    <Form.Label><b>Email Address</b></Form.Label>
                                    <Form.Control
                                        className="form_box"
                                        type='email'
                                        placeholder='Enter email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='password'>
                                    <Form.Label><b>Password</b></Form.Label>
                                    <Form.Control
                                        className="form_box"
                                        type='password'
                                        placeholder='Enter password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='confirmpassword'>
                                    <Form.Label><b>Confirm Password</b></Form.Label>
                                    <Form.Control
                                        className="form_box"
                                        type='password'
                                        placeholder='confirm password'
                                        value={confirmpass}
                                        onChange={(e) => setConfirmpass(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Button type='submit' variant='warning'>
                                    <b style={{ fontSize: "18px" }}>Update</b>
                                </Button>
                            </Form>
                            {/* </Loginform_Container> */}
                        </Col>
                    </Row>
                </Container>
            </Col>

            <Col md={7} >
                <h2>My Orders</h2>
            </Col>
        </Row>

    )
}


export default LoginScreen;
