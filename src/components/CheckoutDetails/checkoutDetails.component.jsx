import React from "react";
import Moment from "react-moment";
import { Grid } from "semantic-ui-react";
import "./checkoutDetails.style.css";

const CheckoutDetails = ({
  car,
  days,
  dateReturn,
  datePickUp,
  timeForPickUp,
}) => {
  const total = days * car.price;

  return (
    <div className="main">
      <Grid columns={2} className="text">
        <Grid.Column>Pick up date</Grid.Column>
        {/* <Grid.Column>{datePickUp.toString()}</Grid.Column> */}
        <Grid.Column>
          <Moment format="DD/MM/YYYY">{datePickUp}</Moment>
        </Grid.Column>

        <Grid.Column>Time to pick it up</Grid.Column>
        <Grid.Column>{timeForPickUp}</Grid.Column>

        <Grid.Column>Date to return</Grid.Column>
        <Grid.Column>
          <Moment format="DD/MM/YYYY">{dateReturn}</Moment>
        </Grid.Column>

        <Grid.Column>Number of days</Grid.Column>
        <Grid.Column>{days}</Grid.Column>

        <Grid.Column>Price per day</Grid.Column>
        <Grid.Column>$ {car.price}</Grid.Column>

        <Grid.Column>Total</Grid.Column>
        <Grid.Column>$ {total}</Grid.Column>
      </Grid>
    </div>
  );
};

export default CheckoutDetails;
