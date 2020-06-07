import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from "../actions/users";
import { LOGOUT_SUCCESS } from "../actions/auth";

const defaultState = {
  users: [],
  createUserLoading: false,
  getUsersLoading: false,
  getUserLoading: false,
  editUserLoading: false,
  deleteUserLoading: false,
};

export default (state = defaultState, action) => {
  const users = [...state.users];
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return {
        ...state,
        createUserLoading: true,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        createUserLoading: false,
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        createUserLoading: false,
      };
    case GET_USERS_REQUEST:
      return {
        ...state,
        getUsersLoading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        getUsersLoading: false,
        users: action.users,
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        getUsersLoading: false,
      };
    case GET_USER_REQUEST:
      return {
        ...state,
        getUserLoading: true,
      };
    case GET_USER_SUCCESS:
      if (!users) {
        return {
          ...state,
          getUserLoading: false,
          users: [action.user],
        };
      } else {
        users[users.findIndex((user) => user.userId === action.userId)] =
          action.user;
        return {
          ...state,
          getUserLoading: false,
          users,
        };
      }
    case GET_USER_FAILURE:
      return {
        ...state,
        getUsersLoading: false,
      };
    case EDIT_USER_REQUEST:
      return {
        ...state,
        editUserLoading: true,
      };
    case EDIT_USER_FAILURE:
      return {
        ...state,
        editUserLoading: false,
      };
    case EDIT_USER_SUCCESS:
      users[users.findIndex((user) => user.userId === action.userId)] =
        action.user;
      return {
        ...state,
        editUserLoading: false,
        users,
      };
    case DELETE_USER_REQUEST:
      return {
        ...state,
        deleteUserLoading: true,
      };
    case DELETE_USER_SUCCESS:
      users.splice(
        users.findIndex((user) => user.userId === action.userId),
        1
      );
      return {
        ...state,
        deleteUserLoading: false,
        users,
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        deleteUserLoading: false,
      };
    case LOGOUT_SUCCESS:
      return defaultState;
    default:
      return state;
  }
};
