
import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Button, Table, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import '../index.css';
import '../STYLES/Loginform.scss';
import '../STYLES/profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, UserUpdateProfile } from '../Actions/User_action.js';
import { OrderMyAll_Action } from '../Actions/Order_action.js';
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

    // LOOK AT THE REDUX DEV TOOLS 
    const listOfAllMyOrders = useSelector(state => state.listOfAllMyOrders);
    const { loading: loadingAllMyOrders, error: errorOfMyOrders, allMyOrders } = listOfAllMyOrders;



    useEffect(() => {
        if (!UserInfo)
            history.push('/login');
        else {
            if (!USER.name) {
                dispatch(getUserDetails('profile'));
                dispatch(OrderMyAll_Action())
            }
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
            <Col md={4} xs={12} sm={11} >
                <h1 className="cartHead headingGap" >Profile</h1>

                {msg && <Mess variant='danger'>{msg}</Mess>}
                {error && <Mess variant='danger'>{error}</Mess>}
                {success && <Mess variant='success'>Profile Updated</Mess>}
                {loading && <Load />}


                <Form onSubmit={submitHandler} id="login_form" style={{ paddingBottom: "2rem" }}>
                    <Form.Group controlId='name'>
                        <Form.Label><b>Name</b></Form.Label>
                        <Form.Control
                            className="form_box boxLength"
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label><b>Email Address</b></Form.Label>
                        <Form.Control
                            className="form_box boxLength"
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label><b>Password</b></Form.Label>
                        <Form.Control
                            className="form_box boxLength "
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='confirmpassword'>
                        <Form.Label><b>Confirm Password</b></Form.Label>
                        <Form.Control
                            className="form_box boxLength"
                            type='password'
                            placeholder='confirm password'
                            value={confirmpass}
                            onChange={(e) => setConfirmpass(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant="success" style={{ fontSize: "16px" }} >
                        Update
                    </Button>{' '}
                </Form>
            </Col>



            <Col md={8} xs={12} sm={11}>
                <h1 className="cartHead headingGap" >My Orders</h1>
                {loadingAllMyOrders ? (
                    <Load />
                ) : errorOfMyOrders ? (
                    <Mess variant='danger'>{errorOfMyOrders}</Mess>
                ) : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/*        allMyOrders --------->   [{} , {},  {} ] array of objects    */}
                            {allMyOrders.map((odr) => (
                                <tr key={odr._id}>
                                    <td>{odr._id}</td>
                                    <td>{odr.createdAt.substring(0, 10)}</td>
                                    <td>₹ {odr.total_price}</td>
                                    <td>
                                        {odr.isPaid ? (
                                            odr.paidAt.substring(0, 10)
                                        ) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td>
                                        {odr.isDelivered ? (
                                            odr.deliveredAt.substring(0, 10)
                                        ) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order/${odr._id}`}>
                                            <Button className='btn-sm' variant='success'>
                                                Details
                                             </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>

    )
}


export default LoginScreen;
