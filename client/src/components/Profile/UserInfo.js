import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// utility functions
import { formatDate } from "../../utilities";

class UserInfo extends Component {
  static propTypes = {
    session: PropTypes.object.isRequired
  };

  render() {
    const { session } = this.props;

    return (
      <div>
        <h3>User Info</h3>
        <p>Username: {session.getCurrentUser.username}</p>
        <p>Email: {session.getCurrentUser.email}</p>
        <p>Join Date: {formatDate(session.getCurrentUser.joinDate)}</p>
        <ul>
          <h3>
            {session.getCurrentUser.username.toUpperCase()}
            's Favorites
          </h3>
          {session.getCurrentUser.favorites.map(favorite => (
            <li key={favorite._id}>
              <Link to={`/cologne/${favorite._id}`}>
                <p>{favorite.scentName}</p>
              </Link>
            </li>
          ))}
          {!session.getCurrentUser.favorites.length && (
            <p>
              <strong>You currently have no favorites. Go add some!</strong>
            </p>
          )}
        </ul>
      </div>
    );
  }
}

export default UserInfo;
