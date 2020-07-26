import { combineReducers } from "redux";
import auth from "./auth";
import users from "./users";
import listings from "./listings";
import offers from "./offers";
import tags from "./tags";
import { LOGOUT_SUCCESS } from "actions/auth";

const appReducer = combineReducers({
  auth,
  users,
  listings,
  offers,
  tags,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) state = undefined;
  return appReducer(state, action);
};
export default rootReducer;
