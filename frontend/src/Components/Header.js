
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar, Button, Form, FormControl, NavDropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { LogOUT } from '../Actions/User_action.js';


const Header = () => {

    const user_Login = useSelector(state => state.user_Login);
    const { UserInfo } = user_Login;

    const dispatch = useDispatch();

    const Logout_Handler = () => {
        console.log("LOGOUT");
        dispatch(LogOUT());
    }



    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" style={{ padding: "10px", marginbottom: "40px" }} >
                <Container>
                    <LinkContainer to="/"><Navbar.Brand id="heading_nav">Chocolatey</Navbar.Brand></LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">

                            <LinkContainer to="/cart">
                                <Nav.Link className="navBig">Cart{''}
                                    <i class="fas fa-cart-arrow-down"></i>
                                </Nav.Link>
                            </LinkContainer>


                            {/*CREATED LATER AFTER THE LOGIN PART(frontend + backend)*/}
                            {UserInfo ? (
                                <NavDropdown title={UserInfo.name} id="username" className="navBig">
                                    <LinkContainer to='/profile' >
                                        <NavDropdown.Item > Profile </NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={Logout_Handler} >Logout</NavDropdown.Item>
                                </NavDropdown>)
                                :
                                (<LinkContainer to="/login">
                                    <Nav.Link className="navBig" >  Sign In {''}
                                        <i class="far fa-user"></i>
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
                                    </NavDropdown>
                                )
                            }


                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header >
    )
}

export default Header;
