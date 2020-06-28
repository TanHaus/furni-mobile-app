import { renewToken } from "./auth";
export const CREATE_USER_REQUEST = "CREATE_USER_REQUEST";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";
export const GET_USERS_REQUEST = "GET_USERS_REQUEST";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILURE = "GET_USERS_FAILURE";
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";
export const EDIT_USER_REQUEST = "EDIT_USER_REQUEST";
export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS";
export const EDIT_USER_FAILURE = "EDIT_USER_FAILURE";
export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";
export const GET_USER_LISTINGS_REQUEST = "GET_USER_LISTINGS_REQUEST";
export const GET_USER_LISTINGS_SUCCESS = "GET_USER_LISTINGS_SUCCESS";
export const GET_USER_LISTINGS_FAILURE = "GET_USER_LISTINGS_FAILURE";

const createUserRequest = () => {
  return {
    type: CREATE_USER_REQUEST,
  };
};

const createUserSuccess = () => {
  return {
    type: CREATE_USER_SUCCESS,
  };
};

const createUserFailure = () => {
  return {
    type: CREATE_USER_FAILURE,
  };
};

const getUsersRequest = () => {
  return {
    type: GET_USERS_REQUEST,
  };
};

const getUsersSuccess = (users) => {
  return {
    type: GET_USERS_SUCCESS,
    users,
  };
};

const getUsersFailure = () => {
  return {
    type: GET_USERS_FAILURE,
  };
};

const getUserRequest = () => {
  return {
    type: GET_USER_REQUEST,
  };
};

const getUserSuccess = (user) => {
  return {
    type: GET_USER_SUCCESS,
    user,
  };
};

const getUserFailure = () => {
  return {
    type: GET_USER_FAILURE,
  };
};

const editUserRequest = () => {
  return {
    type: EDIT_USER_REQUEST,
  };
};

const editUserSuccess = (editedUser) => {
  return {
    type: EDIT_USER_SUCCESS,
    editedUser,
  };
};

const editUserFailure = () => {
  return {
    type: EDIT_USER_FAILURE,
  };
};

const deleteUserRequest = () => {
  return {
    type: DELETE_USER_REQUEST,
  };
};

const deleteUserSuccess = (userToDelete) => {
  return {
    type: DELETE_USER_SUCCESS,
  };
};

const deleteUserFailure = () => {
  return {
    type: DELETE_USER_FAILURE,
  };
};

const getUserListingsRequest = () => {
  return {
    type: GET_USER_LISTINGS_REQUEST,
  };
};

const getUserListingsSuccess = (userListings) => {
  return {
    type: GET_USER_LISTINGS_SUCCESS,
    userListings,
  };
};

const getUserListingsFailure = () => {
  return {
    type: GET_USER_LISTINGS_FAILURE,
  };
};

export const getUser = (userId) => async (dispatch, getState) => {
  const requestUrl = `http://10.0.2.2:4000/users/${userId}`;
  const makeRequest = () =>
    fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.token.access_token,
      },
    }).then((response) => response.json());
  dispatch(getUserRequest());
  try {
    let response = await makeRequest();
    if (response.success) dispatch(getUserSuccess(response.data));
    else if (response.message === "Expired access token") {
      await dispatch(renewToken());
      response = await makeRequest();
      if (response.success) dispatch(getUserSuccess(response.data));
      else throw "e";
    } else throw "e";
  } catch (e) {
    dispatch(getUserFailure());
  }
};

export const createUser = ({ name, email, password }) => async (dispatch) => {
  const requestUrl = "http://10.0.2.2:4000/users";
  const payload = { name, email, password };
  const makeRequest = () =>
    fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((response) => response.json());
  dispatch(createUserRequest());
  try {
    const response = await makeRequest();
    if (response.success) dispatch(createUserSuccess());
    else throw "e";
  } catch (e) {
    dispatch(createUserFailure());
  }
};

export const editUser = ({ name, email, profilePicUrl }) => async (
  dispatch,
  getState
) => {
  const userId = getState().auth.user.userId;
  const requestUrl = `http://10.0.2.2:4000/users/${userId}`;
  const payload = { name, email, profilePicUrl };
  const makeRequest = () =>
    fetch(requestUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.token.access_token,
      },
      body: JSON.stringify(payload),
    }).then((response) => response.json());
  dispatch(editUserRequest());
  try {
    let response = await makeRequest();
    if (response.success) dispatch(editUserSuccess(payload));
    else if (response.message === "Expired access token") {
      await dispatch(renewToken());
      response = await makeRequest();
      if (response.success) dispatch(editUserSuccess());
      // need to update store with updated data
      else throw "e";
    } else throw "e";
  } catch (e) {
    dispatch(editUserFailure());
  }
};

export const deleteUser = () => async (dispatch, getState) => {
  const userId = getState().auth.user.userId;
  const requestUrl = `http://10.0.2.2:4000/users/${userId}`;
  dispatch(deleteUserRequest());
  const makeRequest = () =>
    fetch(requestUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.token.access_token,
      },
    }).then((response) => response.json());
  try {
    let response = await makeRequest();
    if (response.success) dispatch(deleteUserSuccess());
    else if (response.message === "Expired access token") {
      await dispatch(renewToken());
      response = await makeRequest();
      if (response.success) dispatch(deleteUserSuccess());
      else throw "e";
    } else throw "e";
  } catch (e) {
    dispatch(deleteUserFailure());
  }
};

export const getUserListings = (userId) => async (dispatch, getState) => {
  const requestUrl = `http://10.0.2.2:4000/users/${
    userId || getState().auth.user.userId
  }/listings`;
  const makeRequest = () =>
    fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.token.access_token,
      },
    }).then((response) => response.json());
  dispatch(getUserListingsRequest());
  try {
    let response = await makeRequest();
    if (response.success) dispatch(getUserListingsSuccess(response.data));
    else if (response.message === "Expired access token") {
      await dispatch(renewToken());
      response = await makeRequest();
      if (response.success) dispatch(getUserListingsSuccess(response.data));
      else throw "e";
    } else throw "e";
  } catch (e) {
    dispatch(getUserListingsFailure());
  }
};
