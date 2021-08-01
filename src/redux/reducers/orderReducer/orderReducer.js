import { orderActionTypes } from "./orderActionTypes";

const INITIAL_VALUE = {
  allActiveOrders: {},
  allCompletedOrders: {},
};

const orderReducer = (state = INITIAL_VALUE, { type, payload }) => {
  switch (type) {
    case orderActionTypes.GET_ALL_ACTIVE_ORDERS_FOR_ADMIN:
      return {
        ...state,
        allActiveOrders: payload,
      };
    case orderActionTypes.GET_ALL_ACTIVE_ORDERS_FOR_USER:
      return {
        ...state,
        allActiveOrders: payload,
      };
    case orderActionTypes.GET_ALL_COMPLETED_ORDERS_FOR_ADMIN:
      return {
        ...state,
        allCompletedOrders: payload,
      };
    case orderActionTypes.GET_ALL_COMPLETED_ORDERS_FOR_USER:
      return {
        ...state,
        allCompletedOrders: payload,
      };
    case orderActionTypes.CLEAR_ORDERS:
      return {
        ...state,
        allCompletedOrders: {},
        allActiveOrders: {},
      };

    default:
      return state;
  }
};

export default orderReducer;
