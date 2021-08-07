import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";

import { toast } from "react-toastify";
import { Button } from "semantic-ui-react";
import { createBooking } from "../../firebase";
import { updateCarAvailability } from "../../firebase/carDataAccess/carDataAccess";
import { stripeKey } from "../../keys";
import { checkoutActionTypes } from "../../redux/reducers/checkoutReducer/checkoutActionTypes";
import { getCurrentUser } from "../../redux/reducers/userReducer/user.selector";
import history from "../../util/history";

import "./stripe.styles.css";

const StripeCheckoutButton = ({ price, basketFromRedux }) => {
  const priceForStripe = price * 100;
  const publishableKey = stripeKey;
  // console.log(submitToFirestore);
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);

  const onToken = (token) => {
    // console.log(token);

    // Get auth details and Send the booking Details + auth
    try {
      console.log(basketFromRedux);
      createBooking(currentUser, basketFromRedux);
      dispatch(updateCarAvailability(basketFromRedux.car.id));
    } catch (error) {
      toast.error(error.message);
    }

    // console.log("Props in stripe", props);
    history.push("/");
    dispatch({
      type: checkoutActionTypes.CLEAR_CHECKOUT_DETAILS,
      payload: null,
    });
  };

  return (
    <div>
      {basketFromRedux.days > 0 && (
        <div className="test-warning">
          * Please use the following test credit card for payments*
          <br />
          4242 4242 4242 4242 - Exp- Future date - CVW : 123{" "}
        </div>
      )}
      <div className="stripeButton">
        <Button content="Go back" onClick={history.goBack} color="teal" />
        {basketFromRedux.days > 0 && (
          <StripeCheckout
            label="Pay now"
            name="Rental car"
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay now"
            token={onToken}
            stripeKey={publishableKey}
          />
        )}
      </div>
    </div>
  );
};

export default StripeCheckoutButton;
