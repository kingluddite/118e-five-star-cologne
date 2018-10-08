import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Mutation } from 'react-apollo';
import { SIGNIN_USER } from '../../queries';

// components
import Error from '../Error';

const initialState = {
  username: '',
  password: '',
};

class Signin extends Component {
  state = {
    ...initialState,
  };

  clearState = () => {
    this.setState({
      ...initialState,
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event, signinUser) => {
    event.preventDefault();
    signinUser().then(async ({ data: { signinUser } }) => {
      // console.log(signinUser.data);
      localStorage.setItem('token', signinUser.token);
      await this.props.refetch();
      this.clearState();
      // redirect to home page
      this.props.history.push('/');
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
          {(signinUser, { data, loading, error }) => {
            return (
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, signinUser)}
              >
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  onChange={this.handleChange}
                  value={username}
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                  value={password}
                />
                <div>
                  <button
                    className="button-primary"
                    disabled={loading || this.validateForm()}
                  >
                    Signin
                  </button>
                  {error && <Error error={error} />}
                </div>
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(Signin);
