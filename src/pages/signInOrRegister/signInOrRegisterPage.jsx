import React from "react";
import { Grid } from "semantic-ui-react";

import Register from "../../components/register/register.component";
import SignIn from "../../components/SignIn/signIn";

import "./signInOrRegisterPage.style.css";

const SignInOrRegisterPage = () => {
  return (
    <div className="ui container" style={{ marginTop: "100px" }}>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <SignIn />
          </Grid.Column>
          <Grid.Column>
            <Register />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {/* <SignUp />   */}
    </div>
  );
};

export default SignInOrRegisterPage;
