import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// GraphQL
import { Query } from 'react-apollo';
import { GET_COLOGNE } from '../../queries';

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
            scentPrice,
            createdDate,
            likes,
            description,
            username,
          } = data.getCologne;

          return (
            <div className="App">
              <h2>Scent Name: {scentName}</h2>
              <p>{createdDate}</p>
              <p>Scent Price: {scentPrice}</p>
              <p>Description: {description}</p>
              <p>Likes: {likes}</p>
              <p>Created By: {username}</p>
              <button>Like</button>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(ColognePage);
