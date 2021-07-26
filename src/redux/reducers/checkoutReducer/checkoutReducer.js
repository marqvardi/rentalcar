import { checkoutActionTypes } from "./checkoutActionTypes";

const INITIAL_STATE = {
  checkoutBasket: null,
};

const checkoutReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case checkoutActionTypes.SET_CHECKOUT_DETAILS_FOR_BOOKING:
      return {
        ...state,
        checkoutBasket: payload,
      };
    case checkoutActionTypes.CLEAR_CHECKOUT_DETAILS:
      return {
        ...state,
        checkoutBasket: null,
      };

    default:
      return state;
  }
};

export default checkoutReducer;
