


import axios from 'axios';
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
} from '../Constants/Order_constant.js';
import backend_URL from '../backend_URL.js';



export const Create_OrderAction = (Order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });

        const { user_Login: { UserInfo } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",   // data will be send in the form of json
                Authorization: ` Bearer ${UserInfo.token}`
            },
        };

        console.log(Order)

        // axios.post(URL , DATA that we want to send back to the server , config)
        const { data } = await axios.post(`${backend_URL}/api/orders`, Order, config); // from user_controller backend
        console.log(data);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
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
        const { user_Login: { UserInfo } } = getState();
        const config = {
            headers: {
                Authorization: ` Bearer ${UserInfo.token}`
            },
        };

        // axios.post(URL , DATA that we want to send back to the server , config)
        const { data } = await axios.get(`${backend_URL}/api/orders/${ID}`, config); // from user_controller backend
        console.log(data);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};





export const OrderPay_Action = (ORDER_ID, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });
        const { user_Login: { UserInfo } } = getState();
        const config = {
            headers: {
                "Content-Type": "application/json",   // data will be send in the form of json
                Authorization: ` Bearer ${UserInfo.token}`
            },
        };


        const { data } = await axios.put(`${backend_URL}/api/orders/${ORDER_ID}`, paymentResult, config); // from user_controller backend
        console.log(data);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

