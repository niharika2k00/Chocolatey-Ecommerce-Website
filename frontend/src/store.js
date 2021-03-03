
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { product_Listreducer, product_Detailsreducer } from './Reducers/Product_reducer.js';
import { cartReducer } from './Reducers/Cart_reducer.js';
import { User_reducer } from './Reducers/User_reducer.js';


const Reducer = combineReducers({
    product_list: product_Listreducer, // as a state
    product_details: product_Detailsreducer,
    CART: cartReducer,
    userInfo: User_reducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
// const initialState = {};
const initialState = {
    CART: { cartItems: cartItemsFromStorage /* "hello" */ },
};

const middleware = [thunk];

const Store = createStore(Reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));




export default Store;