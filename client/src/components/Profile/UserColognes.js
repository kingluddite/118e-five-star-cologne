import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// GraphQL
import { Query } from 'react-apollo';
import { GET_USER_COLOGNES } from '../../queries';

class UserColognes extends Component {
  render() {
    const { username } = this.props;

    return (
      <Query query={GET_USER_COLOGNES} variables={{ username }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;
          // console.log(data);

          return (
            <ul>
              <h3>Your Colognes</h3>
              {!data.getUserColognes.length && (
                <p>
                  <strong>You have not added any colognes yet</strong>
                </p>
              )}
              {data.getUserColognes.map(cologne => (
                <li key={cologne._id}>
                  <Link to={`/cologne/${cologne._id}`}>
                    <p>{cologne.scentName}</p>
                  </Link>
                  <p>Likes: {cologne.likes}</p>
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}

export default UserColognes;
