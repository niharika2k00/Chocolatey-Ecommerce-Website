
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from "../Components/CheckoutSteps.js";
import { Create_OrderAction } from '../Actions/Order_action.js';
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
        CART.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
    CART.shippingPrice = Till_2_Decimals(CART.itemsPrice > 500 ? 0 : 100)
    CART.taxPrice = Till_2_Decimals(Number((0.15 * CART.itemsPrice).toFixed(2))) // 15% tax
    CART.totalPrice = (
        Number(CART.itemsPrice) +
        Number(CART.shippingPrice) +
        Number(CART.taxPrice)
    ).toFixed(2)



    const order_Create = useSelector(state => state.order_Create);
    const { Order, success, error } = order_Create;

    console.log(order_Create); // {loading,succes,Order}

    useEffect(() => {
        if (success) {
            history.push(`/order/${Order._id}`);
        }
    }, [history, success])



    const placeOrderHandler = () => {
        console.log('order placed');
        console.log(order_Create);

        // Dispatch(send) to Action
        dispatch(Create_OrderAction({
            itemsPrice: CART.itemsPrice,
            orderItems: CART.cartItems,
            paymentMethod: CART.paymentMethod,
            shippingAddress: CART.shippingAddress,
            shipping_price: CART.shippingPrice,
            taxPrice: CART.taxPrice,
            total_price: CART.totalPrice
        }))

    }




    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={7} sm={12} xs={12} className="Orderbkgrnd"  >
                    <ListGroup variant='flush' className="Orderbkgrnd" >
                        <ListGroup.Item style={{ backgroundColor: "#141314", padding: "0rem" }} >
                            <h2 className="orderHead" > Shipping</h2>
                            <p>
                                <strong style={{ fontSize: "1.05rem " }} >Address: </strong>
                                <span id="Ordersubhead">
                                    {CART.shippingAddress.address},
                                    {CART.shippingAddress.city}{' '}
                                    {CART.shippingAddress.postalCode},{' '}
                                    {CART.shippingAddress.country}
                                </span>

                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item style={{ backgroundColor: "#141314", padding: "0rem" }}>
                            <h2 className="orderHead" >Payment Method</h2>
                            <strong style={{ fontSize: "1.05rem " }}>Method: </strong>
                            <span id="Ordersubhead">
                                {CART.paymentMethod}
                            </span>
                        </ListGroup.Item>

                        <ListGroup.Item style={{ backgroundColor: "#141314", padding: "0rem" }}>
                            <h2 className="orderHead">Ordered Items</h2>
                            {CART.cartItems.length === 0 ? (
                                <Mess>Your cart is empty</Mess>
                            ) : (
                                <ListGroup variant='flush' >
                                    {CART.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2} sm={4} xs={4}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>

                                                <Col sm={4} xs={4}>
                                                    <Link to={`/product/${item.product}`} className="itemDet">
                                                        {item.name}
                                                    </Link>
                                                </Col>

                                                <Col md={4} sm={4} xs={4} className="itemDet">
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
                    <div className="Orderbox" >
                        <ListGroup variant='flush' style={{ backgroundColor: "#141314", padding: "0 0 12px 0" }} >
                            <ListGroup.Item>
                                <h2 className="orderHead" style={{ textAlign: "center" }} >Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item id="boxsubitem" >
                                <Row>
                                    <Col>Items</Col>
                                    <Col>₹{CART.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item id="boxsubitem">
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>₹{CART.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item id="boxsubitem">
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>₹{CART.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item id="boxsubitem">
                                <Row>
                                    <Col>Total</Col>
                                    <Col>₹{CART.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item id="boxsubitem">
                                {error && <Mess variant='danger'>{error}</Mess>}
                            </ListGroup.Item>

                            <ListGroup.Item id="boxsubitem">
                                <Button
                                    type='button'
                                    className='btn-block'
                                    variant="success"
                                    disabled={CART.cartItems === 0}   //cartItems -> array of obj [{},{},{}]
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen;
