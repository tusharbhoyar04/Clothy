import {
    LOGIN_FAIL,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_LOADING,
    REGISTER_SUCCESS,
    USER_PRESENT,
    ADD_TO_CART_ERROR,
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    GET_MENS_DATA,
    GET_MENS_ERROR,
    GET_MENS_REQUEST,
    GET_WOMENS_DATA,
    GET_WOMENS_ERROR,
    GET_WOMENS_REQUEST,
    GET_FROM_CART_REQUEST,
    GET_FROM_CART_SUCCESS,
    GET_FROM_CART_ERROR,
    DELETE_FROM_CART_REQUEST,
    DELETE_FROM_CART_SUCCESS,
    DELETE_FROM_CART_ERROR,
    ADD_TO_WISHLIST_REQUEST,
    ADD_TO_WISHLIST_SUCCESS,
    ADD_TO_WISHLIST_ERROR,
    GET_FROM_WISHLIST_REQUEST,
    GET_FROM_WISHLIST_SUCCESS,
    GET_FROM_WISHLIST_ERROR,
    DELETE_FROM_WISHLIST_ERROR,
    DELETE_FROM_WISHLIST_REQUEST,
    DELETE_FROM_WISHLIST_SUCCESS,
    GET_ALL_MENS_DATA,
    GET_ALL_WOMENS_DATA
} from './actionType';

const initialState_Login = {
    isError: false,
    isAuth: localStorage.getItem("User") ? true : false,
    userData: JSON.parse(localStorage.getItem('User')) || null,
    isLoading: false
}

const initialState_Register = {
    isError: false,
    success: false,
    isLoading: false
}

const mansInitialSate = {
    mensData: [],
    AllMensData: [],
    isError: false,
    totalMens: 0,
    isLoading: false,
}

const womansInitialSate = {
    womensData: [],
    AllWomensData: [],
    isError: false,
    totalWoMens: 0,
    isLoading: false
}

const cartInitialSate = {
    data: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
};

const wishlistInitialSate = {
    data: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
};

export const LoginReducer = (state = initialState_Login, action) => {
    switch (action.type) {
        case LOGIN_LOADING:
            return { ...state, isLoading: true, isError: false }
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, isError: false, isAuth: true,userData :action.paylaod};
        case LOGIN_FAIL:
            return { ...state, isLoading: false, isError: true }
        default:
            return state;
    }
}

export const RegisterReducer = (state = initialState_Register, action) => {
    switch (action.type) {
        case REGISTER_LOADING:
            return { ...state, isLoading: true, isError: false }
        case REGISTER_SUCCESS:
            return { ...state, isLoading: false, isError: false, success: true }
        case REGISTER_FAIL:
            return { ...state, isLoading: false, isError: true}
        default:
            return state;
    }
}

export const mensReducer = (state = mansInitialSate, action) => {
    switch (action.type) {
        case GET_MENS_REQUEST:
            return { ...state, isLoading: true }
        case GET_MENS_DATA:
            return { ...state, mensData: action.payload.data, totalMens: action.payload.totalMens, isLoading: false };
        case GET_ALL_MENS_DATA:
            return { ...state, AllMensData: action.payload, isLoading: false };
        case GET_MENS_ERROR:
            return { ...state, isError: true, isLoading: false };
        default:    
            return state;
    }
}

export const womensReducer = (state = womansInitialSate, action) => {
    switch (action.type) {
        case GET_WOMENS_REQUEST:
            return { ...state, isLoading: true }
        case GET_WOMENS_DATA:
            return { ...state, womensData: action.payload.data, totalWoMens: action.payload.totalWoMens, isLoading: false };
        case GET_ALL_WOMENS_DATA:
            return { ...state, AllWomensData: action.payload, isLoading: false };
        case GET_WOMENS_ERROR:
            return { ...state, isError: true, isLoading: false };
        default:
            return state;
    }
}

export const cartReducer = (state = cartInitialSate, action) => {
    switch (action.type) {
        case ADD_TO_CART_REQUEST:
            return { ...state, isLoading: true };
        case ADD_TO_CART_SUCCESS:
            return { ...state, data: [...state.data, action.payload], isLoading: false, isSuccess: true };
        case ADD_TO_CART_ERROR:
            return { ...state, isError: true, isLoading: false };
        case GET_FROM_CART_REQUEST:
            return { ...state, isLoading: true };
        case GET_FROM_CART_SUCCESS:
            return { ...state,data: action.payload,isLoading: false };
        case GET_FROM_CART_ERROR:
            return { ...state, isError: true, isLoading: false };
        case DELETE_FROM_CART_REQUEST:
            return { ...state, isLoading: true };
        case DELETE_FROM_CART_SUCCESS:
            return { ...state, data: state.data.filter(item => item.id !== action.payload.id), isLoading: false };
        case DELETE_FROM_CART_ERROR:
            return { ...state, isError: true, isLoading: false }
        default:
            return state;
    }
}

export const wishlistReducer = (state = wishlistInitialSate, action) => {
    switch (action.type) {
        case ADD_TO_WISHLIST_REQUEST:
            return { ...state, isLoading: true };
        case ADD_TO_WISHLIST_SUCCESS:
            return { ...state, data: [...state.data, action.payload], isLoading: false, isSuccess: true };
        case ADD_TO_WISHLIST_ERROR:
            return { ...state, isError: true, isLoading: false };
        case GET_FROM_WISHLIST_REQUEST:
            return { ...state, isLoading: true };
        case GET_FROM_WISHLIST_SUCCESS:
            return { ...state, data: action.payload, isLoading: false };
        case GET_FROM_WISHLIST_ERROR:
            return { ...state, isError: true, isLoading: false }
        case DELETE_FROM_WISHLIST_REQUEST:
            return { ...state, isLoading: true };
        case DELETE_FROM_WISHLIST_SUCCESS:
            return { ...state, data: state.data.filter(item => item.id !== action.payload.id), isLoading: false };
        case DELETE_FROM_WISHLIST_ERROR:
            return { ...state, isError: true, isLoading: false }
        default:
            return state;
    }
}
