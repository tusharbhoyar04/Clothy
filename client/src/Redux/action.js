import axios from "axios";
import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_MENS_DATA,
  GET_MENS_REQUEST,
  GET_MENS_ERROR,
  GET_WOMENS_REQUEST,
  GET_WOMENS_DATA,
  GET_WOMENS_ERROR,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_ERROR,
  ADD_TO_WISHLIST_REQUEST,
  ADD_TO_WISHLIST_SUCCESS,
  ADD_TO_WISHLIST_ERROR,
  DELETE_FROM_CART_ERROR,
  DELETE_FROM_CART_SUCCESS,
  DELETE_FROM_CART_REQUEST,
  GET_FROM_CART_REQUEST,
  GET_FROM_CART_SUCCESS,
  GET_FROM_CART_ERROR,
  GET_FROM_WISHLIST_REQUEST,
  GET_FROM_WISHLIST_SUCCESS,
  GET_FROM_WISHLIST_ERROR,
  DELETE_FROM_WISHLIST_REQUEST,
  DELETE_FROM_WISHLIST_SUCCESS,
  DELETE_FROM_WISHLIST_ERROR,
  GET_ALL_MENS_DATA,
  GET_ALL_WOMENS_DATA,
} from "./actionType";

const axiosAuth = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    headers: {
      'Authorization': token
    }
  });
}

export const loginUser = (email, password, toast) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING });
  try {
    const response = await axios.post("https://clothy-7fcq.onrender.com/login", { email, password });
    const user = response.data.user;
    
    if (user) {
      localStorage.setItem("User", JSON.stringify(user));
      localStorage.setItem("token", response.data.token);
      console.log(user);
      dispatch({ type: LOGIN_SUCCESS , payload:user});
      toast({
        title: "Login Successful",
        description: "You're now logged in.",
        position: 'top',
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      dispatch({ type: LOGIN_FAIL });
      toast({
        title: "Account not found",
        description: "Please check your credentials and try again.",
        position: 'top',
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAIL });
    toast({
      title: "An error occurred.",
      description: error.response?.data?.message || "Unable to log in. Please try again later.",
      status: "error",
      position: 'top',
      duration: 3000,
      isClosable: true,
    });
  }
};

export const registerUser = (formData, toast) => async (dispatch) => {
  dispatch({ type: REGISTER_LOADING });
  try {
    const response = await axios.post('https://clothy-7fcq.onrender.com/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    dispatch({ type: REGISTER_SUCCESS });
    toast({
      title: "Registration successful!",
      description: "You can now log in.",
      position: 'top',
      status: "success",
      duration: 3000,
      isClosable: true,
    });

  } catch (error) {
    dispatch({ type: REGISTER_FAIL });
    toast({
      title: "Registration Unsuccessful!",
      description: error.response?.data?.message || "Please check your details and try again.",
      position: 'top',
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
}

export const getMensData = (page = 1, filter = "", sort = "") => async (dispatch) => {
  dispatch({ type: GET_MENS_REQUEST });
  let queryParams = [];
  if (filter) queryParams.push(`category=${encodeURIComponent(filter)}`);
  if (sort) { queryParams.push(`sort=${encodeURIComponent(sort)}`) }
  queryParams.push(`page=${page}&limit=12`);

  const queryString = queryParams.join("&");
  try {
    const res = await axios.get(`http://localhost:8080/mens?${queryString}`);
    dispatch({ type: GET_MENS_DATA, payload: { data: res.data.products, totalMens: res.data.total} });
  } catch (err) {
    dispatch({ type: GET_MENS_ERROR });
  }
};

export const getAllMensData = () => async (dispatch) => {
  dispatch({ type: GET_MENS_REQUEST });
  try {
    const res = await axios.get(`http://localhost:8080/mens/all`);
    dispatch({ type: GET_ALL_MENS_DATA, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_MENS_ERROR });
  }
};

export const getWomensData = (page = 1, filter = "", sort = "") => async (dispatch) => {
  dispatch({ type: GET_WOMENS_REQUEST });
  let queryParams = [];
  if (filter) queryParams.push(`category=${encodeURIComponent(filter)}`);
  if (sort) { queryParams.push(`sort=${encodeURIComponent(sort)}`) }
  queryParams.push(`page=${page}&limit=12`);

  const queryString = queryParams.join("&");
  try {
    const res = await axios.get(`http://localhost:8080/womens?${queryString}`);
    dispatch({ type: GET_WOMENS_DATA, payload: { data: res.data.products, totalWoMens: res.data.total}});
  } catch (err) {
    dispatch({ type: GET_WOMENS_ERROR });
  }
};

export const getAllWomensData = () => async (dispatch) => {
  dispatch({ type: GET_WOMENS_REQUEST });
  try {
    const res = await axios.get(`http://localhost:8080/womens/all`);
    dispatch({ type: GET_ALL_WOMENS_DATA, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_WOMENS_ERROR });
  }
};

export const addToCart = (obj) => async (dispatch) => {
  console.log(obj);
  dispatch({ type: ADD_TO_CART_REQUEST });
  try {
    const authAxios = axiosAuth();
    const res = await authAxios.post(`http://localhost:8080/cart`,(obj));
    dispatch({ type: ADD_TO_CART_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: ADD_TO_CART_ERROR, payload: err.response?.data?.message });
  }
};

export const getCarts = (userId) => async (dispatch) => {
  dispatch({ type: GET_FROM_CART_REQUEST });
  try {
    const authAxios = axiosAuth();
    const res = await authAxios.get(`http://localhost:8080/cart/${userId}`);
    dispatch({ type: GET_FROM_CART_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_FROM_CART_ERROR, payload: err.response?.data?.message });
  }
};

export const deleteFromCart = (_id, userId) => async (dispatch) => {
  dispatch({ type: DELETE_FROM_CART_REQUEST });
  try {
    await axios.delete(`https://clothy-api.onrender.com/cart/${_id}`);
    getCarts(userId)(dispatch);
    dispatch({ type: DELETE_FROM_CART_SUCCESS });
  } catch (err) {
    dispatch({ type: DELETE_FROM_CART_ERROR, payload: err.response?.data?.message });
  }
};

export const addToWishlist = (obj) => async (dispatch) => {
  console.log(obj);
  dispatch({ type: ADD_TO_WISHLIST_REQUEST });
  try {
    const authAxios = axiosAuth();
    const res = await authAxios.post(`http://localhost:8080/wishlist`,(obj));
    console.log(res.data);
    dispatch({ type: ADD_TO_WISHLIST_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: ADD_TO_WISHLIST_ERROR });
  }
};

export const getWishlists = (userId) => async (dispatch) => {
  dispatch({ type: GET_FROM_WISHLIST_REQUEST });
  try {
    const authAxios = axiosAuth();
    const res = await authAxios.get(`http://localhost:8080/wishlist/${userId}`);
    dispatch({ type: GET_FROM_WISHLIST_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_FROM_WISHLIST_ERROR, payload: err.response?.data?.message });
  }
};

export const deleteFromWishlist = (id, userId) => async (dispatch) => {
  dispatch({ type: DELETE_FROM_WISHLIST_REQUEST });
  try {
    await axios.delete(`https://clothy-api.onrender.com/wishlist/${id}`);
    getWishlists(userId)(dispatch);
    dispatch({ type: DELETE_FROM_WISHLIST_SUCCESS });
  } catch (err) {
    dispatch({ type: DELETE_FROM_WISHLIST_ERROR, payload: err.response?.data?.message });
  }
};