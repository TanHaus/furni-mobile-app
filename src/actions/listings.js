import { renewToken } from "./auth";
import { PushNotificationIOS, Platform } from "react-native";

export const CREATE_LISTING_REQUEST = "CREATE_LISTING_REQUEST";
export const CREATE_LISTING_SUCCESS = "CREATE_LISTING_SUCCESS";
export const CREATE_LISTING_FAILURE = "CREATE_LISTING_FAILURE";
export const GET_LISTING_REQUEST = "GET_LISTING_REQUEST";
export const GET_LISTING_SUCCESS = "GET_LISTING_SUCCESS";
export const GET_LISTING_FAILURE = "GET_LISTING_FAILURE";
export const GET_LISTINGS_REQUEST = "GET_LISTINGS_REQUEST";
export const GET_LISTINGS_SUCCESS = "GET_LISTINGS_SUCCESS";
export const GET_LISTINGS_FAILURE = "GET_LISTINGS_FAILURE";
export const EDIT_LISTING_REQUEST = "EDIT_LISTING_REQUEST";
export const EDIT_LISTING_SUCCESS = "EDIT_LISTING_SUCCESS";
export const EDIT_LISTING_FAILURE = "EDIT_LISTING_FAILURE";
export const DELETE_LISTING_REQUEST = "DELETE_LISTING_REQUEST";
export const DELETE_LISTING_SUCCESS = "DELETE_LISTING_SUCCESS";
export const DELETE_LISTING_FAILURE = "DELETE_LISTING_FAILURE";

const createListingRequest = () => {
  return {
    type: CREATE_LISTING_REQUEST,
  };
};

const createListingSuccess = () => {
  return {
    type: CREATE_LISTING_SUCCESS,
  };
};

const createListingFailure = () => {
  return {
    type: CREATE_LISTING_FAILURE,
  };
};

const getListingRequest = () => {
  return {
    type: GET_LISTING_REQUEST,
  };
};

const getListingSuccess = (listing) => {
  return {
    type: GET_LISTING_SUCCESS,
    listing,
  };
};

const getListingFailure = () => {
  return {
    type: GET_LISTING_FAILURE,
  };
};

const editListingRequest = () => {
  return {
    type: EDIT_LISTING_REQUEST,
  };
};

const editListingSuccess = (editedUser) => {
  // to check
  return {
    type: EDIT_LISTING_SUCCESS,
    editedUser,
  };
};

const editListingFailure = () => {
  return {
    type: EDIT_LISTING_FAILURE,
  };
};

const deleteListingRequest = () => {
  return {
    type: DELETE_LISTING_REQUEST,
  };
};

const deleteListingSuccess = (userToDelete) => {
  return {
    type: DELETE_LISTING_SUCCESS,
  };
};

const deleteListingFailure = () => {
  return {
    type: DELETE_LISTING_FAILURE,
  };
};

const getListingsRequest = () => {
  return {
    type: GET_LISTINGS_REQUEST,
  };
};

const getListingsSuccess = (listings) => {
  return {
    type: GET_LISTINGS_SUCCESS,
    listings,
  };
};

const getListingsFailure = () => {
  return {
    type: GET_LISTINGS_FAILURE,
  };
};

const b64toBlob = (dataURI) => {
  var byteString = atob(dataURI.split(",")[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: "image/jpeg" });
};

export const getListing = (listingId) => async (dispatch, getState) => {
  const requestUrl = `http://localhost:4000/listings/${listingId}`;
  const makeRequest = () =>
    fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.token.access_token,
      },
    }).then((response) => response.json());
  dispatch(getListingRequest());
  try {
    let response = await makeRequest();
    if (response.success) {
      const listing = response.data;
      listing.picUrls = listing.picUrls.split(",");
      dispatch(getListingSuccess(listing));
    } else if (response.message === "Expired access token") {
      await dispatch(renewToken());
      response = await makeRequest();
      if (response.success) {
        const listing = response.data;
        listing.picUrls = listing.picUrls.split(",");
        dispatch(getListingSuccess(response.data));
      } else throw "e";
    } else throw "e";
  } catch (e) {
    dispatch(getListingFailure());
  }
};

const addPic = ({ listingId, blob, access_token }) => {
  // const file = new FormData().append('', blob, `${listingId}_${Date.now()}.jpeg`)
  const formData = new FormData();
  formData.append("image", blob, `${listingId}_${Date.now()}.jpeg`);
  return fetch(`http://localhost:4000/listings/${listingId}/pics`, {
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    body: formData,
  });
};

export const createListing = ({ listing, pics }) => async (
  dispatch,
  getState
) => {
  const requestUrl = "http://10.0.2.2:4000/listings";
  const payload = {
    ...listing,
    sellerId: listing.sellerId || getState().auth.user.userId,
    timeCreated: new Date().toISOString().slice(0, 19).replace("T", " "),
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
  dispatch(createListingRequest());
  try {
    let response = await makeRequest();
    if (response.success) {
      const listingId = response.data.listingId;
      await Promise.all(
        pics.map((pic) => {
          const form = new FormData();
          form.append("photo", {
            uri: pic.uri,
            type: "image/jpg",
            name: `${listingId}_${Date.now()}.jpeg`,
          });
          // console.log(JSON.stringify(pic.replace(/^data:image\/[a-z]+;base64,/, "")));
          return fetch(`http://10.0.2.2:4000/listings/${listingId}/pics`, {
            method: "POST",
            headers: {
              Authorization: "Bearer " + getState().auth.token.access_token,
            },
            body: form,
          });
          // addPic({ listingId, blob, access_token: getState().auth.token.access_token });
        })
      );
      dispatch(createListingSuccess());
    } else if (response.message === "Expired access token") {
      await dispatch(renewToken());
      response = await makeRequest();
      if (response.success) {
        const listingId = response.data.listingId;
        await Promise.all(
          pics.map((pic) => {
            const blob = b64toBlob(pic);
            addPic({
              listingId,
              blob,
              access_token: getState().auth.token.access_token,
            });
          })
        );
        dispatch(createListingSuccess());
      } else throw "e";
    } else throw "e";
  } catch (e) {
    console.log(e);
    dispatch(createListingFailure());
  }
};

export const editListing = (editedListing) => async (dispatch, getState) => {
  const requestUrl = `http://localhost:4000/listings/${listingId}`;
  const payload = {
    ...editedListing,
    timeUpdated: new Date().toISOString().slice(0, 19).replace("T", " "),
  };
  const makeRequest = () =>
    fetch(requestUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.token.access_token,
      },
      body: JSON.stringify(payload),
    }).then((response) => response.json());
  dispatch(editListingRequest());
  try {
    let response = await makeRequest();
    if (response.success) {
      const listingId = response.data.listingId;
      await Promise.all(
        pics.map((pic) => {
          const blob = b64toBlob(pic);
          addPic(listingId, blob);
        })
      );
      dispatch(editListingSuccess());
    } else if (response.message === "Expired access token") {
      await dispatch(renewToken());
      response = await makeRequest();
      if (response.success) {
        const listingId = response.data.listingId;
        await Promise.all(
          pics.map((pic) => {
            const blob = b64toBlob(pic);
            addPic(listingId, blob);
          })
        );
        dispatch(editListingSuccess());
      } else throw "e";
    } else throw "e";
  } catch (e) {
    dispatch(editListingFailure());
  }
};

export const deleteListing = (listingId) => async (dispatch, getState) => {
  const requestUrl = `http://localhost:4000/listings/${listingId}`;
  const makeRequest = () =>
    fetch(requestUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.token.access_token,
      },
    }).then((response) => response.json());
  dispatch(deleteListingRequest());
  try {
    let response = await makeRequest();
    if (response.success) dispatch(deleteListingSuccess());
    else if (response.message === "Expired access token") {
      await dispatch(renewToken());
      response = await makeRequest();
      if (response.success) dispatch(deleteListingSuccess());
      else throw "e";
    } else throw "e";
  } catch (e) {
    dispatch(deleteListingFailure());
  }
};

export const getListings = (q) => async (dispatch, getState) => {
  const requestUrl = "http://localhost:4000/listings" + (q ? `?q=${q}` : "");
  const makeRequest = () =>
    fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.token.access_token,
      },
    }).then((response) => response.json());
  dispatch(getListingsRequest());
  try {
    let response = await makeRequest();
    if (response.success) {
      let listings = response.data;
      listings = listings.map((listing) => {
        listing.picUrls = listing.picUrls.split(",");
        return listing;
      });
      dispatch(getListingsSuccess(response.data));
    } else if (response.message === "Expired access token") {
      await dispatch(renewToken());
      response = await makeRequest();
      if (response.success) {
        listings = listings.map((listing) => {
          listing.picUrls = listing.picUrls.split(",");
          return listing;
        });
        dispatch(getListingsSuccess(response.data));
      } else throw "e";
    } else throw "e";
  } catch (e) {
    dispatch(getListingsFailure());
  }
};
