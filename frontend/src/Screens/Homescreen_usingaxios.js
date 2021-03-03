
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
// import products from '../products.js';
import PROD from '../Components/Prod.js';
import backend_URL from '../backend_URL.js';
import axios from 'axios';

const Homescreen = () => {
    const [products, setproducts] = useState([]);  // empty array

    useEffect(() => {

        const Fetchproducts = async () => {
            const res /*{data}*/ = await axios.get(`${backend_URL}/api/products`);  // if we destructure it tn {data}
            // console.log(res.data);
            setproducts(res.data)
        }
        Fetchproducts();              //calling fn 
    }, [])


    return (
        <div>
            <h2>New Trends Available !!</h2>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        {/* <h3>{product.name}</h3> */} 
                        <PROD
                            pro={product}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Homescreen;
