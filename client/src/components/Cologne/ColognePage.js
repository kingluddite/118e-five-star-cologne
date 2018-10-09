import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// GraphQL
import { Query } from 'react-apollo';
import { GET_COLOGNE } from '../../queries';

// utilities
import { formatDate } from '../../utilities';

class ColognePage extends Component {
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
            username,
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
              <button>Like</button>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(ColognePage);
