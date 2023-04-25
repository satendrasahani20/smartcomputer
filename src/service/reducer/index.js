import { combineReducers } from "redux";
import { adminReducer } from "./admin";
// import { authenticationReducer } from "./authentication";
import { commonReducer } from "./common";
// import { developerReducer } from "./developer";

const appReducer = combineReducers({
  adminReducer,
//   authenticationReducer,
  commonReducer,
//   developerReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
