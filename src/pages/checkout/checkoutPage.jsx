import React from "react";
import { useSelector } from "react-redux";
import { Container } from "semantic-ui-react";
import CheckoutDetails from "../../components/CheckoutDetails/checkoutDetails.component";
import StripeCheckoutButton from "../../components/stripe/stripe.component";
import { getBasket } from "../../redux/reducers/checkoutReducer/checkout.selector";
import { checkIfUserIsSignerIn } from "../../redux/reducers/userReducer/user.selector";
import CarsCard from "../../components/carsCard/carsCard";
import history from "../../util/history";
import "./checkout.styles.css";

const CheckoutPage = () => {
  let isSignedIn = useSelector(checkIfUserIsSignerIn);
  const basketFromRedux = useSelector(getBasket);

  const BookTheCar = () => {
    // console.log("basketFromRedux from checkouPage", basketFromRedux);
    return (
      <div>
        <div className="main">
          <div>
            <CarsCard car={basketFromRedux.car} />
          </div>
          <div>
            <h2 className="header">Booking details</h2>
            <CheckoutDetails {...basketFromRedux} />
            <StripeCheckoutButton
              price={basketFromRedux.car.price * basketFromRedux.days}
              basketFromRedux={basketFromRedux}
            />
          </div>
        </div>
      </div>
    );
  };

  const ReturnToLogin = () => {
    history.push("/signInOrRegister");
    return null;
  };

  return (
    <Container>
      <div style={{ marginTop: "00px" }}>
        {isSignedIn ? <BookTheCar /> : <ReturnToLogin />}
      </div>
    </Container>
  );
};

export default CheckoutPage;
