import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  INIT_INGREDIENTS,
  FETCH_INGREDIENTS_FAILED,
} from "../actions/actionTypes";

import { updateObject } from "../../shared/utility";

const initalState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: return addIngredient(state, action);
    case REMOVE_INGREDIENT: return removeIngredient(state, action);
    case INIT_INGREDIENTS: return updateObject(state, { ingredients: action.payload.ingredients, error: false, totalPrice: 4, building: false });
    case FETCH_INGREDIENTS_FAILED: return updateObject(state, { error: true });
    default: return state;
  }
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.payload.igName]: state.ingredients[action.payload.igName] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.igName],
    building: true
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIngredient = {
    [action.payload.igName]: state.ingredients[action.payload.igName] - 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.igName],
    building: true
  };
  return updateObject(state, updatedState);
};

export default reducer;
