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

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
  loading: true,
};

export const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("access", payload.access);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
        loading: false,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case AUTHENTICATED_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    case SIGNUP_FAILED:
    case LOGIN_FAILED:
    case LOGOUT:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    case LOAD_USER_FAILED:
      return {
        ...state,
        user: null,
        loading: false,
      };
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_FAILED:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
    case PASSWORD_RESET_CONFIRM_FAILED:
    case ACTIVATION_SUCCESS:
    case ACTIVATION_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
