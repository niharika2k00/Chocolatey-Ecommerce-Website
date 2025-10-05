import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_ALL_MY_REQUEST,
  ORDER_ALL_MY_SUCCESS,
  ORDER_ALL_MY_FAIL,
  ORDERS_REQUEST,
  ORDERS_SUCCESS,
  ORDERS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from "../Constants/Order_constant.js";
import API_URL from "../config.js";

export const Create_OrderAction = (Order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const {
      user_Login: { UserInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json", // data will be send in the form of json
        Authorization: ` Bearer ${UserInfo.token}`,
      },
    };

    console.log(Order);

    // axios.post(URL , DATA that we want to send back to the server , config)
    const { data } = await axios.post(`${API_URL}/api/orders`, Order, config); // from user_controller backend
    console.log(data);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const GetOrderDetails_ByID = (ID) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const {
      user_Login: { UserInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: ` Bearer ${UserInfo.token}`,
      },
    };

    // axios.post(URL , DATA that we want to send back to the server , config)
    const { data } = await axios.get(`${API_URL}/api/orders/${ID}`, config); // from user_controller backend
    console.log(data); // Payload Object Printing

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// ---------------------------------------
// For PAYMENT - PAYPAL HANDLING ACTION ----->
// ---------------------------------------
export const OrderPay_Action =
  (ORDER_ID, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST });
      const {
        user_Login: { UserInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json", // data will be send in the form of json
          Authorization: ` Bearer ${UserInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${API_URL}/api/orders/${ORDER_ID}/pay`,
        paymentResult,
        config
      ); // from user_controller backend
      console.log(data);

      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// For Delivery Products handling Action  ---  by the ADMIN
export const OrderDeliver_Action = (ORDER) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVER_REQUEST });
    const {
      user_Login: { UserInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json", // data will be send in the form of json
        Authorization: ` Bearer ${UserInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${API_URL}/api/orders/${ORDER._id}/deliver`,
      {},
      config
    ); // from user_controller backend
    console.log(data);

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const OrderMyAll_Action = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_ALL_MY_REQUEST });
    const {
      user_Login: { UserInfo },
    } = getState();
    const config = {
      headers: { Authorization: ` Bearer ${UserInfo.token}` },
    };

    const { data } = await axios.get(`${API_URL}/api/orders/myorders`, config); // from user_controller backend
    console.log(data); //  [{} {} {} {}]

    dispatch({
      type: ORDER_ALL_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_ALL_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const Order_All_Action = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDERS_REQUEST });
    const {
      user_Login: { UserInfo },
    } = getState();
    const config = {
      headers: { Authorization: `Bearer ${UserInfo.token}` },
    };

    const { data } = await axios.get(`${API_URL}/api/orders`, config); // from user_controller backend
    console.log("all orders:", data); // [{} {} {} {}]

    dispatch({
      type: ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
