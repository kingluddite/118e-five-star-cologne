import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

// custom components
import Signout from "../Auth/Signout";

class NavbarAuth extends Component {
  static propTypes = {
    session: PropTypes.object
  };

  static defaultProps = {
    session: {}
  };

  render() {
    const { session } = this.props;
    return (
      <Fragment>
        <h2>Auth</h2>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/cologne/add">Add Cologne</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <Signout />
          </li>
        </ul>
        <h2>
          Welcome <strong>{session.getCurrentUser.username}</strong>
        </h2>
      </Fragment>
    );
  }
}

export default NavbarAuth;
