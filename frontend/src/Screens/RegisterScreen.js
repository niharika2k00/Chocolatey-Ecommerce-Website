import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import "../index.css";
import "../STYLES/Loginform.scss";
import { useDispatch, useSelector } from "react-redux";
import { Register } from "../Actions/User_action.js";
import FormContainer from "../Components/FormContainer.js";
import Mess from "../Components/Message.js";
import Load from "../Components/Loading.js";

const LoginScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [msg, setMsg] = useState(null);

  const redirect = location.search ? location.search.split("=")[1] : "/home"; // email ( returns the querystring part of a URL)

  const dispatch = useDispatch();

  const user_Register = useSelector((state) => state.user_Register); //user_Register -> from the store
  const { loading, error, UserInfo } = user_Register;

  useEffect(() => {
    if (UserInfo) history.push(redirect);
  }, [history, UserInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpass) setMsg("Password doesn't match!");
    else dispatch(Register(name, email, password));
  };

  return (
    <FormContainer>
      <h1 className="cartHead" style={{ paddingBottom: "2.1rem" }}>
        Sign Up
      </h1>

      {msg && <Mess variant="danger">{msg}</Mess>}
      {error && <Mess variant="danger">{error}</Mess>}
      {loading && <Load />}

      <Form onSubmit={submitHandler} id="login_form">
        <Form.Group controlId="name" style={{ marginBottom: "2rem" }}>
          <Form.Label>
            {" "}
            <i className="far fa-user profileIcon"></i> <b>Name</b>
          </Form.Label>
          <Form.Control
            className="form_box"
            type="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email" style={{ marginBottom: "2rem" }}>
          <Form.Label>
            <i className="fas fa-envelope profileIcon"></i> <b>Email Address</b>
          </Form.Label>
          <Form.Control
            className="form_box"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" style={{ marginBottom: "2rem" }}>
          <Form.Label>
            {" "}
            <i className="fas fa-lock profileIcon"></i> <b>Password</b>
          </Form.Label>
          <Form.Control
            className="form_box"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmpassword">
          <Form.Label>
            <i className="far fa-check-circle profileIcon"></i>
            <b>Confirm Password</b>
          </Form.Label>
          <Form.Control
            className="form_box"
            type="password"
            placeholder="confirm password"
            value={confirmpass}
            onChange={(e) => setConfirmpass(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <div style={{ textAlign: "center" }}>
          <Button
            type="submit"
            variant="danger"
            style={{
              marginTop: "1.6rem",
              marginBottom: "1rem",
              borderRadius: ".3rem",
              width: "50%",
            }}
          >
            <b style={{ fontSize: "16px" }}> Register </b>
          </Button>
        </div>
      </Form>

      <Row className="py-3">
        <Col style={{ color: "rgba(255, 255, 255, 0.959)" }}>
          Already have an Account ?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            <b> Login</b>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
