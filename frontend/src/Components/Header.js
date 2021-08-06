
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar, Button, Form, FormControl, NavDropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { LogOUT } from '../Actions/User_action.js';
import { useHistory } from 'react-router-dom';


const Header = () => {

    const user_Login = useSelector(state => state.user_Login);
    const { UserInfo } = user_Login;

    const history = useHistory();
    const dispatch = useDispatch();

    const Logout_Handler = () => {
        console.log("LOGOUT");
        dispatch(LogOUT());
    }



    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" style={{ padding: "10px", marginbottom: "40px" }} >
                <Container style={{ margin: "0 2rem" }} >
                    <LinkContainer to="/"><Navbar.Brand id="heading_nav">Chocolatey</Navbar.Brand></LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">

                            {/*CREATED LATER AFTER THE LOGIN PART(frontend + backend)*/}
                            {UserInfo ? (
                                <NavDropdown title={UserInfo.name} id="username" className="navBig">
                                    <LinkContainer to='/profile' >
                                        <NavDropdown.Item > Profile </NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={Logout_Handler} >Logout</NavDropdown.Item>
                                </NavDropdown>)
                                :
                                (<LinkContainer to="/login" style={{ paddingRight: "1rem" }}>
                                    <Nav.Link className="navBig" >  Sign In<i className="far fa-user"></i>
                                    </Nav.Link>
                                </LinkContainer>)
                            }


                            {/* THIS DROPDOWN IS ONLY VISIBLE WHEN THE USER IS AN ADMIN */}
                            {
                                UserInfo && UserInfo.isAdmin && (
                                    <NavDropdown title="Admin" id="adminMenu" className="navBig">
                                        <LinkContainer to='/admin/usersList' >
                                            <NavDropdown.Item > Users </NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to='/admin/productsList' >
                                            <NavDropdown.Item > Products </NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to='/admin/ordersList' >
                                            <NavDropdown.Item > Orders </NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                )
                            }


                            <div
                                onClick={() => history.push('/cart')}
                                style={{
                                    color: "white",
                                    fontSize: "1.2rem",
                                    marginTop: ".5rem",
                                    fontWeight: "500"
                                }}
                            >
                                Cart{''}
                                <i class="fas fa-cart-arrow-down"></i>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header >
    )
}

export default Header;
