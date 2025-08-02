import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Mess from "../Components/Message.js";
import Load from "../Components/Loading.js";
import { Order_All_Action } from "../Actions/Order_action.js";

const Orders_ListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const orders_all = useSelector((state) => state.orders_all);
  const { loading, error, Order_All } = orders_all;
  console.log(Order_All);

  const user_Login = useSelector((state) => state.user_Login); //user_Login -> from the store
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
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>DETAILS</th>
            </tr>
          </thead>

          <tbody>
            {Order_All.map((order, index) => (
              <tr key={order.user._id}>
                <td>{index + 1}</td>
                <td>{order.user._id}</td>
                <td>{order.user && order.user.name}</td>
                <td> {order.createdAt.substring(0, 10)} </td>
                <td> ₹ {order.total_price} </td>
                <td>
                  {order.isPaid ? (
                    order.isPaid.substring(0, 10)
                  ) : (
                    <i
                      className="fas fa-times"
                      style={{ color: "red", fontSize: "1.5rem" }}
                    ></i>
                  )}
                </td>

                <td>
                  {order.isDelivered ? (
                    order.isDelivered.substring(0, 10)
                  ) : (
                    <i
                      className="fas fa-times"
                      style={{ color: "red", fontSize: "1.5rem" }}
                    ></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Orders_ListScreen;
