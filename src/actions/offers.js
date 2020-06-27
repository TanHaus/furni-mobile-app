import { renewToken } from "./auth";

export const CREATE_OFFER_REQUEST = "CREATE_OFFER_REQUEST";
export const CREATE_OFFER_SUCCESS = "CREATE_OFFER_SUCCESS";
export const CREATE_OFFER_FAILURE = "CREATE_OFFER_FAILURE";
export const GET_BUYER_OFFERS_REQUEST = "GET_BUYER_OFFERS_REQUEST";
export const GET_BUYER_OFFERS_SUCCESS = "GET_BUYER_OFFERS_SUCCESS";
export const GET_BUYER_OFFERS_FAILURE = "GET_BUYER_OFFERS_FAILURE";
export const GET_LISTING_OFFERS_REQUEST = "GET_LISTING_OFFERS_REQUEST";
export const GET_LISTING_OFFERS_SUCCESS = "GET_LISTING_OFFERS_SUCCESS";
export const GET_LISTING_OFFERS_FAILURE = "GET_LISTING_OFFERS_FAILURE";
export const GET_OFFER_REQUEST = "GET_OFFER_REQUEST";
export const GET_OFFER_SUCCESS = "GET_OFFER_SUCCESS";
export const GET_OFFER_FAILURE = "GET_OFFER_FAILURE";
export const EDIT_OFFER_REQUEST = "EDIT_OFFER_REQUEST";
export const EDIT_OFFER_SUCCESS = "EDIT_OFFER_SUCCESS";
export const EDIT_OFFER_FAILURE = "EDIT_OFFER_FAILURE";
export const DELETE_OFFER_REQUEST = "DELETE_OFFER_REQUEST";
export const DELETE_OFFER_SUCCESS = "DELETE_OFFER_SUCCESS";
export const DELETE_OFFER_FAILURE = "DELETE_OFFER_FAILURE";

const createOfferRequest = () => {
  return {
    type: CREATE_OFFER_REQUEST,
  };
};

const createOfferSuccess = (setModalVisible) => {
  setModalVisible(false);
  return {
    type: CREATE_OFFER_SUCCESS,
  };
};

const createOfferFailure = () => {
  return {
    type: CREATE_OFFER_FAILURE,
  };
};

const getOfferRequest = () => {
  return {
    type: GET_OFFER_REQUEST,
  };
};

const getOfferSuccess = (offer) => {
  return {
    type: GET_OFFER_SUCCESS,
    offer,
  };
};

const getOfferFailure = () => {
  return {
    type: GET_OFFER_FAILURE,
  };
};

const getListingOffersRequest = () => {
  return {
    type: GET_LISTING_OFFERS_REQUEST,
  };
};

const getListingOffersSuccess = (listingOffers) => {
  return {
    type: GET_LISTING_OFFERS_SUCCESS,
    listingOffers,
  };
};

const getListingOffersFailure = () => {
  return {
    type: GET_LISTING_OFFERS_FAILURE,
  };
};

const getBuyerOffersRequest = () => {
  return {
    type: GET_BUYER_OFFERS_REQUEST,
  };
};

const getBuyerOffersSuccess = (buyerOffers) => {
  return {
    type: GET_BUYER_OFFERS_SUCCESS,
    buyerOffers,
  };
};

const getBuyerOffersFailure = () => {
  return {
    type: GET_BUYER_OFFERS_FAILURE,
  };
};

const editOfferRequest = () => {
  return {
    type: EDIT_OFFER_REQUEST,
  };
};

const editOfferSuccess = (editedOffer) => {
  return {
    type: EDIT_OFFER_SUCCESS,
    editedOffer,
  };
};

const editOfferFailure = () => {
  return {
    type: EDIT_OFFER_FAILURE,
  };
};

const deleteOfferRequest = () => {
  return {
    type: DELETE_OFFER_REQUEST,
  };
};

const deleteOfferSuccess = () => {
  return {
    type: DELETE_OFFER_SUCCESS,
  };
};

const deleteOfferFailure = () => {
  return {
    type: DELETE_OFFER_FAILURE,
  };
};

export const createOffer = ({
  listingId,
  buyerId,
  priceBidded,
  setModalVisible,
}) => async (dispatch, getState) => {
  const requestUrl = `http://10.0.2.2:4000/listings/${listingId}/offers`;
  const payload = {
    buyerId: buyerId || getState().auth.user.userId,
    timeCreated: new Date().toISOString().slice(0, 19).replace("T", " "),
    priceBidded,
  };
  const makeRequest = () =>
    fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.token.access_token,
      },
      body: JSON.stringify(payload),
    }).then((response) => response.json());
  dispatch(createOfferRequest());
  try {
    let response = await makeRequest();
    if (response.success) dispatch(createOfferSuccess(setModalVisible));
    else if (response.message === "Expired access token") {
      await dispatch(renewToken());
      response = await makeRequest();
      if (response.success) dispatch(createOfferSuccess(setModalVisible));
      else throw "e";
    } else throw "e";
  } catch (e) {
    dispatch(createOfferFailure());
  }
};

export const getOffersByListing = ({ listingId, buyerId }) => async (
  dispatch,
  getState
) => {
  const requestUrl =
    `http://10.0.2.2:4000/listings/${listingId}/offers` +
    (buyerId ? `?buyerId=${buyerId}` : "");
  const makeRequest = () =>
    fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.token.access_token,
      },
    }).then((response) => response.json());
  dispatch(getListingOffersRequest());
  try {
    let response = await makeRequest();
    if (response.success) dispatch(getListingOffersSuccess(response.data));
    else if (response.message === "Expired access token") {
      await dispatch(renewToken());
      response = await makeRequest();
      if (response.success) dispatch(getListingOffersSuccess(response.data));
      else throw "e";
    } else throw "e";
  } catch (e) {
    dispatch(getListingOffersFailure());
  }
};

export const getOffersByBuyer = (buyerId) => async (dispatch, getState) => {
  const requestUrl = `http://localhost:4000/users/${buyerId}/offers`;
  const makeRequest = () =>
    fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.token.access_token,
      },
    }).then((response) => response.json());
  dispatch(getBuyerOffersRequest());
  try {
    let response = await makeRequest();
    if (response.success) dispatch(getBuyerOffersSuccess(response.data));
    else if (response.message === "Expired access token") {
      await dispatch(renewToken());
      response = await makeRequest();
      if (response.success) dispatch(getBuyerOffersSuccess(response.data));
      else throw "e";
    } else throw "e";
  } catch (e) {
    dispatch(getBuyerOffersFailure());
  }
};

export const editOffer = ({ offerId, priceBidded, status }) => async (
  dispatch,
  getState
) => {
  const requestUrl = `http://10.0.2.2:4000/offers/${offerId}`;
  const payload = { priceBidded, status };
  dispatch(editOfferRequest());
  const makeRequest = () =>
    fetch(requestUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.token.access_token,
      },
      body: JSON.stringify(payload),
    }).then((response) => response.json());
  try {
    let response = await makeRequest();
    if (response.success) dispatch(editOfferSuccess());
    // need to update store with updated data
    else if (response.message === "Expired access token") {
      await dispatch(renewToken());
      response = await makeRequest();
      if (response.success) dispatch(editOfferSuccess());
      else throw "e";
    } else throw "e";
  } catch (e) {
    dispatch(editOfferFailure());
  }
};

export const deleteOffer = (offerId) => async (dispatch, getState) => {
  const requestUrl = `http://10.0.2.2:4000/offers/${offerId}`;
  const makeRequest = () =>
    fetch(requestUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.token.access_token,
      },
    }).then((response) => response.json());
  dispatch(deleteOfferRequest());
  try {
    let response = await makeRequest();
    if (response.success) dispatch(deleteOfferSuccess());
    else if (response.message === "Expired access token") {
      await dispatch(renewToken());
      response = await makeRequest();
      if (response.success) dispatch(deleteOfferSuccess());
      else throw "e";
    } else throw "e";
  } catch (e) {
    dispatch(deleteOfferFailure());
  }
};

export const getOfferById = (offerId) => async (dispatch, getState) => {
  const requestUrl = `http://10.0.2.2:4000/offers/${offerId}`;
  const makeRequest = () =>
    fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.token.access_token,
      },
    }).then((response) => response.json());
  dispatch(getOfferRequest());
  try {
    let response = await makeRequest();
    if (response.success) dispatch(getOfferSuccess(response.data));
    else if (response.message === "Expired access token") {
      await dispatch(renewToken());
      response = await makeRequest();
      if (response.success) dispatch(getOfferSuccess(response.data));
      else throw "e";
    } else throw "e";
  } catch (e) {
    dispatch(getOfferFailure());
  }
};
