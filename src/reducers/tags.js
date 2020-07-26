import {
  GET_TAGS_REQUEST,
  GET_TAGS_SUCCESS,
  GET_TAGS_FAILURE,
} from "../actions/tags";

const defaultState = {
  tags: [],
  getTagsLoading: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_TAGS_REQUEST:
      return {
        ...state,
        tags: [],
        getTagsLoading: true,
      };
    case GET_TAGS_SUCCESS:
      return {
        ...state,
        tags: action.tags,
        getTagsLoading: false,
      };
    case GET_TAGS_FAILURE:
      return {
        ...state,
        getTagsLoading: false,
      };
    default:
      return state;
  }
};
