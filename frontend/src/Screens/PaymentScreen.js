import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import "../index.css";
import "../STYLES/Loginform.scss";
import { useDispatch, useSelector } from "react-redux";
import { SavePaymentMethod } from "../Actions/Cart_action.js";
import Loginform_Container from "../Components/Loginform_Container.js";
import CheckoutSteps from "../Components/CheckoutSteps.js";

const PaymentScreen = ({ history }) => {
  const CART = useSelector((state) => state.CART);
  const { shippingAddress } = CART;

  if (!shippingAddress) history.push("/shipping");

  const [paymentmethod, setPaymentMethod] = useState("Cash on Delivery");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
    dispatch(SavePaymentMethod(paymentmethod));
    history.push("/placeorder"); // redirect to payment page
  };

  return (
    <Loginform_Container>
      <CheckoutSteps step1 step2 step3 />
      <h1 className="cartHead" style={{ paddingBottom: "1.5rem" }}>
        Payment Method
      </h1>

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="h2" className="paymentSub">
            Select Method
          </Form.Label>
          <Col>
            <Form.Check
              className="paymentSub1"
              type="radio"
              label="Cash on Delivery"
              id="Cash on Delivery"
              name="paymentMethod"
              value="Cash on Delivery"
              checked={paymentmethod === "Cash on Delivery"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>

            <Form.Check
              className="paymentSub1"
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentmethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>

            <Form.Check
              className="paymentSub1"
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              checked={paymentmethod === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
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
    </Loginform_Container>
  );
};

export default PaymentScreen;
