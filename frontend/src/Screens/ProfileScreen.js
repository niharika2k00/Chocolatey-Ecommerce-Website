import React, { useEffect, useState } from "react";
import { Row, Col, Table, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../index.css";
import "../STYLES/Loginform.scss";
import "../STYLES/profile.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, UserUpdateProfile } from "../Actions/User_action.js";
import { OrderMyAll_Action } from "../Actions/Order_action.js";
import Mess from "../Components/Message.js";
import Load from "../Components/Loading.js";
import CustomButton from "../Components/CustomButton.js";

const LoginScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [msg, setMsg] = useState(null);

  const user_Details = useSelector((state) => state.user_Details);
  const { loading, error, USER } = user_Details;

  const user_Login = useSelector((state) => state.user_Login); //user_Login -> from the store
  const { UserInfo } = user_Login;

  const user_UpdateProfileDetails = useSelector(
    (state) => state.user_UpdateProfileDetails
  );
  const { success } = user_UpdateProfileDetails;

  // LOOK AT THE REDUX DEV TOOLS
  const listOfAllMyOrders = useSelector((state) => state.listOfAllMyOrders);
  const {
    loading: loadingAllMyOrders,
    error: errorOfMyOrders,
    allMyOrders,
  } = listOfAllMyOrders;

  useEffect(() => {
    if (!UserInfo) history.push("/login");
    else {
      if (!USER.name) {
        dispatch(getUserDetails("profile"));
        dispatch(OrderMyAll_Action());
      } else {
        console.log(USER.name);
        setName(USER.name);
        setEmail(USER.email);
      }
    }
  }, [dispatch, history, UserInfo, USER]); //useEffect will be fired off when there is any change in these attributes.

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpass) setMsg("Password doesn't match!");
    else {
      //DISPATCH Updated PROFILE
      dispatch(UserUpdateProfile({ id: USER._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={4} sm={12} xs={12}>
        <h1 className="cartHead headingGap">Profile</h1>

        {msg && <Mess variant="danger">{msg}</Mess>}
        {error && <Mess variant="danger">{error}</Mess>}
        {success && <Mess variant="success">Profile Updated</Mess>}
        {loading && <Load />}

        <Form
          onSubmit={submitHandler}
          id="login_form"
          style={{ paddingBottom: "2rem" }}
        >
          <Form.Group controlId="name" style={{ marginBottom: "1.4rem" }}>
            <Form.Label>
              <i className="far fa-user profileIcon"></i> <b>Name</b>
            </Form.Label>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Form.Control
                className="form_box boxLength"
                type="name"
                placeholder=" name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ maxWidth: "400px" }}
              ></Form.Control>
            </div>
          </Form.Group>

          <Form.Group controlId="email" style={{ marginBottom: "1.4rem" }}>
            <Form.Label>
              <i className="fas fa-envelope profileIcon"></i>{" "}
              <b>Email Address</b>
            </Form.Label>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Form.Control
                className="form_box boxLength"
                type="email"
                placeholder=" email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ maxWidth: "400px" }}
              ></Form.Control>
            </div>
          </Form.Group>

          <Form.Group controlId="password" style={{ marginBottom: "1.4rem" }}>
            <Form.Label>
              {" "}
              <i className="fas fa-lock profileIcon"></i> <b>Password</b>
            </Form.Label>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Form.Control
                className="form_box boxLength "
                type="password"
                placeholder=" password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ maxWidth: "400px" }}
              ></Form.Control>
            </div>
          </Form.Group>

          <Form.Group controlId="confirmpassword">
            <Form.Label>
              {" "}
              <i className="far fa-check-circle profileIcon"></i>{" "}
              <b>Confirm Password</b>
            </Form.Label>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Form.Control
                className="form_box boxLength"
                type="password"
                placeholder="confirm password"
                value={confirmpass}
                onChange={(e) => setConfirmpass(e.target.value)}
                style={{ maxWidth: "400px" }}
              ></Form.Control>
            </div>
          </Form.Group>

          <div style={{ textAlign: "center" }}>
            <CustomButton type="submit" style={{ width: "40%" }}>
              Update
            </CustomButton>
          </div>
        </Form>
      </Col>

      <Col md={8} sm={11} xs={12}>
        <h1 className="cartHead headingGap"> My Orders </h1>
        {loadingAllMyOrders ? (
          <Load />
        ) : errorOfMyOrders ? (
          <Mess variant="danger">{errorOfMyOrders}</Mess>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {/* allMyOrders -> [{} , {}, {} ] array of objects */}
              {allMyOrders !== undefined &&
                allMyOrders.length > 0 &&
                allMyOrders.map((odr) => (
                  <tr key={odr._id}>
                    <td>{odr._id}</td>
                    <td>{odr.createdAt.substring(0, 10)}</td>
                    <td>₹ {odr.total_price}</td>
                    <td>
                      {odr.isPaid && odr.isPaid ? (
                        odr.paid_at.substring(0, 10)
                      ) : (
                        <div style={{ textAlign: "center" }}>
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        </div>
                      )}
                    </td>
                    <td>
                      {odr.isDelivered ? (
                        odr.delivered_at.substring(0, 10)
                      ) : (
                        <div style={{ textAlign: "center" }}>
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        </div>
                      )}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <LinkContainer to={`/order/${odr._id}`}>
                        <CustomButton
                          className="customButton neonBtn"
                          isTableButton={true}
                        >
                          Details
                        </CustomButton>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default LoginScreen;
