// Imports: Dependencies
import { combineReducers } from "redux";
// Imports: Reducers
import authReducer from "./authReducer";
import inventoryReducer from "./inventoryReducer"
import shiftReducer from "./shiftReducer";
import orderReducer from "./orderReducer";

// Redux: Root Reducer
const rootReducer = combineReducers({
    auth: authReducer,
    shift: shiftReducer,
    inventory: inventoryReducer,
    order: orderReducer
});
// Exports
export default rootReducer;
