import {
  ACTIVATION_SUCCESS,
  ACTIVATION_FAILED,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAILED,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAILED,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
} from "../actions/types";

import { API } from "../../axiosInstance";

// Check Authentictaion of Users, When user again loggedIn after some times.
export const checkAuthentication = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem("access") });

    try {
      const result = await API.post("/auth/jwt/verify/", body, config);

      if (result.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
        return true;
      } else {
        dispatch({
          type: AUTHENTICATED_FAILED,
        });
        return false;
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAILED,
      });
      return false;
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAILED,
    });
    return false;
  }
};

// Register a New Account for user
export const signup = (email, name, password, re_password) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, name, password, re_password });

    try {
      const result = await API.post("/auth/users/", body, config);

      const statusCode = result.status;

      if (statusCode === 201) {
        const { status, statusText } = result;
        const res = { status, statusText };
        dispatch({
          type: SIGNUP_SUCCESS,
        });
        return res;
      } else {
        const { status, statusText, data } = result.response;
        const res = { status, statusText, data };

        dispatch({
          type: SIGNUP_FAILED,
        });
        return res;
      }
    } catch (err) {
      const { status, statusText, data } = err.response;

      const res = { status, statusText, data };
      dispatch({
        type: SIGNUP_FAILED,
      });
      return res;
    }
};

// Activate a user account
export const activate = (uid, token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ uid, token });

  try {
    const response = await API.post("/auth/users/activation/", body, config);

    if (response.status === 204) {
      dispatch({
        type: ACTIVATION_SUCCESS,
      });
      return response.status;
    } else {
      dispatch({
        type: ACTIVATION_FAILED,
      });
      return false;
    }
  } catch (err) {
    dispatch({
      type: ACTIVATION_FAILED,
    });
    return false;
  }
};

// Login the existing user account
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const result = await API.post("/auth/jwt/create/", body, config);
    const statusCode = result.status;

    if (statusCode === 200) {
      const { status, statusText } = result;
      const res = { status, statusText };
      dispatch({
        type: LOGIN_SUCCESS,
        payload: result.data,
      });

      dispatch(loadUser());
      return res;
    } else {
      const { status, statusText, data } = result.response;
      const res = { status, statusText, data };

      dispatch({
        type: LOGIN_FAILED,
      });
      return res;
    }
  } catch (err) {
    const { status, statusText, data } = err.response;

    const res = { status, statusText, data };
    dispatch({
      type: LOGIN_FAILED,
    });
    return res;
  }
};

// Get User data after loggedIn
export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    try {
      const result = await API.get("/auth/users/me/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      });

      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: result.data,
      });
    } catch (err) {
      dispatch({
        type: LOAD_USER_FAILED,
      });
    }
  } else {
    dispatch({
      type: LOAD_USER_FAILED,
    });
  }
};

// Logout of user account
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

// Get reset password link of the user account
export const reset_password = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });

  try {
    await API.post("/auth/users/reset_password/", body, config);

    dispatch({
      type: PASSWORD_RESET_SUCCESS,
    });
    return true;
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_FAILED,
    });
    return false;
  }
};

// Reset the new password of user account
export const reset_password_confirm =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ uid, token, new_password, re_new_password });
    try {
      await API.post("/auth/users/reset_password_confirm/", body, config);

      dispatch({
        type: PASSWORD_RESET_CONFIRM_SUCCESS,
      });
      return true;
    } catch (err) {
      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAILED,
      });
      console.log(err.response);
      return false;
    }
  };
