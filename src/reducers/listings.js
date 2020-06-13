import {
  CREATE_LISTING_REQUEST,
  CREATE_LISTING_SUCCESS,
  CREATE_LISTING_FAILURE,
  GET_USER_LISTINGS_REQUEST,
  GET_USER_LISTINGS_SUCCESS,
  GET_USER_LISTINGS_FAILURE,
  GET_LISTING_REQUEST,
  GET_LISTING_SUCCESS,
  GET_LISTING_FAILURE,
  EDIT_LISTING_REQUEST,
  EDIT_LISTING_SUCCESS,
  EDIT_LISTING_FAILURE,
  DELETE_LISTING_REQUEST,
  DELETE_LISTING_SUCCESS,
  DELETE_LISTING_FAILURE,
} from "../actions/listings";

const defaultState = {
  userListings: [],
  searchListings: [],
  listing: {},
  createListingLoading: false,
  getUserListingsLoading: false,
  getSearchListingsLoading: false,
  getListingLoading: false,
  editListingLoading: false,
  deleteListingLoading: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
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
    case CREATE_LISTING_REQUEST:
      return {
        ...state,
        createListingLoading: true,
      };
    case CREATE_LISTING_SUCCESS:
      return {
        ...state,
        createListingLoading: false,
      };
    case CREATE_LISTING_FAILURE:
      return {
        ...state,
        createListingLoading: false,
      };
    case GET_LISTING_REQUEST:
      return {
        ...state,
        getListingLoading: true,
      };
    case GET_LISTING_SUCCESS:
      return {
        ...state,
        listing: action.listing,
        getListingLoading: false,
      };
    case GET_LISTING_FAILURE:
      return {
        ...state,
        getListingLoading: false,
      };
    case EDIT_LISTING_REQUEST:
      return {
        ...state,
        editListingLoading: true,
      };
    case EDIT_LISTING_SUCCESS:
      return {
        ...state,
        listing: action.listing,
        editListingLoading: false,
      };
    case EDIT_LISTING_FAILURE:
      return {
        ...state,
        editListingLoading: false,
      };
    case DELETE_LISTING_REQUEST:
      return {
        ...state,
        deleteListingLoading: true,
      };
    case DELETE_LISTING_SUCCESS:
      return {
        ...state,
        listing: {},
        deleteListingLoading: false,
      };
    case DELETE_LISTING_FAILURE:
      return {
        ...state,
        deleteListingLoading: false,
      };
    default:
      return state;
  }
};
