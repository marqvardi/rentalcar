import { Router, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
// import FooterComponent from "./components/footer/footer.component";
import HeaderComponent from "./components/header/header.component";
import CarListing from "./pages/CarListing/carListing";
import CarRentingPage from "./pages/carRentingPage/carRentingPage";
import SignInOrRegisterPage from "./pages/signInOrRegister/signInOrRegisterPage";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActionTypes } from "./redux/reducers/userReducer/userActionTypes";
import history from "./util/history";
import CheckoutPage from "./pages/checkout/checkoutPage";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    var unsubscribeFromAuth = null;

    unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snap) => {
          dispatch({
            type: userActionTypes.CURRENT_USER,
            payload: {
              id: snap.id,
              ...snap.data(),
            },
          });
        });
      } else {
        dispatch({ type: userActionTypes.SIGN_OUT_USER, payload: userAuth });
      }
    });

    return () => {
      dispatch({ type: userActionTypes.SIGN_OUT_USER, payload: null });
      unsubscribeFromAuth();
    };
  }, [dispatch]);

  return (
    <div>
      {/* <BrowserRouter> */}
      <Router history={history}>
        <HeaderComponent />
        <Switch>
          <Route path="/" component={CarListing} exact />
          <Route path="/renting/:id" component={CarRentingPage} />
          <Route path="/signInOrRegister" component={SignInOrRegisterPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <CarListing />
        </Switch>

        {/* </BrowserRouter> */}
        {/* <FooterComponent /> */}
      </Router>
    </div>
  );
};

export default App;
