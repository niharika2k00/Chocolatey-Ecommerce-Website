
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from "../Components/CheckoutSteps.js";
import { GetOrderDetails_ByID, OrderPay_Action, OrderDeliver_Action } from '../Actions/Order_action.js';
import Mess from '../Components/Message.js';
import Load from '../Components/Loading.js';
import "../STYLES/placeOrderScreen.css";
import backend_URL from '../backend_URL.js';
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../Constants/Order_constant.js";






const OrderScreen = ({ match, history }) => {

    const [sdkReady, setsdkReady] = useState(false)
    const ORDER_ID = match.params.id;
    const dispatch = useDispatch();


    // USER LOGIN ---- User authentication 
    const user_Login = useSelector(state => state.user_Login);  //user_Login -> from the store
    const { UserInfo } = user_Login;

    // ORDER DETAILS
    const order_Details = useSelector(state => state.order_Details);
    const { Order, success, loading, error } = order_Details;
    console.log(order_Details);                                      // {loading,succes,Order}


    // ORDER PAYMENT 
    const order_Pay = useSelector(state => state.order_Pay);
    const { success: successPay, loading: loadingPay } = order_Pay;


    // ORDER DELIVER 
    const order_Deliver = useSelector(state => state.order_Deliver);
    const { success: successDeliver, loading: loadingDeliver } = order_Deliver;



    //   Calculatint Items Price                
    if (!loading) {
        const Till_2_Decimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        Order.itemsPrice = Till_2_Decimals(
            Order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
    }



    // -----  SCRIPT FOR PAYPAL INTEGRATION USING SANDBOX  -------
    useEffect(() => {
        if (!UserInfo)
            history.push('/login');

        else {
            const addPayPalScript = async () => {
                const { data: clientID } = await axios.get(`${backend_URL}/api/config/paypal`);
                console.log("CLIENT-ID = ", clientID);
                const script = document.createElement('script');
                script.type = 'text/javascript';
                // https://developer.paypal.com/docs/checkout/reference/customize-sdk/
                script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}`;
                script.async = true
                script.onload = () => {
                    setsdkReady(true)
                }
                document.body.appendChild(script)
            }
            // addPayPalScript();


            if (!Order || successPay || successDeliver) {
                dispatch({ type: ORDER_PAY_RESET });
                dispatch({ type: ORDER_DELIVER_RESET });
                dispatch(GetOrderDetails_ByID(ORDER_ID));
            }
            else if (!Order.isPaid)   // Not Paid === (!false) === true
            {
                if (!window.paypal) {
                    addPayPalScript();
                    console.log(window.paypal)
                }
                else
                    setsdkReady(true);
            }
        }

    }, [dispatch, ORDER_ID, successPay, successDeliver, Order])




    const PaymentSucces_Handler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(OrderPay_Action(ORDER_ID, paymentResult));
    }


    const deliverHandler = () => {
        dispatch(OrderDeliver_Action(Order))
    }






    return (
        <div>
            {loading ? <Load /> :
                error ? <Mess variant="danger"> {error} </Mess> :
                    <>
                        <h1 id="orderNum" >ORDER {Order._id}</h1>
                        <Row>
                            <Col md={7} className="Orderbkgrnd"  >
                                <ListGroup variant='flush' className="Orderbkgrnd" >
                                    <ListGroup.Item style={{ backgroundColor: "#141314" }} >
                                        <h2 className="orderHead" >Shipping</h2>
                                        <p style={{ margin: "0 0 3px 0" }} ><strong style={{ fontSize: "1.05rem " }}>Name : </strong> <span id="Ordersubhead">{Order.user.name}</span></p>
                                        <p style={{ margin: "0 0 3px 0" }}><strong style={{ fontSize: "1.05rem " }}>Email : </strong> <span id="Ordersubhead">{Order.user.email}</span></p>
                                        {/* <p><a href={`mailto: ${Order.user.email}`} > <span>{Order.user.email}</span></a></p> */}
                                        <p >
                                            <strong style={{ fontSize: "1.05rem " }}>Address: </strong>
                                            <span id="Ordersubhead">
                                                {Order.shippingAddress.address},
                                                {Order.shippingAddress.city}{' '}
                                                {Order.shippingAddress.postalCode},{' '}
                                                {Order.shippingAddress.country}
                                            </span>
                                        </p>
                                        {Order.isDelivered ? <Mess variant="success" >Delivered At {Order.Delivered_at} </Mess>
                                            :
                                            <Mess variant="danger">Not Delivered</Mess>}
                                    </ListGroup.Item>

                                    <ListGroup.Item style={{ backgroundColor: "#141314" }}>
                                        <h2 className="orderHead">Payment Method</h2>
                                        <p style={{ margin: "0 0 1.2rem 0" }}>
                                            <strong>Method: </strong>
                                            <span id="Ordersubhead" >
                                                {Order.paymentMethod}
                                            </span>
                                        </p>


                                        {Order.isPaid ? <Mess variant="success" > Paid on {Order.paid_at} </Mess>
                                            :
                                            <Mess variant="danger">Not Paid</Mess>}
                                    </ListGroup.Item>

                                    <ListGroup.Item style={{ backgroundColor: "#141314" }}>
                                        <h2 className="orderHead">Ordered Items</h2>
                                        {Order.orderItems.length === 0 ? (
                                            <Mess>Your cart is empty</Mess>
                                        ) : (
                                            <ListGroup variant='flush' style={{ border: "1px solid #f4f1de" }}>
                                                {Order.orderItems.map((item, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <Row>
                                                            <Col md={2} sm={3} xs={3} >
                                                                <Image
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    fluid
                                                                    rounded
                                                                />
                                                            </Col>
                                                            <Col sm={4} xs={4} >
                                                                <Link to={`/product/${item.product}`} className="itemDet fontWt7_4" >
                                                                    {item.name}
                                                                </Link>
                                                            </Col>
                                                            <Col md={4} sm={5} xs={5} className="itemDet fontWt7_4" >
                                                                {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        )}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>

                            <Col md={1}></Col>

                            <Col md={4}>
                                <div className="Orderbox">
                                    <ListGroup variant='flush' >
                                        <ListGroup.Item>
                                            <h2 className="orderHead" style={{ textAlign: "center" }} >Order Summary</h2>
                                        </ListGroup.Item>

                                        <ListGroup.Item id="boxsubitem" >
                                            <Row>
                                                <Col>Items</Col>
                                                <Col>₹{Order.itemsPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item id="boxsubitem">
                                            <Row>
                                                <Col>Shipping</Col>
                                                <Col>₹{Order.shipping_price}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item id="boxsubitem">
                                            <Row>
                                                <Col>Tax</Col>
                                                <Col>₹{Order.taxPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item id="boxsubitem">
                                            <Row>
                                                <Col>Total</Col>
                                                <Col>₹{Order.total_price}</Col>
                                            </Row>
                                        </ListGroup.Item>


                                        {/* ------------------   IF NOT PAID THEN BUTTON VISIBLE   ---------------*/}
                                        {!Order.isPaid && (
                                            <ListGroup.Item>
                                                {loadingPay && <Load />}
                                                {!sdkReady ? <Load />
                                                    :
                                                    (
                                                        <PayPalButton
                                                            amount={Order.total_price}
                                                            onSuccess={PaymentSucces_Handler}
                                                        />
                                                    )}
                                            </ListGroup.Item>
                                        )}



                                        {loadingDeliver && <Load />}
                                        {
                                            UserInfo && UserInfo.isAdmin && Order.isPaid && !Order.isDelivered && (
                                                <ListGroup.Item>
                                                    <Button
                                                        type="button"
                                                        onClick={deliverHandler}
                                                        className="btn btn-block"
                                                    >
                                                        Mark As Delivered
                                                    </Button>
                                                </ListGroup.Item>
                                            )
                                        }

                                    </ListGroup>
                                </div>
                            </Col>
                        </Row>
                    </>
            }

        </div>
    )
}

export default OrderScreen;
