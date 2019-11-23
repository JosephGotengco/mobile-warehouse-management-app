// Imports: Dependencies
import { combineReducers } from "redux";
// Imports: Reducers
import authReducer from "./authReducer";
import inventoryReducer from "./inventoryReducer";

// Redux: Root Reducer
const rootReducer = combineReducers({
  auth: authReducer,
  inventory: inventoryReducer
});
// Exports
export default rootReducer;
