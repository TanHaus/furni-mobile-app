import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  RENEW_TOKEN_REQUEST,
  RENEW_TOKEN_SUCCESS,
  RENEW_TOKEN_FAILURE,
} from "../actions/auth";

const defaultState = {
  token: {},
  user: {},
  loginLoading: false,
  authLoading: false,
  isAuthenticated: false,
  logoutLoading: false,
  renewTokenLoading: false,
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
        token: action.token,
        user: action.user,
        loginLoading: false,
        isAuthenticated: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loginLoading: false,
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
    case RENEW_TOKEN_REQUEST:
      return {
        ...state,
        renewTokenLoading: true,
      };
    case RENEW_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.token,
        renewTokenLoading: false,
      };
    case RENEW_TOKEN_FAILURE:
      return {
        ...state,
        renewTokenLoading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
