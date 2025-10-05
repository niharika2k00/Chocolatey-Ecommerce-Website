import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Mess from "../Components/Message.js";
import Load from "../Components/Loading.js";
import { Order_All_Action } from "../Actions/Order_action.js";
import CustomButton from "../Components/CustomButton.js";

const OrdersListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const orders_all = useSelector((state) => state.orders_all);
  const { loading, error, Order_All } = orders_all;
  const user_Login = useSelector((state) => state.user_Login); // user_Login -> from the store
  const { UserInfo } = user_Login;

  useEffect(() => {
    if (UserInfo && UserInfo.isAdmin) dispatch(Order_All_Action());
    else history.push("/login");
  }, [dispatch, history, UserInfo]);

  return (
    <div>
      <h1 className="cartHead" style={{ paddingBottom: "2rem" }}>
        Orders
      </h1>
      {loading ? (
        <Load />
      ) : error ? (
        <Mess variant="danger">{error}</Mess>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>SL. NO.</th>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAYMENT</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>DETAILS</th>
            </tr>
          </thead>

          <tbody>
            {(Order_All && Order_All.length > 0) || Order_All !== undefined ? (
              Order_All.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order._id}</td>
                  <td>{order.user.name}</td>
                  <td> {order.createdAt.substring(0, 10)} </td>
                  <td> ₹ {order.total_price} </td>
                  <td>
                    <span
                      style={{
                        fontSize: "0.9rem",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "0.3rem",
                        backgroundColor:
                          order.paymentMethod === "Cash on Delivery"
                            ? "#ffc107"
                            : "#28a745",
                        color:
                          order.paymentMethod === "Cash on Delivery"
                            ? "#000"
                            : "#fff",
                      }}
                    >
                      {order.paymentMethod}
                    </span>
                  </td>

                  <td>
                    {order.isPaid ? (
                      order.paid_at.substring(0, 10)
                    ) : (
                      <i
                        className="fas fa-times"
                        style={{ color: "red", fontSize: "1.5rem" }}
                      ></i>
                    )}
                  </td>

                  <td>
                    {order.isDelivered ? (
                      order.delivered_at.substring(0, 10)
                    ) : (
                      <i
                        className="fas fa-times"
                        style={{ color: "red", fontSize: "1.5rem" }}
                      ></i>
                    )}
                  </td>

                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <CustomButton
                        className="customButton neonBtn"
                        isTableButton={true}
                      >
                        Details
                      </CustomButton>
                    </LinkContainer>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default OrdersListScreen;
