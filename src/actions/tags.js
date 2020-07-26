import { renewToken } from "./auth";
export const GET_TAGS_REQUEST = "GET_TAGS_REQUEST";
export const GET_TAGS_SUCCESS = "GET_TAGS_SUCCESS";
export const GET_TAGS_FAILURE = "GET_TAGS_FAILURE";

const getTagsRequest = () => {
  return {
    type: GET_TAGS_REQUEST,
  };
};

const getTagsSuccess = (tags) => {
  return {
    type: GET_TAGS_SUCCESS,
    tags,
  };
};

const getTagsFailure = () => {
  return {
    type: GET_TAGS_FAILURE,
  };
};

export const getTags = () => async (dispatch, getState) => {
  const requestUrl = `http://10.0.2.2:4000/tags`;
  const makeRequest = () =>
    fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.token.access_token,
      },
    }).then((response) => response.json());
  dispatch(getTagsRequest());
  try {
    let response = await makeRequest();
    if (response.success) dispatch(getTagsSuccess(response.data));
    else if (response.message === "Expired access token") {
      await dispatch(renewToken());
      response = await makeRequest();
      if (response.success) dispatch(getTagsSuccess(response.data));
      else throw "e";
    } else throw "e";
  } catch (e) {
    dispatch(getTagsFailure());
  }
};
