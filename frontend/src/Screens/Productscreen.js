
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import Rating from '../Components/Rating.js';
import '../index.css';
import "../STYLES/product_style.css";
import { useDispatch, useSelector } from 'react-redux';
import { Detailsproducts, createProductReviewAction } from '../Actions/product_action.js';
import Mess from '../Components/Message.js';
import Load from '../Components/Loading.js';
import { PRODUCT_CREATE_REVIEW_RESET } from '../Constants/Product_constant.js';


const Productscreen = ({ history, match, filling, setFilling }) => {

    // < ------  Fetcing data from the Backend using REDUX  ------>
    const dispatch = useDispatch();

    // < ------  Shopping Cart ------>
    const [qty, setqty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    console.log(filling)


    // USER LOGIN ---- User authentication 
    const user_Login = useSelector(state => state.user_Login);  //user_Login -> from the store
    const { UserInfo } = user_Login;


    const product_details = useSelector(state => state.product_details); // <--- Allows to extract data from the Reducer fn frm Store
    const { loading, error, product } = product_details;                 // product --> product {} that comes from BACKEND find by ID from params
    console.log(product_details)


    const product_ReviewCreate = useSelector(state => state.product_ReviewCreate);
    const { loading: prodRev_loading, error: prodRev_error, success: prodRev_success } = product_ReviewCreate;



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

                        (<><Row>
                            <Col md={4} id="proimg" sm={12} >
                                <img src={product.image} fluid />
                            </Col>

                            <Col md={5} sm={12} xs={12} className='colGap' >
                                <ListGroup variant="flush" >
                                    <ListGroup.Item  ><h3 id="prohead"> {product.name} </h3></ListGroup.Item>

                                    <ListGroup.Item className='listy1'>
                                        <Rating
                                            value={product.rating}
                                            text={` ${product.numReviews} reviews`}
                                            color='crimson'
                                        />
                                    </ListGroup.Item >

                                    <ListGroup.Item className='listy1'><b> Brand :  {' '}</b>{product.brand}  </ListGroup.Item>
                                    <ListGroup.Item className='listy1' style={{ fontSize: "1.6rem" }}><b> Price : </b>₹{product.price}  </ListGroup.Item>
                                    <ListGroup.Item className='listy1'><b> Description :  {' '}</b>{product.description}  </ListGroup.Item>

                                    <ListGroup.Item className='listy1'><b> Filling :  {' '}</b>
                                        <Row>
                                            <Col>
                                                <Form>
                                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                                        <Form.Control
                                                            as="select"
                                                            className="filling" onChange={(e) => setFilling(e.target.value)}
                                                            variant="success"
                                                            value={filling}
                                                        >
                                                            <option>None</option>
                                                            <option>Nuts</option>
                                                            <option>Fudge </option>
                                                            <option>Choco Chips </option>
                                                            <option>Caramel </option>
                                                            <option>50% Dark </option>
                                                            <option>75% Dark</option>
                                                            <option> 99% Dark</option>
                                                            <option>White Chocolate </option>
                                                            <option>Truffle </option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Form>
                                            </Col>

                                            <Col>   <p>{filling}</p></Col>
                                        </Row>
                                    </ListGroup.Item>

                                </ListGroup>
                            </Col>



                            <Col md={3} sm={12} xs={12} className='colGap'>
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
                        </Row>


                            <Row>

                                {prodRev_loading && <Load />}
                                {prodRev_error && <Mess variant='danger'>{prodRev_error}</Mess>}

                                <Col md={6} xs={12}>
                                    <h2 style={{ color: '#f8edeb' }}>REVIEWS</h2>

                                    <hr style={{ border: "1px solid red !important" }}> </hr>

                                    {product.reviews.length === 0 && <Mess> No Reviews </Mess>}

                                    <ListGroup variant="flush">
                                        {
                                            product.reviews.map((rev) => (
                                                <ListGroup key={rev._id} >

                                                    <div className="commentHead" ><strong> {rev.name} </strong> | <span>{rev.createdAt.substring(0, 10)}</span></div>
                                                    <p className="comment" >{rev.comment}</p>
                                                    <Rating
                                                        value={rev.rating}
                                                        color='gold'
                                                    />

                                                </ListGroup>
                                            ))
                                        }
                                    </ListGroup>



                                </Col>
                            </Row>






                        </>)

                        : <h3>Cant fetch product obj</h3>
            }
        </div >
    )
}

export default Productscreen;
