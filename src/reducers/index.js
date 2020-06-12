import { combineReducers } from "redux";
import auth from "./auth";
import users from "./users";
import listings from "./listings";

export default combineReducers({
  auth,
  users,
  listings,
});
