import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

class NavbarUnAuth extends Component {
  render() {
    return (
      <Fragment>
        <h2>Unauth</h2>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/search">Search</NavLink>
          </li>
          <li>
            <NavLink to="/signin">Signin</NavLink>
          </li>
          <li>
            <NavLink to="/signup">Signup</NavLink>
          </li>
        </ul>
      </Fragment>
    );
  }
}

export default NavbarUnAuth;
