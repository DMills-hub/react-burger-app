import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_INIT,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
} from "../actions/actionTypes";

import { updateObject } from "../../shared/utility";
const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PURCHASE_INIT: return updateObject(state, { purchased: false });
    case PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
    case PURCHASE_BURGER_FAIL: return updateObject(state, { loading: false });
    case PURCHASE_BURGER_START: return updateObject(state, { loading: true });
    case FETCH_ORDERS_START: return updateObject(state, { loading: true });
    case FETCH_ORDERS_SUCCESS: return updateObject(state, { orders: action.payload.orders, loading: false });
    case FETCH_ORDERS_FAIL: return updateObject(state, { loading: false });
    default: return state;
  }
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = {
    ...action.payload,
    id: action.payload.id,
  };
  return updateObject(state, {
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true,
  });
};

export default reducer;
