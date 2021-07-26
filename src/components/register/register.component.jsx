import React from "react";
import { Field, reduxForm } from "redux-form";
import { Form } from "semantic-ui-react";
import { createUserProfileDocument } from "../../firebase";
import { userActionTypes } from "../../redux/reducers/userReducer/userActionTypes";
import history from "../../util/history";
import { auth } from "../../firebase/firebase.utils";

import { toast } from "react-toastify";

class Register extends React.Component {
  renderInput = ({ input, label, type, meta: { error, touched } }) => (
    // console.log(input);

    <div className="field">
      <label>{label}</label>
      <input {...input} type={type} autoComplete="off" />
      <div style={{ color: "red" }}>{touched ? error : ""}</div>
    </div>
  );

  onSubmit = async (formValues) => {
    console.log(formValues);

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        formValues.email,
        formValues.password
      );

      await createUserProfileDocument(user, formValues);

      this.props.dispatch({
        type: userActionTypes.UPDATE_USER,
        payload: { ...formValues },
      });

      history.push("/");
    } catch (error) {
      toast.error(error.message);
      // console.log(error.message);
    }
  };

  render() {
    // console.log(this.props);
    const { valid } = this.props;

    return (
      <div>
        <h2>Create a new user</h2>

        <Form
          className="ui form"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <Field
            name="displayName"
            component={this.renderInput}
            label="Enter name"
            type="text"
          />

          <Field
            name="email"
            component={this.renderInput}
            label="Enter email"
            type="email"
          />
          <Field
            name="password"
            component={this.renderInput}
            label="Enter password"
            type="password"
          />
          <Field
            name="confirmPassword"
            component={this.renderInput}
            label="Confirm password"
            type="password"
          />
          <button className="ui button primary" disabled={!valid}>
            Submit
          </button>
        </Form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (formValues.password !== formValues.confirmPassword) {
    errors.confirmPassword = "Password don't match";
  }

  if (!formValues.displayName) {
    errors.displayName = "You must enter a name";
  }

  if (!formValues.email) {
    errors.email = "You must enter an email";
  }

  if (!formValues.password) {
    errors.password = "You must enter a password";
  }

  return errors;
};

export default reduxForm({
  form: "userCreateForm",
  validate: validate,
})(Register);
