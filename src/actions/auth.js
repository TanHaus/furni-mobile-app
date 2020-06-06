export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

const requestLogin = () => {
  return {
    type: LOGIN_REQUEST
  };
};

const receiveLogin = user => {
  return {
    type: LOGIN_SUCCESS,
    user
  };
};

const loginError = () => {
  return {
    type: LOGIN_FAILURE
  };
};

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST
  };
};

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

const logoutError = () => {
  return {
    type: LOGOUT_FAILURE
  };
};

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST
  };
};

const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS
  };
};

export const loginUser = ({email, password}) => dispatch => {
  const requestUrl = 'http://localhost:4000/login';
  const payload = {
    email,
    password
  };
  fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
    .then(response => {
      dispatch(requestLogin());
      response.json().then(response => {
        console.log(response);
        if (response.success && response.data.accessToken) {
          dispatch(receiveLogin(response.data.user));
        } else {
          dispatch(loginError());
        }
      })
    })
    .catch(err => {
      dispatch(loginError());
    });
};

// export const verifyAuth = () => dispatch => {
//   try {
//     if (cookies.get("token")) {
//       dispatch(verifyRequest());
//       dispatch(verifySuccess());
//     } else {
//       dispatch(receiveLogout());
//     }
//   } catch (err) {
//     // throw err
//   }
// };
