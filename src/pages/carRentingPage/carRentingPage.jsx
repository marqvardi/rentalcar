import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CarsCard from "../../components/carsCard/carsCard";
import { fetchCar } from "../../firebase";
import { carActionsType } from "../../redux/reducers/carsReducer/carActionTypes";
import { Button, Container, Form, Modal } from "semantic-ui-react";
import { DateTimePicker, DropdownList } from "react-widgets";
import { Field, reduxForm } from "redux-form";
import { TimeList } from "../../util/timeList";
import { checkoutActionTypes } from "../../redux/reducers/checkoutReducer/checkoutActionTypes";
import "./carRentingPage.styles.css";
import history from "../../util/history";
import { countDays } from "../../util/countDays";
import { fetchSingleCar } from "../../redux/reducers/carsReducer/cars.selector";
import { checkIfUserIsSignerIn } from "../../redux/reducers/userReducer/user.selector";
import { fetchSingleCarFromFirestore } from "../../firebase/carDataAccess/carDataAccess";
import _ from "lodash";

const CarRentingPage = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const car = useSelector(fetchSingleCar);
  const isSignedIn = useSelector(checkIfUserIsSignerIn);

  useEffect(() => {
    dispatch(fetchSingleCarFromFirestore(id));

    return () => {
      dispatch({ type: carActionsType.FETCH_SINGLE_CAR, payload: {} });
    };
  }, [dispatch, props, id]);

  let date = new Date();

  const renderDateTimePicker = ({ input: { onChange, value }, showTime }) => {
    return (
      <div>
        <DateTimePicker
          onChange={onChange}
          format="DD MMM YYYY"
          time={showTime}
          value={!value ? null : new Date(value)}
          min={date}
        />
      </div>
    );
  };

  const renderDropDownList = ({
    input: { onChange, value },
    meta: { error, touched },
  }) => (
    <div>
      <DropdownList
        onChange={onChange}
        value={!value ? null : value}
        data={TimeList}
        textField="time"
      />
      <div style={{ color: "red" }}>{touched ? error : ""}</div>
    </div>
  );

  // const countDays = (values) => {
  //   const differenceInTime =
  //     values.dateReturn.getTime() - values.datePickUp.getTime();
  //   const days = differenceInTime / (1000 * 3600 * 24);

  //   return days;
  // };

  const onSubmit = async (values) => {
    const days = countDays(values);
    //   values.dateReturn.getTime() - values.datePickUp.getTime();
    // const days = differenceInTime / (1000 * 3600 * 24);
    // console.log(values);

    const bookingDetails = {
      car: _.omit(car, ["available"]),
      datePickUp: values.datePickUp,
      dateReturn: values.dateReturn,
      days: Math.trunc(days),
      timeForPickUp: values.timeForPickUp.value,
    };

    // console.log(bookingDetails);
    props.dispatch({
      type: checkoutActionTypes.SET_CHECKOUT_DETAILS_FOR_BOOKING,
      payload: bookingDetails,
    });

    if (isSignedIn) {
      history.push("/checkout");
    } else {
      // console.log("tentando mostrar modal");
      //show modal and redirect to login page
    }
  };

  const { valid } = props;

  const renderForm = () => (
    <Form onSubmit={props.handleSubmit(onSubmit)} className="ui form formStyle">
      <h2>Booking details</h2>
      <Form.Field>
        <label>Date to pick up your car</label>
        <Field
          required
          name="datePickUp"
          component={renderDateTimePicker}
          label="Enter a pickup date"
          showTime="false"
          autocomplete="new-password"
          style={{ marginBottom: "30px" }}
        />
      </Form.Field>

      <Form.Field>
        <label>Date to return your car</label>
        <Field
          required
          name="dateReturn"
          component={renderDateTimePicker}
          label="Enter a pickup date"
          showTime="false"
          autocomplete="new-password"
          style={{ marginBottom: "30px" }}
        />
      </Form.Field>
      <Form.Field>
        <label>Time to pick up your car</label>
        <Field
          required
          name="timeForPickUp"
          component={renderDropDownList}
          className="w-2/5 mt-0"
        />
      </Form.Field>
      <Button content="Go back" onClick={history.goBack} color="teal" />
      <Modal
        trigger={
          <Button primary disabled={!valid}>
            Go to checkout
          </Button>
        }
        header="Redirecting you"
        content="You need be logged in to book the car"
        actions={[{ key: "OK", content: "Yes, please", positive: true }]}
        onActionClick={handleRedirect}
      ></Modal>
    </Form>
  );

  const handleRedirect = () => {
    history.push("/Signinorregister");
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <Container>
        <div className="box">
          <CarsCard car={car} />

          {renderForm()}
        </div>
      </Container>
    </div>
  );
};

const validate = (formValues, props) => {
  // console.log("props propds", props);
  const errors = {};

  // if (countDays(formValues) <= 0) {
  //   errors.dateReturn = "Return date should be after picking up the car";
  // }

  if (!formValues.datePickUp) {
    errors.datePickUp = "You must enter a date to pick up the car";
  }

  if (!formValues.dateReturn) {
    errors.datePickUp = "You must enter a date to pick up the car";
  }

  if (!formValues.timeForPickUp) {
    errors.datePickUp = "You must enter a date to pick up the car";
  }

  return errors;
};

export default reduxForm({
  form: "bookingDetails",
  validate: validate,
})(CarRentingPage);
