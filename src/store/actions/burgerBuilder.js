import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  INIT_INGREDIENTS,
  FETCH_INGREDIENTS_FAILED
} from "./actionTypes";
import AxiosOrders from "../../axios-orders";

export const removeIngredient = (name) => {
  return {
    type: REMOVE_INGREDIENT,
    payload: {
      igName: name,
    },
  };
};

export const addIngredient = (name) => {
  return {
    type: ADD_INGREDIENT,
    payload: {
      igName: name,
    },
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: INIT_INGREDIENTS,
    payload: {
      ingredients: ingredients,
    },
  };
};

export const fetchIngredientsFailed = () => {
    return {
        type: FETCH_INGREDIENTS_FAILED
    }
}


export const initIngredients = () => {
  return async (dispatch) => {
    try {
      const { data } = await AxiosOrders.get("/ingredients.json");
      dispatch(setIngredients(data));
    } catch (err) {
      dispatch(fetchIngredientsFailed)
    }
  };
};
