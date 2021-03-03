
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../Components/Rating.js';
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { Detailsproducts } from '../Actions/product_action.js';
import Mess from '../Components/Message.js';
import Load from '../Components/Loading.js';
// import backend_URL from '../backend_URL.js';


const Productscreen = ({ history, match }) => {

    // < ------  Shopping Cart ------>
    const [qty, setqty] = useState(1);

    // < ------  Fetcing data from the Backend using REDUX  ------>
    const dispatch = useDispatch();

    const product_details = useSelector(state => state.product_details);
    const { loading, error, product } = product_details;

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
            <Link className="btn btn-success my-3" to="/home" >  GO BACK  </Link>

            {loading ? < Load /> :
                error ? < Mess variant="danger" > {error}</Mess> :
                    product ?
                        (<Row>
                            <Col md={5}>
                                <Image src={product.image} fluid />
                            </Col>

                            <Col md={3}>
                                <ListGroup variant="flush" >
                                    <ListGroup.Item  ><h3> {product.name} </h3></ListGroup.Item>

                                    <ListGroup.Item className='listy1'>
                                        <Rating
                                            value={product.rating}
                                            text={` ${product.numReviews} reviews`}
                                            color='#faa307'
                                        />
                                    </ListGroup.Item >

                                    <ListGroup.Item className='listy1'><strong> Price : </strong>₹{product.price}  </ListGroup.Item>
                                    <ListGroup.Item className='listy1'><strong> Description :  </strong>{product.description}  </ListGroup.Item>
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
                                                <strong>ADD TO CART</strong>
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
