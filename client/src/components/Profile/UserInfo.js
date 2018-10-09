import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// utility functions
import { formatDate } from '../../utilities';

class UserInfo extends Component {
  render() {
    const {
      username,
      email,
      joinDate,
      favorites,
    } = this.props.session.getCurrentUser;

    return (
      <div>
        <h3>User Info</h3>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>Join Date: {formatDate(joinDate)}</p>
        <ul>
          <h3>
            {username.toUpperCase()}
            's Favorites
          </h3>
          {favorites.map(favorite => (
            <li key={favorite._id}>
              <Link to={`/cologne/${favorite._id}`}>
                <p>{favorite.scentName}</p>
              </Link>
            </li>
          ))}
          {!favorites.length && (
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
