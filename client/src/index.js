import React from 'react';
import ReactDOM from 'react-dom';

// apollo stuff
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// styles
import './index.css';
import App from './components/App';

// our apollo client
const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
