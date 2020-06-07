import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "../actions/auth";

const defaultState = {
  user: {},
  loginLoading: false,
  authLoading: false,
  isAuthenticated: false,
  logoutLoading: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loginLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        isAuthenticated: true,
        user: action.user,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loginLoading: false,
      };
    case AUTH_REQUEST:
      return {
        ...state,
        authLoading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        authLoading: false,
        isAuthenticated: true,
      };
    case AUTH_FAILURE:
      return {
        ...state,
        authLoading: false,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        logoutLoading: true,
      };
    case LOGOUT_SUCCESS:
      return defaultState;
    case LOGOUT_FAILURE:
      return {
        ...state,
        logoutLoading: false,
      };
    default:
      return state;
  }
};
