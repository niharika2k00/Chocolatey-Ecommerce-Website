
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
            <section id="parallax2" className="parallax2">
                <div className="container" data-aos="zoom-in">
                    <div className="text-center">
                        <h2>Featured Chocolates Products</h2>
                        <p><i class="fas fa-candy-cane px-2"></i>Delight in Every Bite. Lets Chocolate makes your day ........  </p>
                        <a className="parallax2-btn" href="/cart">
                            SHOP
                         </a>
                    </div>
                </div>
            </section>


            <div class="d-flex bd-highlight">
                <div class="p-2 flex-grow-1 bd-highlight">
                    <Link to="/"> <i className="arrow left"></i></Link>
                </div>

                <div class="p-2 bd-highlight sorttitle" ><h5>Sort By :</h5></div>

                <div class="p-2 bd-highlight">
                    <select name="sortby" id="sortby">
                        <option value="lh">Low to High</option>
                        <option value="hl">High to Low</option>
                        <option value="az">A - Z</option>
                        <option value="less200">Price less than 200</option>
                        <option value="bestselling">Best Selling</option>
                    </select>
                </div>
            </div>


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
