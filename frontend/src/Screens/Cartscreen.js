
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removefromCart } from '../Actions/Cart_action.js';
import '../STYLES/cart_style.css';
import Mess from '../Components/Message.js';
import Load from '../Components/Loading.js';
import backend_URL from '../backend_URL.js';

const Cartscreen = ({ match, location, history }) => {


    const dispatch = useDispatch();
    const productID = match.params.id;
    const qTY = location.search;
    console.log(qTY);  // ?qTY=4               

    //  ?qTY=4  is stored in an array so a[0] = ?qty  and a[1] = 4.
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;



    const CART = useSelector(state => state.CART);
    // console.log("cart :: ", CART);
    const { cartItems } = CART;
    console.log("{ cartItems } in CART from cartscreen : ", cartItems); // Array of OBJECTS -- [{}, {}, {}] present in the CART


    useEffect(() => {
        if (productID)
            dispatch(addToCart(productID, qty));
    }, [qty, productID, dispatch]);



    const removeFromCartHandler = (id) => {
        console.log('remove')
        dispatch(removefromCart(id));
    }



    const checkoutHandler = () => {
        // console.log("ccheckout")
        history.push('/login?redirect=shipping')
    }



    return (
        <div>
            <Row>
                <Col md={8} sm={5} >
                    <div class="p-2 ">
                        <Link to="/home"> <i className="arrow left"></i></Link>
                        <span>  <h1 id="prohead">Shopping Cart</h1></span>
                    </div>


                    {cartItems.length === 0 ?

                        (<Mess>Your Cart id Empty <Link to="/home">Go Back</Link></Mess>) :

                        (<ListGroup variant="flush" className="procart">
                            {/* item  ----> each product */}
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.product} className="boxsm">
                                    <Row >
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>

                                        <Col md={3}>
                                            {/* {item.product} ------->  is the ID */}
                                            <Link to={`/product/${item.product}`} id="link_css" style={{ fontSize: "1.2rem" }} ><b>{item.name}</b></Link>
                                        </Col>

                                        <Col md={2} id="link_css">₹{item.price}</Col>

                                        <Col md={2}>
                                            <Form.Control
                                                className="cartitem_num"
                                                as='select'
                                                value={item.qty} // update in the redux devtools 
                                                onChange={(e) =>
                                                    dispatch(
                                                        addToCart(item.product, Number(e.target.value))
                                                    )}
                                            >
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>

                                        <Col md={2}>
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        )}
                </Col>


                <Col md={4} sm={7} style={{ padding: '.5rem' }} >
                    <Card>
                        <ListGroup variant='flush' >
                            <ListGroup.Item className="cartbox_rgt" >
                                <h2>
                                    <b>  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</b>
                                </h2>
                                <p> ₹ {cartItems
                                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                                    .toFixed(2)}  {/* fixed to 2 decimal places */}</p>

                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    variant='success'
                                    className='btn-block'
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    <b> PROCEED TO CHECKOUT</b>
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Cartscreen;




// Syntax :    array.reduce(function(total, currentValue, currentIndex, arr), initialValue)