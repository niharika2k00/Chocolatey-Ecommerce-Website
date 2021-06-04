
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Mess from '../Components/Message.js';
import Load from '../Components/Loading.js';
import PROD from '../Components/Prod.js';
import { Listproducts } from '../Actions/product_action.js';
import { clone } from 'ramda';



const Homescreen = () => {

    const dispatch = useDispatch();
    const product_list = useSelector(state => state.product_list)// <--- Allows to extract data from the Reducer fn frm Store

    const { loading, error, products } = product_list; // destructuring the product list

    useEffect(() => {
        dispatch(Listproducts());
    }, [dispatch])

    // const products = [];



    const [currCartItems, setcurrCartItems] = useState([]);
    const [activee, setActivee] = useState("");

    const sort = (top) => {
        if (!top) {
            setcurrCartItems(products);
            setActivee("");
        }
        else {
            let arr = clone(products);
            setActivee(top);
            arr = arr.filter((obj) => obj.top === top);
            setcurrCartItems(arr);
        }
    }

    useEffect(() => {
        setcurrCartItems(products);
    }, [products])




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


            <div className="d-flex bd-highlight">
                <div className="p-2 flex-grow-1 bd-highlight">
                    <Link to="/"> <i className="arrow left"></i></Link>
                </div>

                <div className="p-2 bd-highlight sorttitle" ><h5>Sort By :</h5></div>

                <div className="p-2 bd-highlight">
                    {/* <select name="sortby" id="sortby">
                        <option value="all">All</option>
                        <option value="lh">Low to High</option>
                        <option value="hl">High to Low</option>
                        <option value="az">A - Z</option>
                        <option value="less200">Price less than 200</option>
                        <option value="bestselling">Best Selling</option>
                        <option value="motherDay">Mothers Day</option>
                        <option value="valentine">Valentines Day</option>
                        <option value="christmas">Christmas Special</option>
                        <option value="gftbox">Gift Boxes</option>
                        <option value="brownies">Brownies</option>
                        <option value="cupCakes">Cup Cakes</option>
                    </select> */}

                    <Dropdown>
                        <Dropdown.Toggle variant="danger" id="dropdown-basic">
                            Filter <i className="fas fa-filter"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => sort("")}  > <Link to="" >All </Link> </Dropdown.Item>
                            <Dropdown.Item onClick={() => sort("Low to High")}><Link to="">Low to High</Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => sort("High to Low")}> <Link to="">High to Low</Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => sort("A - Z")}><Link to="">A - Z</Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => sort("Price less than 200")}><Link to="">Price less than 200</Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => sort("Best Selling")}><Link to="">Best Selling</Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => sort("Mothers Day")}><Link to="">Mothers Day</Link> </Dropdown.Item>
                            <Dropdown.Item onClick={() => sort("Valentines Day")}><Link to="">Valentines Day</Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => sort("Christmas Special")}><Link to="">Christmas Special</Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => sort("Gift Boxes")}><Link to="">Gift Boxes</Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => sort("Brownies")}><Link to="">Brownies</Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => sort("Cup Cakes")}><Link to="">Cup Cakes</Link></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>


            {loading ? < Load /> :                                       // <h2>Loading...</h2>
                error ? < Mess variant="danger" > {error}</Mess> :       //<h3>{error}</h3> 
                    <Row style={{ paddingBottom: "2rem" }} >
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
