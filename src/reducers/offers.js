import {
  CREATE_OFFER_REQUEST,
  CREATE_OFFER_SUCCESS,
  CREATE_OFFER_FAILURE,
  GET_BUYER_OFFERS_REQUEST,
  GET_BUYER_OFFERS_SUCCESS,
  GET_BUYER_OFFERS_FAILURE,
  GET_LISTING_OFFERS_REQUEST,
  GET_LISTING_OFFERS_SUCCESS,
  GET_LISTING_OFFERS_FAILURE,
  GET_OFFER_REQUEST,
  GET_OFFER_SUCCESS,
  GET_OFFER_FAILURE,
  EDIT_OFFER_REQUEST,
  EDIT_OFFER_SUCCESS,
  EDIT_OFFER_FAILURE,
  DELETE_OFFER_REQUEST,
  DELETE_OFFER_SUCCESS,
  DELETE_OFFER_FAILURE,
} from "../actions/offers";

const defaultState = {
  listingOffers: [],
  buyerOffers: [],
  offer: {},
  createOfferLoading: false,
  getBuyerOffersLoading: false,
  getListingOffersLoading: false,
  getOfferLoading: false,
  editOfferLoading: false,
  deleteOfferLoading: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case CREATE_OFFER_REQUEST:
      return {
        ...state,
        createOfferLoading: true,
      };
    case CREATE_OFFER_SUCCESS:
      return {
        ...state,
        createOfferLoading: false,
      };
    case CREATE_OFFER_FAILURE:
      return {
        ...state,
        createOfferLoading: false,
      };
    case GET_BUYER_OFFERS_REQUEST:
      return {
        ...state,
        getBuyerOffersLoading: true,
      };
    case GET_BUYER_OFFERS_SUCCESS:
      return {
        ...state,
        buyerOffers: action.buyerOffers,
        getBuyerOffersLoading: false,
      };
    case GET_BUYER_OFFERS_FAILURE:
      return {
        ...state,
        getBuyerOffersLoading: false,
      };
    case GET_LISTING_OFFERS_REQUEST:
      return {
        ...state,
        getListingOffersLoading: true,
      };
    case GET_LISTING_OFFERS_SUCCESS:
      return {
        ...state,
        listingOffers: action.listingOffers,
        getListingOffersLoading: false,
      };
    case GET_LISTING_OFFERS_FAILURE:
      return {
        ...state,
        getListingOffersLoading: false,
      };
    case GET_OFFER_REQUEST:
      return {
        ...state,
        getOfferLoading: true,
      };
    case GET_OFFER_SUCCESS:
      return {
        ...state,
        offers: action.offers,
        getOfferLoading: false,
      };
    case GET_OFFER_FAILURE:
      return {
        ...state,
        getOfferLoading: false,
      };
    case EDIT_OFFER_REQUEST:
      return {
        ...state,
        editOfferLoading: true,
      };
    case EDIT_OFFER_SUCCESS:
      return {
        ...state,
        offer: action.editedOffer,
        editOfferLoading: false,
      };
    case EDIT_OFFER_FAILURE:
      return {
        ...state,
        editOfferListing: false,
      };
    case DELETE_OFFER_REQUEST:
      return {
        ...state,
        deleteOfferLoading: true,
      };
    case DELETE_OFFER_SUCCESS:
      return {
        ...state,
        offer: action.editedOffer,
        editOfferLoading: false,
      };
    case DELETE_OFFER_FAILURE:
      return {
        ...state,
        offer: {},
        editOfferListing: false,
      };
    default:
      return state;
  }
};
