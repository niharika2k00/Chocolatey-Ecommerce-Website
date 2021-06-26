
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { product_Listreducer, product_Detailsreducer, productDeleteReducer, productCreateReducer, productUpdateReducer } from './Reducers/Product_reducer.js';
import { cartReducer } from './Reducers/Cart_reducer.js';
import { User_Loginreducer, User_Registerreducer, User_Detailsreducer, User_ProfileReducer, allUsers_List, userDelete_Reducer, userUpdate_Reducer } from './Reducers/User_reducer.js';
import { orderCreate_reducer, OrderDetails_Full_reducer, OrderPay_reducer, OrderDeliver_reducer, myAllOrders_reducer, ORDER_All_reducer } from './Reducers/Order_reducer.js';



const Reducer = combineReducers({
    product_list: product_Listreducer, // as a state
    product_details: product_Detailsreducer,
    product_Delete: productDeleteReducer,
    product_Create: productCreateReducer,
    product_Update: productUpdateReducer,
    CART: cartReducer,


    user_Login: User_Loginreducer,
    user_Register: User_Registerreducer,
    user_Details: User_Detailsreducer,
    user_UpdateProfileDetails: User_ProfileReducer,
    users_List: allUsers_List,
    user_Delete: userDelete_Reducer,
    user_Update: userUpdate_Reducer,

    order_Create: orderCreate_reducer,
    order_Details: OrderDetails_Full_reducer,
    order_Pay: OrderPay_reducer,
    listOfAllMyOrders: myAllOrders_reducer,
    orders_all: ORDER_All_reducer,  // for admin to see all the orders
    order_Deliver: OrderDeliver_reducer
})


// FOR CART ITEMS
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
// const initialState = {};

// FOR LOGIN INFO
const UserInfoFromStorage = localStorage.getItem('UserInfo') ? JSON.parse(localStorage.getItem('UserInfo')) : null;

// FOR SHIPPING INFO
const ShippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};




const initialState = {
    CART: {
        cartItems: cartItemsFromStorage /* "hello" */,
        shippingAddress: ShippingAddressFromStorage
    },
    user_Login: { UserInfo: UserInfoFromStorage }
};










const middleware = [thunk];

const Store = createStore(Reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));




export default Store;