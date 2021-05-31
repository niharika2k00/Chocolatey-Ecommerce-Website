


import axios from 'axios';
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
} from '../Constants/Order_constant.js';
import backend_URL from '../backend_URL.js';



export const Create_OrderAction = (Order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });

        const { user_Login: { UserInfo } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: ` Bearer ${UserInfo.token}`
            },
        };

        console.log(Order)

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