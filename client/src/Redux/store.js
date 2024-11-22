import {
  RegisterReducer,
  LoginReducer,
  cartReducer,
  wishlistReducer,
  womensReducer,
  mensReducer
} from "./reducer";
import { legacy_createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from "redux-thunk";

const rootReducer = combineReducers({
  mens: mensReducer,
  womens: womensReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  login: LoginReducer,
  register: RegisterReducer
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
export default store;
