
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating.js';
import '../index.css';

// props can be passed orelse we can do DESTRUCTURING
const Prod = (/*props*/  { pro }) => {
    return (
        <div>
            {/* <p>Left arrow: <i class="arrow left"></i></p> */}
            {/* <Link className="btn btn-success my-3" to="/home" >  GO BACK  </Link> */}
            <Card className='my-4 p-3 rounded  card_css' >
                <Link to={`/product/${pro._id}`} >   {/* <a> is changed to Link tag*/}
                    <Card.Img id="img_product" src={pro.image} variant='top' />
                </Link>

                <Card.Body className='p-3' >
                    <Link to={`/product/${pro._id}`} style={{ textDecoration: "none" }} >  {/* <a href = ''></a>  changes to link tag  */}
                        <Card.Title as='div'>
                            <strong id="link_css">{pro.name}</strong>
                        </Card.Title>
                    </Link>

                    <Card.Text>
                        {/*  <div className='my-2'>
                            {pro.rating} from {pro.numReviews} reviews.
                        </div> */}
                        <Rating
                            value={pro.rating}
                            text={` ${pro.numReviews} reviews`}
                        // color = 'red'
                        />
                    </Card.Text>

                    <Card.Text as='h3' style={{ color: "#f1cbe0" }} >
                        ₹{pro.price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Prod;
