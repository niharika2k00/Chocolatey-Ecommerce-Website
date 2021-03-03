
import axios from 'axios';
import { USER_LOGIN_REQUEST } from '../Constants/Product_constant.js';
import backend_URL from '../backend_URL.js';

export const Listproducts = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })

        const config = {
            headers: { 'Content-Type': 'application/json' }
        }

        const { data } = await axios.post(`/api.users/login`, { email, password }, config);




    }
    catch (error) {

    }


}