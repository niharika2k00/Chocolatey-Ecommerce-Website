
import React, { useState } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import '../index.css';
import '../STYLES/Loginform.scss';
import { useDispatch, useSelector } from 'react-redux';
import { SavePaymentMethod } from '../Actions/Cart_action.js';
import Loginform_Container from "../Components/Loginform_Container.js";
import CheckoutSteps from "../Components/CheckoutSteps.js";




const PaymentScreen = ({ history }) => {


    const CART = useSelector(state => state.CART);
    const { shippingAddress } = CART;

    if (!shippingAddress)
        history.push('/shipping');

    const [paymentmethod, setPaymentMethod] = useState("PayPal");


    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("submit");
        dispatch(SavePaymentMethod(paymentmethod));
        history.push('/placeorder');   // redirect to payment page
    }



    return (
        <Loginform_Container>
            <CheckoutSteps step1 step2 step3 />
            <h1 className="loginhead" >Payment Method</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                        </Form.Check>

                        <Form.Check
                            type='radio'
                            label='Stripe'
                            id='Stripe'
                            name='paymentMethod'
                            value='Stripe'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </Loginform_Container>
    )
}

export default PaymentScreen;
