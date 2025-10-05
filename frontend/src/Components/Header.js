import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { LogOUT } from "../Actions/User_action.js";
import { useHistory } from "react-router-dom";

const Header = () => {
  const user_Login = useSelector((state) => state.user_Login);
  const { UserInfo } = user_Login;

  const history = useHistory();
  const dispatch = useDispatch();

  const LogoutHandler = () => {
    dispatch(LogOUT());
    history.push("/"); // Redirect to home page after logout
  };

  return (
    <header>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        style={{ padding: "10px", marginbottom: "40px" }}
      >
        <Container style={{ margin: "0 2rem" }}>
          <LinkContainer to="/">
            <Navbar.Brand id="heading_nav">
              Chocolatey{" "}
              <img
                src="./chocolate.png"
                alt="logo"
                style={{ width: "36px", height: "36px", marginLeft: "8px" }}
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/home" style={{ paddingRight: "1rem" }}>
                <Nav.Link className="navBig">
                  <i className="fas fa-store"></i> Products
                </Nav.Link>
              </LinkContainer>
              {/*CREATED LATER AFTER THE LOGIN PART(frontend + backend)*/}
              {UserInfo ? (
                <NavDropdown
                  title={UserInfo.name}
                  id="username"
                  className="navBig"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item> Profile </NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={LogoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login" style={{ paddingRight: "1rem" }}>
                  <Nav.Link className="navBig">
                    Login <i className="far fa-user" />
                  </Nav.Link>
                </LinkContainer>
              )}
              {/* THIS DROPDOWN IS ONLY VISIBLE WHEN THE USER IS AN ADMIN */}
              {UserInfo && UserInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminMenu" className="navBig">
                  <LinkContainer to="/admin/usersList">
                    <NavDropdown.Item> Users </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productsList">
                    <NavDropdown.Item> Products </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/ordersList">
                    <NavDropdown.Item> Orders </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              {/* onClick={() => history.push("/cart")} */}
              <LinkContainer to="/cart" style={{ paddingRight: "1rem" }}>
                <Nav.Link className="navBig">
                  Cart <i className="fas fa-cart-arrow-down"></i>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
