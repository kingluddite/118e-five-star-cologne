import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CologneItem extends Component {
  render() {
    const { _id, scentName } = this.props;

    return (
      <li>
        <h4>
          <Link to={`/cologne/${_id}`}>{scentName}</Link>
        </h4>
      </li>
    );
  }
}

export default CologneItem;
