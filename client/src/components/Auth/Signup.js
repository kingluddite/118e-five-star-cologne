import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// graphql
import { Mutation } from "react-apollo";
import { SIGNUP_USER } from "../../queries";

// components
import Error from "../Error";

const initialState = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: ""
};

class Signup extends Component {
  static propTypes = {
    refetch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    ...initialState
  };

  clearState = () => {
    this.setState({
      ...initialState
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    // console.log(name, ':', value);
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (event, signupUser) => {
    const { history, refetch } = this.props;
    event.preventDefault();
    signupUser().then(async ({ data: { signupUser } }) => {
      // console.log(signupUser.token);
      localStorage.setItem("token", signupUser.token);
      await refetch();
      this.clearState();
      // after signing up, redirect to home page
      history.push("/");
    });
  };

  validateForm = () => {
    const { username, email, password, passwordConfirmation } = this.state;
    const isInvalid =
      !username || !email || !password || password !== passwordConfirmation;

    return isInvalid;
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;

    return (
      <div className="App">
        <h2 className="App">Signup</h2>
        <Mutation
          mutation={SIGNUP_USER}
          variables={{ username, email, password }}
        >
          {(signupUser, { data, loading, error }) => (
            <form
              className="form"
              onSubmit={event => this.handleSubmit(event, signupUser)}
            >
              <label htmlFor="username">
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  onChange={this.handleChange}
                  value={username}
                />
                Username
              </label>
              <label htmlFor="email">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                  value={email}
                />
                Email
              </label>
              <label htmlFor="password">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                  value={password}
                />
                Password
              </label>
              <label htmlFor="passwordConfirmation">
                <input
                  type="password"
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  placeholder="Confirm Password"
                  onChange={this.handleChange}
                  value={passwordConfirmation}
                />
                Confirm Password
              </label>
              <div>
                <button
                  type="button"
                  className="button-primary"
                  disabled={loading || this.validateForm()}
                >
                  Signup
                </button>
                {error && <Error error={error} />}
              </div>
            </form>
          )}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(Signup);
