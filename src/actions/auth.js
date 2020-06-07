export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

const requestLogin = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const receiveLogin = (user) => {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
};

const errorLogin = () => {
  return {
    type: LOGIN_FAILURE,
  };
};

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

const errorLogout = () => {
  return {
    type: LOGOUT_FAILURE,
  };
};

export const loginUser = ({ email, password }) => (dispatch) => {
  const requestUrl = "http://localhost:4000/login";
  const payload = {
    email,
    password,
  };
  dispatch(requestLogin());
  fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((resJson) => {
      if (resJson.success && resJson.data.accessToken) {
        dispatch(receiveLogin(resJson.data.user));
      } else {
        dispatch(errorLogin());
      }
    })
    .catch(() => {
      dispatch(errorLogin());
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  // clear access token from AsyncStorage here
  //
  dispatch(receiveLogout());
};
