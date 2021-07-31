import { combineReducers } from "redux";
import carsReducer from "./carsReducer/CarsReducer";
import userReducer from "./userReducer/userReducer";
import { reducer as formReducer } from "redux-form";
import checkoutReducer from "./checkoutReducer/checkoutReducer";
import orderReducer from "./orderReducer/orderReducer";

const reducers = combineReducers({
  cars: carsReducer,
  user: userReducer,
  checkout: checkoutReducer,
  orders: orderReducer,
  form: formReducer,
});

export default reducers;
