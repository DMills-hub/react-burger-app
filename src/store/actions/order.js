import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_INIT,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_START,
} from "./actionTypes";
import AxiosOrders from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: PURCHASE_BURGER_SUCCESS,
    payload: {
      orderId: id,
      orderData: orderData,
    },
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: PURCHASE_BURGER_FAIL,
    payload: {
      error: error,
    },
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData, token) => {
  return async (dispatch) => {
    dispatch(purchaseBurgerStart());
    try {
      const order = (
        await AxiosOrders.post(`/orders.json?auth=${token}`, orderData)
      ).data;
      dispatch(purchaseBurgerSuccess(order.name, orderData));
    } catch (error) {
      dispatch(purchaseBurgerFail(error));
    }
  };
};

export const purchaseInit = () => {
  return {
    type: PURCHASE_INIT,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: FETCH_ORDERS_SUCCESS,
    payload: {
      orders: orders,
    },
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: FETCH_ORDERS_FAIL,
    payload: {
      error: error,
    },
  };
};

export const fetchOrdersStart = () => {
  return {
    type: FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token, userId) => {
  return async (dispatch) => {
    dispatch(fetchOrdersStart());
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    try {
      const orders = (
        await AxiosOrders.get(`/orders.json${queryParams}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
      ).data;
      const fetchedOrders = [];
      for (let key in orders) {
        fetchedOrders.push({ ...orders[key], id: key });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    } catch (err) {
      dispatch(fetchOrdersFail(err));
    }
  };
};
