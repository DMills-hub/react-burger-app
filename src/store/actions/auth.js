import {
  AUTH_START,
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SET_AUTH_REDIRECT_PATH,
} from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: AUTH_SUCCESS,
    payload: {
      token: token,
      userId: userId,
    },
  };
};

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    payload: {
      error: error,
    },
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return async (dispatch) => {
    // Authenticate User...
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    try {
      let url =
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_DB_TOKEN}`;
      if (!isSignUp) {
        url =
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_DB_TOKEN}`;
      }
      const res = await axios.post(url, authData);

      const expirationDate = new Date(
        new Date().getTime() + res.data.expiresIn * 1000
      );
      localStorage.setItem("token", res.data.idToken);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("userId", res.data.localId);
      dispatch(authSuccess(res.data.idToken, res.data.localId));
      dispatch(checkAuthTimeout(res.data.expiresIn));
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    payload: {
      path: path,
    },
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) /1000
          )
        );
      }
    }
  };
};
