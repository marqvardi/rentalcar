import { createSelector } from "reselect";

export const Orders = (state) => state.orders;

export const getActiveOrdersForAdmin = createSelector(
  [Orders],
  (orders) => orders.allActiveOrders
  // .filter((order) => order.id === currentUser.id)
);
