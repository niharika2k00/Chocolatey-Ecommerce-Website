
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS
} from '../Constants/Cart_constant.js';

export const cartReducer = (state = { cartItems: [] }, action) => {

    switch (action.type) {
        case CART_ADD_ITEM:
            {
                const item = action.payload; //the item on which we have clicked for ADDTOCART
                console.log("item = ", item);

                const existItem = state.cartItems.find(x => x.product === item.product) //(x.product = ID)If any items exsist previously
                // console.log(existItem); // current item info

                if (existItem)
                    return {
                        ...state,
                        cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                    }
                else
                    return {
                        ...state,
                        cartItems: [...state.cartItems, item]
                    }
            }


        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload) //action.payload contains the ID of the element whose deleted BTN is pressed
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            // console.log(action);
            return {
                ...state,
                shippingAddress: action.payload
            }

        case CART_SAVE_PAYMENT_METHOD:         
            console.log("paymentMethod = ", action.payload); // PayPal_______ as the action is the full {}obj
            return {
                ...state,
                paymentMethod: action.payload
            }


        default:
            return state;
    }
}