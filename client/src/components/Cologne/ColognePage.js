import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// GraphQL
import { Query } from "react-apollo";
import { GET_COLOGNE } from "../../queries";

// utilities
import { formatDate } from "../../utilities";

// custom components
import LikeCologne from "./LikeCologne";

class ColognePage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  };

  render() {
    const { match } = this.props;
    const { _id } = match.params;

    return (
      <Query query={GET_COLOGNE} variables={{ _id }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error</div>;
          // console.log(data);

          const {
            scentName,
            scentBrand,
            scentPrice,
            createdDate,
            likes,
            description,
            username
          } = data.getCologne;

          return (
            <div className="App">
              <h2>Scent Name: {scentName}</h2>
              <p>
                <strong>Created Date: </strong>
                {formatDate(createdDate)}
              </p>
              <p>
                <strong>Scent Brand: </strong>
                {scentBrand}
              </p>
              <p>
                <strong>Scent Price: </strong>
                {scentPrice}
              </p>
              <p>
                <strong>Description: </strong>
                {description}
              </p>
              <p>
                <strong>Likes: </strong>
                {likes}
              </p>
              <p>
                <strong>Created By: </strong>
                {username}
              </p>
              <LikeCologne _id={_id} />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(ColognePage);
