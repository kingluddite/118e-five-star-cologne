import React, { Component } from "react";
import PropTypes from "prop-types";

// Auth
import withAuth from "../withAuth";

// custom components
import UserInfo from "./UserInfo";
import UserColognes from "./UserColognes";

class Profile extends Component {
  static propTypes = {
    session: PropTypes.object.isRequired
  };

  render() {
    const { session } = this.props;
    return (
      <div>
        <UserInfo session={session} />
        <UserColognes username={session.getCurrentUser.username} />
      </div>
    );
  }
}

export default withAuth(session => session && session.getCurrentUser)(Profile);
