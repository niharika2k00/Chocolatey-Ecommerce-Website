
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from "../Components/CheckoutSteps.js";
import { GetOrderDetails_ByID } from '../Actions/Order_action.js';
import Mess from '../Components/Message.js';
import Load from '../Components/Loading.js';
import "../STYLES/placeOrderScreen.css";




const OrderScreen = ({ match }) => {

    const ORDER_ID = match.params.id;
    const dispatch = useDispatch();


    const order_Details = useSelector(state => state.order_Details);
    const { Order, success, loading, error } = order_Details;
    console.log(order_Details); // {loading,succes,Order}


    //   Calculatint Items Price
    if (!loading) {
        const Till_2_Decimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        Order.itemsPrice = Till_2_Decimals(
            Order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
    }



    useEffect(() => {
        dispatch(GetOrderDetails_ByID(ORDER_ID));
    }, [dispatch, ORDER_ID])



    return (
        <div>
            {loading ? <Load /> :
                error ? <Mess variant="danger"> {error} </Mess> :
                    <>
                        <h1>ORDER {Order._id}</h1>
                        <Row>
                            <Col md={8} className="Orderbkgrnd"  >
                                <ListGroup variant='flush' className="Orderbkgrnd" >
                                    <ListGroup.Item style={{ backgroundColor: "#141314" }} >
                                        <h2 id="Orderhead" ><b> Shipping</b></h2>
                                        <p><strong>Name : </strong> <span>{Order.user.name}</span></p>
                                        <p><strong>Email : </strong> <span>{Order.user.email}</span></p>
                                        <p><a href={`mailto:${Order.user.email}`} > <span>{Order.user.email}</span></a></p>
                                        <p>
                                            <strong>Address: </strong>
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
                                        <h2 id="Orderhead">Payment Method</h2>
                                        <strong>Method: </strong>
                                        <span id="Ordersubhead">
                                            {Order.paymentMethod}
                                        </span>

                                        {Order.isPaid ? <Mess variant="success" > Paid on {Order.paid_at} </Mess>
                                            :
                                            <Mess variant="danger">Not Paid</Mess>}
                                    </ListGroup.Item>

                                    <ListGroup.Item style={{ backgroundColor: "#141314" }}>
                                        <h2 id="Orderhead">Ordered Items</h2>
                                        {Order.orderItems.length === 0 ? (
                                            <Mess>Your cart is empty</Mess>
                                        ) : (
                                            <ListGroup variant='flush' style={{ padding: "1.5rem", border: "1px solid white" }}>
                                                {Order.orderItems.map((item, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <Row>
                                                            <Col md={2}>
                                                                <Image
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    fluid
                                                                    rounded
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <Link to={`/product/${item.product}`} id="link_css" style={{ fontSize: "1.3rem" }}>
                                                                    {item.name}
                                                                </Link>
                                                            </Col>
                                                            <Col md={4} id="link_css">
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


                            <Col md={4}>
                                <Card className="Orderbox">
                                    <ListGroup variant='flush' >
                                        <ListGroup.Item>
                                            <h2 id="Orderhead" style={{ textAlign: "center" }} >Order Summary</h2>
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

                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    </>
            }

        </div>
    )
}

export default OrderScreen;
