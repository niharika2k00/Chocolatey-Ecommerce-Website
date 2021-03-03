
import axios from 'axios';
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM
} from '../Constants/Cart_constant.js';
import backend_URL from '../backend_URL.js';


export const addToCart = (id, QTY) => async (dispatch, getState) => {
    const { data } = await axios.get(`${backend_URL}/api/products/${id}`)  

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            QTY,
        }
    })

    // JSON.stringify() ---> used to convert json into string as we cannot store json object in local storage.
    // JSON.parse()  ----> To convert text into a JavaScript object.

    // localStorage.setItem(keyname, value) ------> SYNTAX
    localStorage.setItem('cartItems', JSON.stringify(getState().CART.cartItems))
}


export const removefromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })
    console.log("id of removefromCart : " + id);
    localStorage.setItem('cartItems', JSON.stringify(getState().CART.cartItems))
}