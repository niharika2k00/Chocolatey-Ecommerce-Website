
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form, Container } from 'react-bootstrap';
import Rating from '../Components/Rating.js';
import './intro_style.css';
import bubble from '../Pics/bubble.png';
import { useDispatch, useSelector } from 'react-redux';
import { Detailsproducts } from '../Actions/product_action.js';
import Mess from '../Components/Message.js';
import Load from '../Components/Loading.js';
// import backend_URL from '../backend_URL.js';


const Introscreen = () => {



    return (
        <div className="main-cls">
            <Container >   {/* border around */}
                <Link className="btn btn-danger my-3" to="/home" >  GO BACK  </Link>             
                {<div className="bubble" >
                    <img src={bubble} />
                    <img src={bubble} />
                    <img src={bubble} />
                    <img src={bubble} />
                    <img src={bubble} />
                    <img src={bubble} />
                    <img src={bubble} />
                </div>

                }

            </Container>
        </div>
    )
}

export default Introscreen
