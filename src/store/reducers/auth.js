import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH } from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initalState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.payload.token,
    userId: action.payload.userId,
    error: null,
    loading: false,
  });
};


const reducer = (state = initalState, action) => {
  switch (action.type) {
    case AUTH_START: return updateObject(state, { error: null, loading: true });
    case AUTH_SUCCESS: return authSuccess(state, action);
    case AUTH_FAIL: return updateObject(state, {error: action.payload.error, loading: false});
    case AUTH_LOGOUT: return updateObject(state, {token: null, userId: null});
    case SET_AUTH_REDIRECT_PATH: return updateObject(state, {authRedirectPath: action.payload.path})
    default: return state;
  }
};

export default reducer;
