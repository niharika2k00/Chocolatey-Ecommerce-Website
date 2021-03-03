
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM
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
            console.log(action.payload);
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload) //action.payload contains the ID of the element whose deleted BTN is pressed
            }
        default:
            return state;
    }
}