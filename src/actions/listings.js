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

const getListingsSuccess = ({
  listings,
  sort,
  condition,
  maxPrice,
  minPrice,
  searchString,
  props,
}) => {
  props.navigation.navigate("search-results", {
    searchString,
    prevSort: sort,
    prevCondition: condition,
    prevMaxPrice: maxPrice,
    prevMinPrice: minPrice,
  });
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
  const requestUrl = `http://10.0.2.2:4000/listings/${listingId}`;
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
  const requestUrl = "http://10.0.2.2:4000/listings";
  const makePayload = ({ listing, picUrls }) => {
    return {
      ...listing,
      sellerId: listing.sellerId || getState().auth.user.userId,
      timeCreated: new Date().toISOString().slice(0, 19).replace("T", " "),
      picUrls,
    };
  };

  const makeRequest = (payload) =>
    fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.token.access_token,
      },
      body: JSON.stringify(payload),
    }).then((response) => response.json());

  const picUrls = [];

  const uploadPicToS3 = async (uri) => {
    try {
      const file = await fetch(uri).then((response) => response.blob());
      const response = await fetch(
        "http://10.0.2.2:4000/listings/S3SignedUrl",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getState().auth.token.access_token,
          },
        }
      ).then((response) => response.json()); // need to take into account when access token expires
      const { signedUrl, fileLocation } = response.data;
      await fetch(signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "image/jpeg",
        },
        body: file,
      });
      picUrls.push(fileLocation);
    } catch (err) {
      throw err;
    }
  };

  dispatch(createListingRequest());
  try {
    await Promise.all(pics.map((pic) => uploadPicToS3(pic.uri)));
    let response = await makeRequest(makePayload({ listing, picUrls }));
    if (response.success) dispatch(createListingSuccess());
    else if (response.message === "Expired access token") {
      await dispatch(renewToken());
      response = await makeRequest(makePayload({ listing, picUrls }));
      if (response.success) dispatch(createListingSuccess());
      else throw "e";
    } else throw "e";
  } catch (e) {
    dispatch(createListingFailure());
  }
};

export const editListing = (editedListing) => async (dispatch, getState) => {
  const requestUrl = `http://10.0.2.2:4000/listings/${listingId}`;
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
  const requestUrl = `http://10.0.2.2:4000/listings/${listingId}`;
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

export const getListings = ({
  searchString,
  sort,
  condition,
  maxPrice,
  minPrice,
  props,
}) => async (dispatch, getState) => {
  let requestUrl = "http://10.0.2.2:4000/listings";
  const query_params_present =
    searchString || sort || condition || maxPrice || minPrice;
  if (query_params_present) requestUrl += "?";
  if (searchString) requestUrl += `q=${searchString.replace(" ", "+")}&`;
  if (sort) requestUrl += `sort=${sort}&`;
  if (condition) requestUrl += `condition=${condition}&`;
  if (maxPrice) requestUrl += `maxPrice=${maxPrice}&`;
  if (minPrice) requestUrl += `minPrice=${minPrice}&`;
  if (query_params_present) requestUrl = requestUrl.slice(0, -1);

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
      const listings = response.data.map((listing) => {
        if (!listing.picUrls) return listing;
        const picUrls = listing.picUrls.split(",");
        return { ...listing, picUrls };
      });
      dispatch(
        getListingsSuccess({
          listings,
          searchString,
          sort,
          condition,
          maxPrice,
          minPrice,
          props,
        })
      );
    } else if (response.message === "Expired access token") {
      await dispatch(renewToken());
      response = await makeRequest();
      if (response.success) {
        listings = listings.map((listing) => {
          listing.picUrls = listing.picUrls.split(",");
          return listing;
        });
        dispatch(
          getListingsSuccess({
            listings,
            searchString,
            sort,
            condition,
            maxPrice,
            minPrice,
            props,
          })
        );
      } else throw "e";
    } else throw "e";
  } catch (e) {
    dispatch(getListingsFailure());
  }
};
