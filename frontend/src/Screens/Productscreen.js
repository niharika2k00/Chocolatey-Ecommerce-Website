
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
    // const [filling, setFilling] = useState("None");
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    console.log(filling)


    // USER LOGIN ---- User authentication 
    const user_Login = useSelector(state => state.user_Login);  //user_Login -> from the store
    const { UserInfo } = user_Login;


    const product_details = useSelector(state => state.product_details);   // <--- Allows to extract data from the Reducer fn frm Store
    const { loading, error, product } = product_details;                    // product --> product {} that comes from BACKEND find by ID from params
    console.log(product_details)


    const product_ReviewCreate = useSelector(state => state.product_ReviewCreate);
    const { loading: prodRev_loading, error: prodRev_error, success: prodRev_success } = product_ReviewCreate;



    useEffect(() => {
        if (prodRev_success) {
            alert("Review Submitted Sucessfully...");
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }

        dispatch(Detailsproducts(match.params.id));
    }, [dispatch, match, prodRev_success])



    // const product = [];  
    const addToCart_Handler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }


    const submitReviewHandler = (e) => {
        e.preventDefault();
        dispatch(createProductReviewAction(match.params.id, { rating, comment }))
        console.log(match.params.id);
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

                        (<>
                            <Row className="topGap">
                                <Col md={4} id="proimg" sm={12} >
                                    <img src={product.image} fluid />
                                </Col>

                                <Col md={5} sm={12} xs={12} className='colGap' >
                                    <ListGroup variant="flush" >
                                        <ListGroup.Item className="bgcolor"><h2 id="prohead"> {product.name} </h2></ListGroup.Item>

                                        <ListGroup.Item className='listy1 bgcolor'>
                                            <Rating
                                                value={product.rating}
                                                text={` ${product.numReviews} reviews`}
                                                color='crimson'
                                            />
                                        </ListGroup.Item >

                                        <ListGroup.Item className='listy1 bgcolor' style={{ fontSize: "1.6rem" }}><b> Price : </b>₹{product.price}  </ListGroup.Item>
                                        <ListGroup.Item className='listy1 bgcolor'><b> Brand :  {' '}</b>{product.brand}  </ListGroup.Item>
                                        <ListGroup.Item className='listy1 bgcolor'><b> Description :  {' '}</b>{product.description}  </ListGroup.Item>

                                        <ListGroup.Item className='listy1 bgcolor'><b> Filling :  {' '}</b>
                                            <Row>
                                                <Col>
                                                    <Form>
                                                        <br />
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

                                                <Col>  <br /> <p>{filling}</p></Col>
                                            </Row>
                                        </ListGroup.Item>

                                    </ListGroup>
                                </Col>



                                <Col md={3} sm={12} xs={12} className='colGap'>
                                    <Card>
                                        <ListGroup variant="flush" style={{ backgroundColor: "#1b1a1a" }}>
                                            <ListGroup.Item className="boxsm" >
                                                <Row>
                                                    <Col> <b> Price   {"  "} <i className="fas fa-arrow-right"></i> </b> </Col>
                                                    <Col><strong> ₹  {"  "} {product.price}</strong></Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item className="boxsm"  >
                                                <Row>
                                                    <Col> <b>Status   {"  "}  <i className="fas fa-arrow-right"></i> </b> </Col>
                                                    <Col> {product.countInStock > 0 ? "In Stock" : "Out of Stock"} </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {/* Quantity of the product */}
                                            {product.countInStock > 0 && (
                                                <ListGroup.Item className="boxsm" >
                                                    <Row>
                                                        <Col><strong>Quantity   {"  "} <i className="fas fa-arrow-right"></i> </strong> </Col>
                                                        <Col>
                                                            <Form.Control
                                                                as='select'
                                                                style={{ borderRadius: "2rem" }}
                                                                value={qty}
                                                                onChange={(e) => { setqty(e.target.value) }}
                                                            >
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
                                                    // variant="danger"
                                                    className='btn-block btnBasic'
                                                    type='button'
                                                    disabled={product.countInStock === 0}
                                                >
                                                    <strong><i className="fas fa-cart-arrow-down"></i> ADD TO CART</strong>
                                                </Button>
                                            </ListGroup.Item>
                                        </ListGroup>

                                    </Card>
                                </Col>
                            </Row>




                            {/* -----------------------------     CUSTOMER  REVIEW  PART   -------------------------------- */}
                            <Row className="topGap">
                                {prodRev_loading && <Load />}
                                {prodRev_error && <Mess variant='danger'>{prodRev_error}</Mess>}

                                <Col md={8} lg={8} sm={12} xs={12}>
                                    <h2 style={{ fontSize: "2.1rem" }} id="prohead" >Reviews</h2>

                                    <hr style={{ borderTop: "1px solid gold" }}></hr>

                                    {product.reviews.length === 0 && <Mess variant='success'> No Reviews. Be the first Reviewer.</Mess>}

                                    <ListGroup variant="flush">
                                        {
                                            product.reviews.map((rev) => (
                                                <ListGroup.Item key={rev._id} >
                                                    <div className="commentHead" ><strong> {rev.name} </strong> | <span style={{ fontSize: ".9rem" }} >{rev.createdAt.substring(0, 10)}</span></div>
                                                    <p className="comment" >{rev.comment}</p>
                                                    <Rating
                                                        value={rev.rating}
                                                        color='#ef233c'
                                                    />
                                                </ListGroup.Item>
                                            ))
                                        }

                                        < ListGroup.Item style={{ paddingTop: "5rem" }} >
                                            <h2 style={{ fontSize: "1.4rem" }} id="prohead" > WRITE  A  CUSTOMER  REVIEW  OF  THIS  PRODUCT </h2>

                                            {prodRev_error && <Mess variant='danger'>{prodRev_error}</Mess>}
                                            {UserInfo ?
                                                (
                                                    <Form onSubmit={submitReviewHandler}>
                                                        <Form.Group controlId="rating">
                                                            <Form.Label> Rating </Form.Label>
                                                            <Form.Control
                                                                as='select'
                                                                value={rating}
                                                                onChange={(e) => setRating(e.target.value)}
                                                                style={{ borderRadius: ".36rem" }}
                                                            >
                                                                <option value='' > Select... </option>
                                                                <option value='1' > 1 - Poor </option>
                                                                <option value='2' > 2 - Fair </option>
                                                                <option value='2.5' > 2.5 - Moderate</option>
                                                                <option value='3' >3 - Good</option>
                                                                <option value='4' > 4 - Very Good</option>
                                                                <option value='5' > 5 - Excellent</option>
                                                            </Form.Control>
                                                        </Form.Group>

                                                        <Form.Group controlId="comment" >
                                                            <Form.Label>Comment</Form.Label>
                                                            <Form.Control
                                                                as='textarea'
                                                                style={{ borderRadius: ".36rem", height: '100px' }}
                                                                placeholder="write your review..."
                                                                value={comment}
                                                                onChange={(e) => setComment(e.target.value)}
                                                            >
                                                            </Form.Control>
                                                        </Form.Group>
                                                        <br></br>
                                                        <Button type="submit" variant="success" style={{ borderRadius: ".36rem" }}>
                                                            Submit
                                                        </Button>
                                                    </Form>
                                                )
                                                :
                                                (<Mess> Please <Link to="/login">login</Link> to write a review </Mess>)
                                            }
                                        </ListGroup.Item>
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
