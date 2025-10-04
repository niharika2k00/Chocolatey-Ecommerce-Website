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
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../Constants/User_constant.js";
import { ORDER_ALL_MY_RESET } from "../Constants/Order_constant.js";
import API_URL from "../config.js";

// LOGIN -- ACTION (already registered)
export const LogIN = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    // data ----> res.json full object{} that is passed from the user_controller
    const { data } = await axios.post(
      `${API_URL}/api/users/login`,
      { email, password },
      config
    ); // from user_controller backend

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    // console.log(data)
    localStorage.setItem("UserInfo", JSON.stringify(data)); // UserInfo frm reducer.js
  } catch (error) {
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
  localStorage.removeItem("UserInfo"); // ERASED the info of particular user
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_ALL_MY_RESET });
  dispatch({ type: USER_LIST_RESET });
};

// REGISTER -- ACTION
export const Register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `${API_URL}/api/users`,
      { name, email, password },
      config
    ); // from user_controller backend

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("UserInfo", JSON.stringify(data)); // UserInfo frm reducer.js
  } catch (error) {
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

    const {
      user_Login: { UserInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: ` Bearer ${UserInfo.token}`,
      },
    };

    const { data } = await axios.get(`${API_URL}/api/users/${id}`, config); // from user_controller backend

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
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
    const {
      user_Login: { UserInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: ` Bearer ${UserInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${API_URL}/api/users/profile`,
      USER,
      config
    ); // from user_controller backend

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data, // updated data stored into the database
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//  ALL USERS LIST  ---- ACTION (Admin Access)
export const UserAll_ListAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const {
      user_Login: { UserInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: ` Bearer ${UserInfo.token}`,
      },
    };

    const { data } = await axios.get(`${API_URL}/api/users`, config); // from user_controller backend
    console.log(data); // data gets into  allUsers: []  in the Reducer

    //  allUsers: []   <-----  action.payload(REDUCER)   <-------- payload(ACTION)   <--------- DATA
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userDeleteAction = (ID) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const {
      user_Login: { UserInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: ` Bearer ${UserInfo.token}`,
      },
    };

    const { data } = await axios.delete(`${API_URL}/api/users/${ID}`, config); // from user_controller backend

    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userUpdateAction = (userObj) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      user_Login: { UserInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: ` Bearer ${UserInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${API_URL}/api/users/${userObj._id}`,
      userObj,
      config
    ); // from user_controller backend

    dispatch({ type: USER_UPDATE_SUCCESS });
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
