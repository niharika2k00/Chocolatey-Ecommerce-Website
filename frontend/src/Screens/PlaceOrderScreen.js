import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../Components/CheckoutSteps.js";
import { Create_OrderAction } from "../Actions/Order_action.js";
import { clearCart } from "../Actions/Cart_action.js";
import Mess from "../Components/Message.js";
import "../STYLES/placeOrderScreen.css";
import { getImageUrl } from "../utils.js";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const CART = useSelector((state) => state.CART);
  const { shippingAddress } = CART;

  if (!CART.shippingAddress.address) history.push("/shipping");
  else if (!CART.paymentMethod) history.push("/payment");

  // Calculate prices
  const Till_2_Decimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  CART.itemsPrice = Till_2_Decimals(
    CART.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  CART.shippingPrice = Till_2_Decimals(CART.itemsPrice > 500 ? 0 : 100);
  CART.taxPrice = Till_2_Decimals(Number((0.15 * CART.itemsPrice).toFixed(2))); // 15% tax
  CART.totalPrice = (
    Number(CART.itemsPrice) +
    Number(CART.shippingPrice) +
    Number(CART.taxPrice)
  ).toFixed(2);

  const order_Create = useSelector((state) => state.order_Create);
  const { Order, success, error } = order_Create;

  console.log(order_Create); // {loading,succes,Order}

  useEffect(() => {
    if (success && Order && Order._id) {
      console.log("Order created successfully, clearing cart...");
      // Clear the cart after successful order creation
      dispatch(clearCart());
      console.log("Cart cleared, redirecting to order details...");
      history.push(`/order/${Order._id}`);
    }
  }, [history, success, dispatch, Order]);

  const placeOrderHandler = () => {
    console.log("Placing order...");
    console.log("Current cart items:", CART.cartItems);
    console.log(order_Create);

    // Dispatch(send) to Action
    dispatch(
      Create_OrderAction({
        itemsPrice: CART.itemsPrice,
        orderItems: CART.cartItems,
        paymentMethod: CART.paymentMethod,
        shippingAddress: CART.shippingAddress,
        shipping_price: CART.shippingPrice,
        taxPrice: CART.taxPrice,
        total_price: CART.totalPrice,
      })
    );
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />

      <Row>
        <Col md={7} sm={12} xs={12}>
          <ListGroup variant="flush">
            <ListGroup.Item
              style={{ backgroundColor: "#1b1a1a", padding: "0rem" }}
            >
              <h2 className="orderHead"> Shipping</h2>
              <p>
                <strong style={{ fontSize: "1.05rem " }}>Address: </strong>
                <span id="Ordersubhead">
                  {CART.shippingAddress.address}, {CART.shippingAddress.city}{" "}
                  {CART.shippingAddress.postalCode},{" "}
                  {CART.shippingAddress.country} .
                </span>
              </p>
            </ListGroup.Item>

            <ListGroup.Item
              style={{ backgroundColor: "#1b1a1a", padding: "0rem" }}
            >
              <h2 className="orderHead">Payment Method</h2>
              <strong style={{ fontSize: "1.05rem " }}>Method: </strong>
              <span id="Ordersubhead">{CART.paymentMethod}</span>
            </ListGroup.Item>

            <ListGroup.Item
              style={{ backgroundColor: "#1b1a1a", padding: "0rem" }}
            >
              <h2 className="orderHead">Ordered Items</h2>
              {CART.cartItems.length === 0 ? (
                <Mess>Your cart is empty</Mess>
              ) : (
                <ListGroup variant="flush">
                  {CART.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2} sm={3} xs={3}>
                          <Image
                            src={getImageUrl(item.image)}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col md={6} sm={5} xs={5}>
                          <Link
                            to={`/product/${item.product}`}
                            className="itemDet fontWt7_4"
                          >
                            {item.name} | ({item.filling})
                          </Link>
                        </Col>

                        <Col md={4} sm={4} xs={4} className="itemDet fontWt7_4">
                          {item.qty} x {item.price} = ₹{" "}
                          {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={1}></Col>

        <Col md={4}>
          <div className="Orderbox">
            <ListGroup
              variant="flush"
              style={{ backgroundColor: "#1b1a1a", padding: "0 0 12px 0" }}
            >
              <ListGroup.Item>
                <h2 className="orderHead" style={{ textAlign: "center" }}>
                  Order Summary
                </h2>
              </ListGroup.Item>

              <ListGroup.Item id="boxsubitem">
                <Row>
                  <Col>Items</Col>
                  <Col>₹ {CART.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item id="boxsubitem">
                <Row>
                  <Col>Shipping</Col>
                  <Col>₹ {CART.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item id="boxsubitem">
                <Row>
                  <Col>Tax</Col>
                  <Col>₹ {CART.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item id="boxsubitem">
                <Row>
                  <Col>Total</Col>
                  <Col>₹ {CART.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item id="boxsubitem">
                {error && <Mess variant="danger">{error}</Mess>}
              </ListGroup.Item>

              <ListGroup.Item id="boxsubitem">
                <Button
                  type="button"
                  className="btn-block btnBasic"
                  // variant="success"
                  disabled={CART.cartItems === 0} //cartItems -> array of obj [{},{},{}]
                  onClick={placeOrderHandler}
                >
                  <b>
                    Place Order <i className="fas fa-biking"></i>
                  </b>
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
