const jwtDecode = require("jwt-decode");

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
export const RENEW_TOKEN_REQUEST = "RENEW_TOKEN_REQUEST";
export const RENEW_TOKEN_SUCCESS = "RENEW_TOKEN_SUCCESS";
export const RENEW_TOKEN_FAILURE = "RENEW_TOKEN_FAILURE";

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const loginSuccess = ({ token, user }) => {
  return {
    type: LOGIN_SUCCESS,
    token,
    user,
  };
};

const loginFailure = () => {
  return {
    type: LOGIN_FAILURE,
  };
};

const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

const logoutFailure = () => {
  return {
    type: LOGOUT_FAILURE,
  };
};

const renewTokenRequest = () => {
  return {
    type: RENEW_TOKEN_REQUEST,
  };
};

const renewTokenSuccess = (token) => {
  return {
    type: RENEW_TOKEN_SUCCESS,
    token,
  };
};

const renewTokenFailure = () => {
  return {
    type: RENEW_TOKEN_FAILURE,
  };
};

export const loginUser = ({ email, password }) => async (dispatch) => {
  const requestUrl = "http://10.0.2.2:4000/login";
  const payload = {
    email,
    password,
  };
  dispatch(loginRequest());
  try {
    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((response) => response.json());
    if (
      response.success &&
      response.data.access_token &&
      response.data.refresh_token
    ) {
      const decoded = jwtDecode(response.data.access_token);
      const { userId, role } = decoded;
      dispatch(loginSuccess({ token: response.data, user: { userId, role } }));
    } else {
      dispatch(loginFailure());
    }
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logoutUser = () => async (dispatch, getState) => {
  const refreshTokenUrl = "http://10.0.2.2:4000/login/refreshToken";
  const payload = JSON.stringify({
    refreshToken: getState().auth.token.refresh_token,
  });
  dispatch(logoutRequest());
  try {
    const response = await fetch(refreshTokenUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    }).then((response) => response.json());
    if (response.success) {
      dispatch(logoutSuccess());
    } else {
      dispatch(logoutFailure());
    }
  } catch (err) {
    dispatch(logoutFailure());
  }
};

export const renewToken = () => async (dispatch, getState) => {
  const refreshTokenUrl = "http://10.0.2.2:4000/login/refreshToken";
  const payload = JSON.stringify({
    refreshToken: getState().auth.token.refresh_token,
  });
  dispatch(renewTokenRequest());
  try {
    const response = await fetch(refreshTokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    }).then((response) => response.json());
    if (response.success) {
      dispatch(renewTokenSuccess(response.data));
    } else throw "e";
  } catch (e) {
    dispatch(renewTokenFailure());
  }
};
