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
  GET_USER_LISTINGS_REQUEST,
  GET_USER_LISTINGS_SUCCESS,
  GET_USER_LISTINGS_FAILURE,
  GET_USER_PREFERENCES_REQUEST,
  GET_USER_PREFERENCES_SUCCESS,
  GET_USER_PREFERENCES_FAILURE,
  EDIT_USER_PREFERENCES_REQUEST,
  EDIT_USER_PREFERENCES_SUCCESS,
  EDIT_USER_PREFERENCES_FAILURE,
} from "../actions/users";
import { LOGOUT_SUCCESS } from "../actions/auth";

const defaultState = {
  users: [],
  user: {},
  userListings: [],
  userPreferences: [],
  createUserLoading: false,
  getUsersLoading: false,
  getUserLoading: false,
  editUserLoading: false,
  deleteUserLoading: false,
  getUserListingsLoading: false,
  getUserPreferencesLoading: false,
  editUserPreferencesLoading: false,
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
      return {
        ...state,
        getUserLoading: false,
        user: action.user,
      };
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
      return {
        ...state,
        editUserLoading: false,
        user: action.editedUser,
      };
    case DELETE_USER_REQUEST:
      return {
        ...state,
        deleteUserLoading: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        deleteUserLoading: false,
        user: {},
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        deleteUserLoading: false,
      };
    case GET_USER_LISTINGS_REQUEST:
      return {
        ...state,
        getUserListingsLoading: true,
      };
    case GET_USER_LISTINGS_SUCCESS:
      return {
        ...state,
        userListings: action.userListings,
        getUserListingsLoading: false,
      };
    case GET_USER_LISTINGS_FAILURE:
      return {
        ...state,
        getUserListingsLoading: false,
      };
    case GET_USER_PREFERENCES_REQUEST:
      return {
        ...state,
        getUserPreferencesLoading: true,
      };
    case GET_USER_PREFERENCES_SUCCESS:
      return {
        ...state,
        userPreferences: action.userPreferences,
        getUserPreferencesLoading: false,
      };
    case GET_USER_PREFERENCES_FAILURE:
      return {
        ...state,
        getUserPreferencesLoading: false,
      };
    case GET_USER_PREFERENCES_REQUEST:
      return {
        ...state,
        editUserPreferencesLoading: true,
      };
    case GET_USER_PREFERENCES_SUCCESS:
      return {
        ...state,
        userPreferences: action.userPreferences,
        editUserPreferencesLoading: false,
      };
    case GET_USER_PREFERENCES_FAILURE:
      return {
        ...state,
        editUserPreferencesLoading: false,
      };
    case LOGOUT_SUCCESS:
      return defaultState;
    default:
      return state;
  }
};
