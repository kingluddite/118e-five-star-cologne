import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// graphql
import { Mutation } from "react-apollo";
import { SIGNIN_USER } from "../../queries";

// components
import Error from "../Error";

const initialState = {
  username: "",
  password: ""
};

class Signin extends Component {
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
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (event, signinUser) => {
    console.log("test");
    const { history, refetch } = this.props;
    event.preventDefault();
    signinUser().then(async ({ data: { signinUser } }) => {
      /* eslint no-shadow: 0 */

      // console.log(signinUser.data);
      localStorage.setItem("token", signinUser.token);
      await refetch();
      this.clearState();
      // redirect to home page
      history.push("/");
    });
  };

  validateForm = () => {
    const { username, password } = this.state;
    const isInvalid = !username || !password;

    return isInvalid;
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="App">
        <h2 className="App">Signin</h2>
        <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
          {(signinUser, { data, loading, error }) => (
            <form
              className="form"
              onSubmit={event => this.handleSubmit(event, signinUser)}
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
                <span className="hide">Username</span>
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
                <span className="hide">Password</span>
              </label>
              <div>
                <button
                  type="submit"
                  className="button-primary"
                  disabled={loading || this.validateForm()}
                >
                  Signin
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

export default withRouter(Signin);
