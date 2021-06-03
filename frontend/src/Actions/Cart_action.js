
import axios from 'axios';
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS
} from '../Constants/Cart_constant.js';
import backend_URL from '../backend_URL.js';




// (productID, QTY) <---- passed from the CartScreen as props
export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`${backend_URL}/api/products/${id}`)      // Item OBJ {}  added jst now to the cart
    // console.log(data)

    // ACTION PART---- dispatch
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            brand: data.brand,
            countInStock: data.countInStock,
            qty,
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



// DATA ---> full object (props)
export const SaveShippingAddress = (DATA) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: DATA
    })
    console.log("Shipping Address : " + DATA.address, DATA.city, DATA.postalCode); // destructure
    localStorage.setItem('shippingAddress', JSON.stringify(DATA))
}




export const SavePaymentMethod = (DATA) => async (dispatch) => {
    // console.log(DATA)               // PayPal
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: DATA
    })
    localStorage.setItem('paymentMethod', JSON.stringify(DATA))
}