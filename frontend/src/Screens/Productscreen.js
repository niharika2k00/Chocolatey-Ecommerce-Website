
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../Components/Rating.js';
import '../index.css';
import "../STYLES/product_style.css";
import { useDispatch, useSelector } from 'react-redux';
import { Detailsproducts } from '../Actions/product_action.js';
import Mess from '../Components/Message.js';
import Load from '../Components/Loading.js';



const Productscreen = ({ history, match }) => {

    // < ------  Shopping Cart ------>
    const [qty, setqty] = useState(1);

    // < ------  Fetcing data from the Backend using REDUX  ------>
    const dispatch = useDispatch();


    // OBJECT 
    const product_details = useSelector(state => state.product_details); // <--- Allows to extract data from the Reducer fn frm Store
    const { loading, error, product } = product_details;                 // product --> product {} that comes from BACKEND find by ID from params
    console.log(product_details)


    useEffect(() => {
        dispatch(Detailsproducts(match.params.id));
    }, [dispatch, match])

    // const product = [];  
    const addToCart_Handler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }



    return (
        <div>
            {/* { product.name} */}
            <section className="Button">
                <a className="Button-btn" href="/home"> Back </a>
            </section>


            {loading ? < Load /> :
                error ? < Mess variant="danger" > {error}</Mess> :
                    product ?
                        (<Row>
                            <Col md={5} id="proimg">
                                <img src={product.image} fluid />
                            </Col>

                            <Col md={4}>
                                <ListGroup variant="flush" >
                                    <ListGroup.Item  ><h3 id="prohead"> {product.name} </h3></ListGroup.Item>

                                    <ListGroup.Item className='listy1'>
                                        <Rating
                                            value={product.rating}
                                            text={` ${product.numReviews} reviews`}
                                            color='crimson'
                                        />
                                    </ListGroup.Item >

                                    <ListGroup.Item className='listy1' style={{ fontSize: "1.8rem" }}><b> Price : </b>₹{product.price}  </ListGroup.Item>
                                    <ListGroup.Item className='listy1'><b> Description :  {' '}</b>{product.description}  </ListGroup.Item>
                                </ListGroup>
                            </Col>

                            <Col md={3} >
                                <Card>
                                    <ListGroup variant="flush" >
                                        <ListGroup.Item className="boxsm" style={{ backgroundColor: "#edf2f4", padding: ".8rem 2rem", color: 'black' }} >
                                            <Row>
                                                <Col> <b> PRICE -:</b> </Col>
                                                <Col><strong>₹{product.price}</strong></Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item className="boxsm" style={{ backgroundColor: "#edf2f4", padding: ".8rem 2rem", color: 'black' }} >
                                            <Row>
                                                <Col> <b>STATUS -: </b> </Col>
                                                <Col> {product.countInStock > 0 ? "In Stock" : "Out of Stock"} </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {/* QUantity of the product */}
                                        {product.countInStock > 0 && (
                                            <ListGroup.Item className="boxsm" style={{ backgroundColor: "#edf2f4", padding: ".8rem 2rem ", color: 'black' }} >
                                                <Row>
                                                    <Col><strong>Quantity -: </strong> </Col>
                                                    <Col>
                                                        <Form.Control as='select' value={qty} onChange={(e) => { setqty(e.target.value) }}>
                                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1} >
                                                                    {x + 1}
                                                                </option>
                                                            ))}
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}

                                        <ListGroup.Item>
                                            <Button
                                                onClick={addToCart_Handler}
                                                variant="danger"
                                                className='btn-block '
                                                type='button'
                                                disabled={product.countInStock === 0}
                                            >
                                                <strong><i class="fas fa-cart-arrow-down"></i> ADD TO CART</strong>
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>

                                </Card>
                            </Col>
                        </Row>)

                        : <h3>Cant fetch product obj</h3>
            }
        </div >
    )
}

export default Productscreen;
