

import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
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





