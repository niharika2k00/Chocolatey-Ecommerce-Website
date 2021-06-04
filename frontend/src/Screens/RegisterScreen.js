
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import '../index.css';
import '../STYLES/Loginform.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Register } from '../Actions/User_action.js';
import Loginform_Container from "../Components/Loginform_Container.js";
import Mess from '../Components/Message.js';
import Load from '../Components/Loading.js';


const LoginScreen = ({ location, history }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpass, setConfirmpass] = useState('');
    const [msg, setMsg] = useState(null);


    const redirect = location.search ? location.search.split('=')[1] : '/home';// email ( returns the querystring part of a URL)

    const dispatch = useDispatch();

    const user_Register = useSelector(state => state.user_Register);  //user_Register -> from the store
    const { loading, error, UserInfo } = user_Register;


    useEffect(() => {
        if (UserInfo)
            history.push(redirect)
    }, [history, UserInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmpass)
            setMsg("Password doesn't match!");
        else
            dispatch(Register(name, email, password));
    }


    return (
        <Loginform_Container>
            <h1 className="cartHead" style={{ paddingBottom: "2.1rem" }} >Sign Up</h1>

            {msg && <Mess variant='danger'>{msg}</Mess>}
            {error && <Mess variant='danger'>{error}</Mess>}
            {loading && <Load />}


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


                <Form.Group controlId='password'>
                    <Form.Label><b>Password</b></Form.Label>
                    <Form.Control
                        className="form_box"
                        type='password'
                        placeholder='password'
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

                <Button type='submit' variant='danger'>
                    <b style={{ fontSize: "18px" }}>Register</b>
                </Button>
            </Form>

            <Row className='py-3'>
                <Col style={{ color: "rgba(255, 255, 255, 0.959)" }}>
                    Have an Account ?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Register
                    </Link>
                </Col>
            </Row>

        </Loginform_Container>
    )
}


export default LoginScreen;
