import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../index.css";
import "../STYLES/Loginform.scss";
import { useDispatch, useSelector } from "react-redux";
import { SaveShippingAddress } from "../Actions/Cart_action.js";
import FormContainer from "../Components/FormContainer.js";
import CheckoutSteps from "../Components/CheckoutSteps.js";

const ShippingScreen = ({ history }) => {
  const CART = useSelector((state) => state.CART);
  const { shippingAddress } = CART;

  // NAME SHOULD BE GIVEN ACCOEDING TO THE MODELS
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
    dispatch(SaveShippingAddress({ address, city, postalCode, country })); // PASS VALUES ACCOEDING TO THE MODEL
    history.push("/payment"); // redirect to payment page
  };

  return (
    <div>
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1 className="cartHead" style={{ paddingBottom: "1.8rem" }}>
          Shipping
        </h1>

        <Form onSubmit={submitHandler} id="login_form">
          <Form.Group controlId="address">
            <Form.Label>
              <b>Address</b>
            </Form.Label>
            <Form.Control
              className="form_box"
              type="name"
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="city">
            <Form.Label>
              <b>City</b>
            </Form.Label>
            <Form.Control
              className="form_box"
              type="city"
              placeholder="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="postalcode">
            <Form.Label>
              <b>Postal Code</b>
            </Form.Label>
            <Form.Control
              className="form_box"
              type="postalcode"
              placeholder="postalcode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="country">
            <Form.Label>
              <b>Country</b>
            </Form.Label>
            <Form.Control
              className="form_box"
              type="text"
              placeholder="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            style={{
              marginTop: "1.6rem",
              marginBottom: "3.2rem",
              borderRadius: "1rem",
            }}
            className="customButton neonBtn "
          >
            <div style={{ fontSize: "16px" }}>Continue..</div>
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default ShippingScreen;
