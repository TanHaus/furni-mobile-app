const AWS = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();

import { renewToken } from "./auth";

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

export const createListing = ({ listing, pics }) => async (
  dispatch,
  getState
) => {
  const {
    sellerId,
    title,
    price,
    itemCondition,
    description,
    category,
    deliveryOption,
  } = listing;
  const requestUrl = "http://localhost:4000/listings";
  const s3Config = {
    region: process.env.S3_REGION,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  };
  const s3 = new AWS.S3(s3Config);
  const picUrls = [];
  dispatch(createListingRequest());
  try {
    await Promise.all(
      pics.map(async (pic) => {
        const buf = Buffer.from(
          pic.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );
        const params = {
          Bucket: "furni-s3-bucket",
          Key: `${process.env.LISTING_PICS_DIRNAME}/${Date.now()}`,
          Body: buf,
          ACL: "public-read",
          ContentEncoding: "base64",
          ContentType: "image/jpeg",
          ContentDisposition: "attachment",
        };
        const data = await s3.upload(params).promise();
        picUrls.push(data.Location);
      })
    );
    const payload = {
      sellerId: sellerId || getState().auth.user.userId,
      title,
      timeCreated: new Date().toISOString().slice(0, 19).replace("T", " "),
      price,
      itemCondition,
      description,
      category,
      deliveryOption,
      picUrls: picUrls.join(","),
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
    let response = await makeRequest();
    if (response.success) dispatch(createListingSuccess());
    else if (response.message === "Expired access token") {
      await dispatch(renewToken());
      response = await makeRequest();
      if (response.success) dispatch(createListingSuccess());
      else throw "e";
    } else throw "e";
  } catch (e) {
    console.log(e);
    dispatch(createListingFailure());
  }
};

export const editListing = ({
  listingId,
  name,
  price,
  itemCondition,
  description,
  category,
  deliveryOption,
  picUrls,
}) => async (dispatch, getState) => {
  const requestUrl = `http://localhost:4000/listings/${listingId}`;
  const payload = {
    name,
    price,
    itemCondition,
    description,
    category,
    deliveryOption,
    picUrls,
  };
  dispatch(editListingRequest());
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
    if (response.success) dispatch(editListingSuccess());
    // need to update store with updated data
    else if (response.message === "Expired access token") {
      await dispatch(renewToken());
      response = await makeRequest();
      if (response.success) dispatch(editListingSuccess());
      else throw "e";
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
    if (response.success) dispatch(getListingsSuccess(response.data));
    else if (response.message === "Expired access token") {
      await dispatch(renewToken());
      response = await makeRequest();
      if (response.success) dispatch(getListingsSuccess(response.data));
      else throw "e";
    } else throw "e";
  } catch (e) {
    dispatch(getListingsFailure());
  }
};
