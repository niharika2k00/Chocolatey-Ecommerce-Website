

import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
} from '../Constants/Order_constant.js';



export const orderCreate_reducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true }

        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                Order: action.payload
            }

        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state;
    }
}




export const OrderDetails_Full_reducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { loading: true }

        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                success: true,
                Order: action.payload
            }

        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state;
    }
}





export const OrderPay_reducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return { loading: true }

        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true,
            }

        case ORDER_PAY_FAIL:
            return { loading: false, error: action.payload }

        case ORDER_PAY_RESET:
            return {}

        default:
            return state;
    }
}



