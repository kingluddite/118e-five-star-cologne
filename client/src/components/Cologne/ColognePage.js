import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ColognePage extends Component {
  render() {
    const { match } = this.props;
    // console.log(match.params._id);
    const { _id } = match.params;
    return <div>ColognePage</div>;
  }
}

export default withRouter(ColognePage);
