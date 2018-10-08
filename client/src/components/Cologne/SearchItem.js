import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchItem extends Component {
  render() {
    const { _id, scentName, likes } = this.props;
    return (
      <li>
        <Link to={`/cologne/${_id}`}>
          <h4>Scent Name: {scentName}</h4>
          <p>Likes: {likes}</p>
        </Link>
      </li>
    );
  }
}

export default SearchItem;
