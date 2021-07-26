import { createSelector } from "reselect";

const basket = (state) => state.checkout;

export const getBasket = createSelector(
  [basket],
  (checkout) => checkout.checkoutBasket
);
