

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Form } from 'react-bootstrap';
import '../index.css';
import '../STYLES/Loginform.scss';
import { useDispatch, useSelector } from 'react-redux';
import { LogIN } from '../Actions/User_action.js';
import Loginform_Container from "../Components/Loginform_Container.js";
import Mess from '../Components/Message.js';
import Load from '../Components/Loading.js';


const LoginScreen = ({ location, history }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = location.search ? location.search.split('=')[1] : '/home';// email ( returns the querystring part of a URL)

    const dispatch = useDispatch();

    const user_Login = useSelector(state => state.user_Login);  //user_Login -> from the store
    const { loading, error, UserInfo } = user_Login;


    useEffect(() => {
        if (UserInfo)
            history.push(redirect)
    }, [history, UserInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault() //It'll NOT SUBMIT unless dispatch() calls ACTION & PW,EMAIL are get verified
        dispatch(LogIN(email, password)) //DISPATCH LOGIN
    }


    return (
        <Loginform_Container>
            <h1 className="loginhead"><b>Sign In</b></h1>

            {error && <Mess variant='danger'>{error}</Mess>}
            {loading && <Load />}

            <Form onSubmit={submitHandler} id="login_form" >
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

                <Button type='submit' variant='danger'>
                    <b style={{ fontSize: "18px" }}>Sign In</b>
                </Button>
            </Form>

            <Row className='py-3'>
                <Col style={{ color: "rgba(255, 255, 255, 0.959)" }}>
                    New Customer?{' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                    </Link>
                </Col>
            </Row>

        </Loginform_Container>
    )
}

export default LoginScreen;
