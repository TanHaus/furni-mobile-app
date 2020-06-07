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

const requestCreateUser = () => {
  return {
    type: CREATE_USER_REQUEST,
  };
};

const receiveCreateUser = () => {
  return {
    type: CREATE_USER_SUCCESS,
  };
};

const errorCreateUser = () => {
  return {
    type: CREATE_USER_FAILURE,
  };
};

const getUsers = () => {
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

const requestEditUser = () => {
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

const deleteUserLoading = () => {
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

export const createUser = ({ name, email, password }) => (dispatch) => {
  const payload = { name, email, password };
  const requestUrl = "http://localhost:4000/users";
  dispatch(requestCreateUser());
  fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((resJson) => {
      if (resJson.success) {
        dispatch(receiveCreateUser());
      } else {
        dispatch(errorCreateUser());
      }
    });
};

export const editUser = ({ name, email, password, profilePicUrl }) => (
  dispatch
) => {
  const payload = { name, email, password, profilePicUrl };
  const requestUrl = "http://localhost:4000/users";
  dispatch(requestEditUser());
  fetch(requestUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((resJson) => {
      if (resJson.success) {
        dispatch(editUserSuccess(resJson.data[0]));
      } else {
        dispatch(editUserFailure());
      }
    })
    .catch(function () {
      dispatch(editUserFailure());
    });
};

export const deleteUser = (userId) => (dispatch) => {
  const requestUrl = `http://localhost:4000/users/${userId}`;
  dispatch(deleteUserLoading());
  fetch(requestUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((resJson) => {
      if (resJson.success) {
        dispatch(deleteUserSuccess(userId));
      } else {
        dispatch(deleteUserFailure());
      }
    })
    .catch(() => {
      dispatch(deleteUserFailure());
    });
};
