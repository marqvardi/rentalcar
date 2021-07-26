import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { carActionsType } from "../../redux/reducers/carsReducer/carActionTypes";
import { Button, Container, Grid, Loader } from "semantic-ui-react";
import "./carListing.styles.css";
import {
  fetchAllBookingsForAdmin,
  fetchAllBookingsForUser,
  fetchCars,
} from "../../firebase";
import CarsCard from "../../components/carsCard/carsCard";
import { Link } from "react-router-dom";
import { getBasket } from "../../redux/reducers/checkoutReducer/checkout.selector";
import { getCars } from "../../redux/reducers/carsReducer/cars.selector";
import { getCurrentUser } from "../../redux/reducers/userReducer/user.selector";

const CarListing = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const BasketHasItem = useSelector(getBasket);
  const auth = useSelector(getCurrentUser);

  useEffect(() => {
    setTimeout(() => {
      fetchCars().then((result) => {
        dispatch({ type: carActionsType.GET_ALL_CARS, payload: result });
      });
      setLoading(false);
    }, 3000);
    fetchAllBookingsForAdmin().then((all) => console.log(all));
    fetchAllBookingsForUser().then((bookings) => {
      // console.log("All user from listing", bookings)
      if (auth !== null) {
        const bookingsFromUser = bookings.filter(
          (booking) => auth.id === booking.auth.id
        );
        console.log(bookingsFromUser);
      }
    });

    return () => {
      dispatch({ type: carActionsType.GET_ALL_CARS, payload: {} });
    };
  }, [dispatch, auth]);

  const cars = useSelector(getCars);
  const ArrayCars = Array.from(cars);

  const renderGrid = (cars) => {
    return (
      <Container className="teste">
        {BasketHasItem && (
          <Link to="/checkout">
            <Button
              color="yellow"
              content="Finish your booking here"
              floated="right"
              style={{ marginBottom: "15px", color: "black" }}
            />
          </Link>
        )}
        <Grid columns={4} celled>
          <Grid.Row>
            {ArrayCars &&
              cars.map((car) => (
                <Grid.Column key={car.id}>
                  <Link to={`/renting/${car.id}`}>
                    <CarsCard car={car} />
                  </Link>
                </Grid.Column>
              ))}
          </Grid.Row>
        </Grid>
      </Container>
    );
  };

  return (
    <>
      {loading ? (
        <Loader active content="Loading data, slow on purpose" size="medium" />
      ) : (
        renderGrid(ArrayCars)
      )}
    </>
  );
};

export default CarListing;
