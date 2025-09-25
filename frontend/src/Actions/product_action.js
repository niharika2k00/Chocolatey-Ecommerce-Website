import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
} from "../Constants/Product_constant.js";
import API_URL from "../config.js";

// dispatch() is the method used to dispatch actions and trigger state changes to the store.
export const Listproducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(`${API_URL}/api/products`); // destructure - frm the prev homescreen
    console.log("successafter");

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const Detailsproducts = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`${API_URL}/api/products/${id}`); // returns obj{} from the backend
    console.log("successafter");

    dispatch({
      // TRUE
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProductAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const {
      user_Login: { UserInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: ` Bearer ${UserInfo.token}`,
      },
    };

    await axios.delete(`${API_URL}/api/products/${id}`, config); // from user_controller backend

    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProductAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    const {
      user_Login: { UserInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: ` Bearer ${UserInfo.token}`,
      },
    };

    // now pointer goto product_routes backend to create a new product -> product_controller backend
    const { data } = await axios.post(`${API_URL}/api/products`, {}, config);

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProductAction = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const {
      user_Login: { UserInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: ` Bearer ${UserInfo.token}`,
      },
    };

    // now goto product_routes backend to update a product -> product_controller
    const { data } = await axios.put(
      `${API_URL}/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProductReviewAction =
  (productId, reviewObj) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

      const {
        user_Login: { UserInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${UserInfo.token}`,
        },
      };

      await axios.post(
        `${API_URL}/api/products/${productId}/reviews`,
        reviewObj,
        config
      );

      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
