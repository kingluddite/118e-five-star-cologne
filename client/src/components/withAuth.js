import React from 'react';
import { Redirect } from 'react-router-dom';

// GraphQL
import { Query } from 'react-apollo';
import { GET_CURRENT_USER } from '../queries';

const withAuth = conditionFunc => Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, error }) => {
      if (loading) return null;
      console.log(data);

      return conditionFunc(data) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      );
    }}
  </Query>
);

export default withAuth;
