
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../index.css';
import '../STYLES/Loginform.scss';
import { useDispatch, useSelector } from 'react-redux';
import { SaveShippingAddress } from '../Actions/Cart_action.js';
import Loginform_Container from "../Components/Loginform_Container.js";
import CheckoutSteps from "../Components/CheckoutSteps.js";
import Mess from '../Components/Message.js';
import Load from '../Components/Loading.js';


const ShippingScreen = ({ history }) => {

    const CART = useSelector(state => state.CART);
    const { shippingAddress } = CART;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalcode, setPostalCode] = useState(shippingAddress.postalcode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("submit");
        dispatch(SaveShippingAddress({ address, city, postalcode, country }));
        history.push('/payment');   // redirect to payment page
    }




    return (
        <div>
            <Loginform_Container>
                <CheckoutSteps step1 step2 />
                <h1 className="loginhead" >Shipping</h1>

                {/*  {msg && <Mess variant='danger'>{msg}</Mess>}
                {error && <Mess variant='danger'>{error}</Mess>}
                {loading && <Load />} */}


                <Form onSubmit={submitHandler} id="login_form">
                    <Form.Group controlId='address'>
                        <Form.Label><b>Address</b></Form.Label>
                        <Form.Control
                            className="form_box"
                            type='name'
                            placeholder='address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='city'>
                        <Form.Label><b>City</b></Form.Label>
                        <Form.Control
                            className="form_box"
                            type='city'
                            placeholder='city'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='postalcode'>
                        <Form.Label><b>Postal Code</b></Form.Label>
                        <Form.Control
                            className="form_box"
                            type='postalcode'
                            placeholder='postalcode'
                            value={postalcode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='country'>
                        <Form.Label><b>Country</b></Form.Label>
                        <Form.Control
                            className="form_box"
                            type='text'
                            placeholder='country'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='success'>
                        <b style={{ fontSize: "18px" }}>Continue</b>
                    </Button>
                </Form>

            </Loginform_Container>

        </div>

    )
}

export default ShippingScreen;
