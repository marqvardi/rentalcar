import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Form } from "semantic-ui-react";
import { auth, signWithGoogle } from "../../firebase/firebase.utils";
import { userActionTypes } from "../../redux/reducers/userReducer/userActionTypes";
import "./signIn.styles.css";
import { toast } from "react-toastify";
import history from "../../util/history";

class SignIn extends React.Component {
  onSubmit = async (values) => {
    // console.log("Send values to firestore", values);

    try {
      const data = await auth.signInWithEmailAndPassword(
        values.email,
        values.password
      );
      this.props.dispatch({
        type: userActionTypes.CURRENT_USER,
        payload: data,
      });
      history.push("/");
    } catch (error) {
      toast.error(error.message);
      // console.log(error);
    }
  };

  renderInput = ({ input, label, type, meta: { error, touched } }) => (
    <div className="field">
      <label>{label}</label>
      <input {...input} type={type} autoComplete="off" />
      <div style={{ color: "red" }}>{touched ? error : ""}</div>
    </div>
  );

  render() {
    const { valid } = this.props;
    // console.log(this.props);
    return (
      <div className="sign-in">
        <h2>Login using your email and password</h2>
        <Form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form"
        >
          <Field
            name="email"
            component={this.renderInput}
            label="Email"
            type="email"
            placeholder="Email"
          />
          <Field
            name="password"
            component={this.renderInput}
            label="Password"
            type="password"
            placeholder="Password"
          />

          <button
            floated="left"
            className="ui button primary"
            type="submit"
            disabled={!valid}
          >
            Sign in
          </button>
        </Form>

        <h2 style={{ marginTop: "50px" }}>
          Or you can log with your google account below
        </h2>
        <Button
          style={{ marginTop: "10px" }}
          color="google plus"
          floated="right"
          onClick={signWithGoogle}
          content="Sign in with google"
          type="button"
        />
      </div>
    );
  }
}

export default reduxForm({ form: "signInForm" })(SignIn);
