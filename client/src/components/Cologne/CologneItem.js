import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class CologneItem extends Component {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    scentName: PropTypes.string.isRequired
  };

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
