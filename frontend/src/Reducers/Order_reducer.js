

import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    ORDER_ALL_MY_REQUEST,
    ORDER_ALL_MY_SUCCESS,
    ORDER_ALL_MY_FAIL,
    ORDER_ALL_MY_RESET,
    ORDERS_REQUEST,
    ORDERS_SUCCESS,
    ORDERS_FAIL,
    ORDERS_RESET,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET,
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

        case ORDER_CREATE_RESET:
            return {}
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





export const myAllOrders_reducer = (state = { allMyOrders: [] }, action) => {
    switch (action.type) {
        case ORDER_ALL_MY_REQUEST:
            return { loading: true }

        case ORDER_ALL_MY_SUCCESS:
            return {
                loading: false,
                success: true,
                allMyOrders: action.payload
            }

        case ORDER_ALL_MY_FAIL:
            return { loading: false, error: action.payload }

        case ORDER_ALL_MY_RESET:
            return { allMyOrders: [] }
        default:
            return state;
    }
}




// ------------      For the order list       -------------
export const ORDER_All_reducer = (state = { Order_All: [] }, action) => {
    switch (action.type) {
        case ORDERS_REQUEST:
            return { loading: true }

        case ORDERS_SUCCESS:
            return {
                loading: false,
                success: true,
                Order_All: action.payload
            }

        case ORDERS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state;
    }
}




// For deliver materials to the customer -----------    admin can handle the delivery option
export const OrderDeliver_reducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELIVER_REQUEST:
            return { loading: true }

        case ORDER_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true,
            }

        case ORDER_DELIVER_FAIL:
            return { loading: false, error: action.payload }

        case ORDER_DELIVER_RESET:
            return {}

        default:
            return state;
    }
}
