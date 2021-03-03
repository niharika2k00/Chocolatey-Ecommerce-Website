
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../Components/Rating.js';
import '../index.css';
import backend_URL from '../backend_URL.js';
import axios from 'axios';
// import products from '../products.js';

const Productscreen = ({ match }) => {
    // const product = products.find(p => p._id === match.params.id) // use to fetch data frm the FRONTEND

    // <------------ use to fetch data frm the BACKEND - api   ------------->
    const [product, setproduct] = useState({});  // empty object
    useEffect(() => {

        const Fetchproduct = async () => {
            const res = await axios.get(`${backend_URL}/api/products/${match.params.id}`);
            setproduct(res.data)
        }
        Fetchproduct();
    }, [match])


    return (
        <div>
            {/* { product.name} */}
            <Link className="btn btn-success my-3" to="/" >  GO BACK  </Link>

            <Row>
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
                            <ListGroup.Item className="boxsm" style={{ backgroundColor: "#edf2f4", padding: ".8rem 2rem" }} >
                                <Row>
                                    <Col> <b> PRICE ::</b> </Col>
                                    <Col><strong>₹{product.price}</strong></Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item className="boxsm" style={{ backgroundColor: "#edf2f4", padding: ".8rem 2rem" }} >
                                <Row>
                                    <Col> <b>STATUS :: </b> </Col>
                                    <Col> {product.countInStock > 0 ? "In Stock" : "Out of Stock"} </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item >
                                <Button variant="danger" className="btn-block" type="button" >
                                    <strong>ADD TO CART</strong>
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>

                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Productscreen;






































