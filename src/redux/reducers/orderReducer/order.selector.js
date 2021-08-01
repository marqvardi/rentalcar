import { createSelector } from "reselect";

export const Orders = (state) => state.orders;

export const getActiveOrdersForAdmin = createSelector(
  [Orders],
  (orders) => (orders.allActiveOrders ? orders.allActiveOrders : {})
  // .filter((order) => order.id === currentUser.id)
);

export const getCompletedOrdersForAdmin = createSelector(
  [Orders],
  (orders) => (orders.allCompletedOrders ? orders.allCompletedOrders : {})
  // .filter((order) => order.id === currentUser.id)
);
