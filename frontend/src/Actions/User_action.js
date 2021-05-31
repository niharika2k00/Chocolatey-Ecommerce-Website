
import axios from "axios";
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL
} from "../Constants/User_constant.js";
import backend_URL from "../backend_URL.js";





// LOGIN -- ACTION (already registered)
export const LogIN = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        // data ----> res.json full object{} that is passed from the user_controller
        const { data } = await axios.post(`${backend_URL}/api/users/login`, { email, password }, config); // from user_controller backend

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });
        // console.log(data)
        localStorage.setItem("UserInfo", JSON.stringify(data)); // UserInfo frm reducer.js
    }
    catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};




// LOGOUT -- ACTION
export const LogOUT = () => (dispatch) => {
    localStorage.removeItem('UserInfo');   // ERASED the info of particular user
    dispatch({ type: USER_LOGOUT })
}




// REGISTER -- ACTION
export const Register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.post(`${backend_URL}/api/users`, { name, email, password }, config); // from user_controller backend

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        });
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem("UserInfo", JSON.stringify(data)); // UserInfo frm reducer.js
    }

    catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};




//  GETUSER DETAILS TO DISPLAY IN PROFILE  ---- ACTION
export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });

        const { user_Login: { UserInfo } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: ` Bearer ${UserInfo.token}`
            },
        };

        const { data } = await axios.get(`${backend_URL}/api/users/${id}`, config); // from user_controller backend

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};




//  UPDATE IN PROFILE  ---- ACTION
export const UserUpdateProfile = (USER) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

        const { user_Login: { UserInfo } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: ` Bearer ${UserInfo.token}`
            },
        };

        const { data } = await axios.put(`${backend_URL}/api/users/profile`, USER, config); // from user_controller backend

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};