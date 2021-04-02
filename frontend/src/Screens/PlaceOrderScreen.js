
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from "../Components/CheckoutSteps.js";
// import { createOrder } from '../actions/orderActions'
// import { ORDER_CREATE_RESET } from '../constants/orderConstants'
// import { USER_DETAILS_RESET } from '../constants/userConstants';
import Mess from '../Components/Message.js';
import Load from '../Components/Loading.js';
import "../STYLES/placeOrderScreen.css";



const PlaceOrderScreen = ({ history }) => {

    const dispatch = useDispatch();

    const CART = useSelector(state => state.CART);
    const { shippingAddress } = CART;

    if (!CART.shippingAddress.address)
        history.push('/shipping')
    else if (!CART.paymentMethod)
        history.push('/payment')


    //   Calculate prices
    const Till_2_Decimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    CART.itemsPrice = Till_2_Decimals(
        CART.cartItems.reduce((acc, item) => acc + item.price * item.QTY, 0)
    )
    CART.shippingPrice = Till_2_Decimals(CART.itemsPrice > 500 ? 0 : 100)
    CART.taxPrice = Till_2_Decimals(Number((0.15 * CART.itemsPrice).toFixed(2))) // 15% tax
    CART.totalPrice = (
        Number(CART.itemsPrice) +
        Number(CART.shippingPrice) +
        Number(CART.taxPrice)
    ).toFixed(2)



    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8} className="Orderbkgrnd"  >
                    <ListGroup variant='flush' className="Orderbkgrnd" >
                        <ListGroup.Item style={{ backgroundColor: "#141314" }} >
                            <h2 id="Orderhead" ><b> Shipping</b></h2>
                            <p>
                                <strong>Address: </strong>
                                <span id="Ordersubhead">
                                    {CART.shippingAddress.address},
                                    {CART.shippingAddress.city}{' '}
                                    {CART.shippingAddress.postalCode},{' '}
                                    {CART.shippingAddress.country}
                                </span>

                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item style={{ backgroundColor: "#141314" }}>
                            <h2 id="Orderhead">Payment Method</h2>
                            <strong>Method: </strong>
                            <span id="Ordersubhead">
                                {CART.paymentMethod}
                            </span>
                        </ListGroup.Item>

                        <ListGroup.Item style={{ backgroundColor: "#141314" }}>
                            <h2 id="Orderhead">Ordered Items</h2>
                            {CART.cartItems.length === 0 ? (
                                <Mess>Your cart is empty</Mess>
                            ) : (
                                <ListGroup variant='flush' style={{ padding: "1.5rem", border: "1px solid white" }}>
                                    {CART.cartItems.map((item, index) => (
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
                                                    {item.QTY} x ₹{item.price} = ₹{item.QTY * item.price}
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
                                <h2 id="Orderhead" style ={{textAlign:"center" }} >Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item id= "boxsubitem" >
                                <Row>
                                    <Col>Items</Col>
                                    <Col>₹{CART.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item id= "boxsubitem">
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>₹{CART.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item id= "boxsubitem">
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>₹{CART.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item id= "boxsubitem">
                                <Row>
                                    <Col>Total</Col>
                                    <Col>₹{CART.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item id= "boxsubitem">
                                {/* {error && <Mess variant='danger'>{error}</Mess>} */}
                            </ListGroup.Item>

                            <ListGroup.Item id= "boxsubitem">
                                <Button
                                    type='button'
                                    className='btn-block'
                                    variant = "success"
                                    disabled={CART.cartItems === 0}   //cartItems -> array of obj [{},{},{}]
                                // onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
