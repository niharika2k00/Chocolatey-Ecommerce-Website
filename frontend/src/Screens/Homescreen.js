
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Mess from '../Components/Message.js';
import Load from '../Components/Loading.js';
import PROD from '../Components/Prod.js';
import { Listproducts } from '../Actions/product_action.js';


const Homescreen = () => {

    const dispatch = useDispatch();
    const product_list = useSelector(state => state.product_list)// <--- Allows to extract data from the Reducer fn frm Store

    const { loading, error, products } = product_list; // destructuring the product list

    useEffect(() => {
        dispatch(Listproducts());
    }, [dispatch])

    // const products = [];

    return (
        <div>
            <Link to="/"><h2> <i className="arrow left"></i> New Trends Available !!</h2> </Link>

            {loading ? < Load /> :                                       // <h2>Loading...</h2>
                error ? < Mess variant="danger" > {error}</Mess> :       //<h3>{error}</h3> 
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
            }
        </div >
    )
}

export default Homescreen;
