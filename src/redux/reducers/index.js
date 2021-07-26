import { combineReducers } from "redux";
import carsReducer from "./carsReducer/CarsReducer";
import userReducer from "./userReducer/userReducer";
import { reducer as formReducer } from "redux-form";
import checkoutReducer from "./checkoutReducer/checkoutReducer";

const reducers = combineReducers({
  cars: carsReducer,
  user: userReducer,
  checkout: checkoutReducer,
  form: formReducer,
});

export default reducers;
