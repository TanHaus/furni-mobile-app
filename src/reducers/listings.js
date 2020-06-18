import {
  CREATE_LISTING_REQUEST,
  CREATE_LISTING_SUCCESS,
  CREATE_LISTING_FAILURE,
  GET_LISTING_REQUEST,
  GET_LISTING_SUCCESS,
  GET_LISTING_FAILURE,
  GET_LISTINGS_REQUEST,
  GET_LISTINGS_SUCCESS,
  GET_LISTINGS_FAILURE,
  EDIT_LISTING_REQUEST,
  EDIT_LISTING_SUCCESS,
  EDIT_LISTING_FAILURE,
  DELETE_LISTING_REQUEST,
  DELETE_LISTING_SUCCESS,
  DELETE_LISTING_FAILURE,
} from "../actions/listings";

const defaultState = {
  listings: [{ dumpass: "more dumb" }],
  listing: {},
  createListingLoading: false,
  getSearchListingsLoading: false,
  getListingLoading: false,
  getListingsLoading: false,
  editListingLoading: false,
  deleteListingLoading: false,
};

export default (state = defaultState, action) => {
  console.log(action.listings);
  switch (action.type) {
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
    case GET_LISTINGS_REQUEST:
      return {
        ...state,
        listings: [],
        getListingsLoading: true,
      };
    case GET_LISTINGS_SUCCESS:
      return {
        ...state,
        listings: action.listings,
        getListingsLoading: false,
      };
    case GET_LISTINGS_FAILURE:
      return {
        ...state,
        getListingsLoading: false,
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
