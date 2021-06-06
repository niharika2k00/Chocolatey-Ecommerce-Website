
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



    // ---------------------------------           FILTER AND SORTING METHODS      -------------------------------
    const [currCartItems, setcurrCartItems] = useState([]);
    const [activee, setActivee] = useState("");


    const reset = () => {
        setcurrCartItems(products);
    }

    const sort = (topic) => {
        if (!topic) {
            setcurrCartItems(products);
            setActivee("");
        }
        else {
            let arr = clone(products);
            setActivee(topic);
            console.log(arr)
            arr = arr.filter((obj) => obj.topic === topic);
            setcurrCartItems(arr);
        }
    }

    const sortBestSelling = (bestSelling) => {
        if (!bestSelling) {
            setcurrCartItems(products);
            setActivee("");
        }
        else {
            let arr = clone(products);
            setActivee(bestSelling);
            console.log(arr)
            arr = arr.filter((obj) => obj.bestSelling === bestSelling);
            setcurrCartItems(arr);
        }
    }


    const sortAscending = () => {
        const productsClone = [...products];
        productsClone.sort(function (a, b) {
            return a["name"].localeCompare(b["name"]);
        });
        setcurrCartItems(productsClone);
        console.log(productsClone)
    }


    const sortLess100 = () => {
        const result = products.filter(item => item.price < 100);
        setcurrCartItems(result);
    }


    const sortMore250 = () => {
        const result = products.filter(item => item.price > 250);
        setcurrCartItems(result);
    }


    const sortLowToHigh = () => {
        const productsClone = [...products];
        productsClone.sort((a, b) => {
            return (a.price - b.price);
        });
        setcurrCartItems(productsClone);
        console.log(productsClone)
    }


    const sortHIghToLow = () => {
        const productsClone = [...products];
        productsClone.sort((a, b) => {
            return (b.price - a.price);
        });
        setcurrCartItems(productsClone);
        console.log(productsClone)
    }

    console.log(currCartItems)

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

                <div className="p-2 bd-highlight py-3">
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ fontSize: "1.18rem", padding: ".4rem .7rem", borderRadius: ".6rem" }} >
                            Filter <i className="fas fa-filter"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => reset()}> <Link to="/home" >All </Link> </Dropdown.Item>
                            <Dropdown.Item onClick={() => sortLowToHigh()}> <Link to="/home">Low to High</Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => sortHIghToLow()}> <Link to="/home">High to Low</Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => sortAscending()}><Link to="/home">A - Z</Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => sortLess100()}><Link to="/home">Price less than 100</Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => sortMore250()}><Link to="/home">Price more than 250</Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => sortBestSelling("Best Selling")}><Link to="/home">Best Selling</Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => sort("Mother's Day")}><Link to="/home">Mother's Day</Link> </Dropdown.Item>
                            <Dropdown.Item onClick={() => sort("Valentines Day")}><Link to="/home">Valentines Day</Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => sort("Christmas Special")}><Link to="/home">Christmas Special</Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => sort("Gift Boxes")}><Link to="/home">Gift Boxes</Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => sort("Brownies")}><Link to="/home">Brownies</Link></Dropdown.Item>
                            <Dropdown.Item onClick={() => sort("Cup Cakes")}><Link to="/home">Cup Cakes</Link></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>


            {loading ? < Load /> :                                       // <h2>Loading...</h2>
                error ? < Mess variant="danger" > {error}</Mess> :       //<h3>{error}</h3> 
                    <Row style={{ paddingBottom: "2rem" }} >
                        {currCartItems && currCartItems.map(product => (
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
