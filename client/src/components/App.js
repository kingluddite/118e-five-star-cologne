import React, { Component } from 'react';

// graphql stuff
import { Query } from 'react-apollo';
import { GET_ALL_COLOGNES } from '../queries';

// styles
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Five Star Colognes</h1>
        <Query query={GET_ALL_COLOGNES}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error</div>;
            console.log(data);

            return <p>Colognes</p>;
          }}
        </Query>
      </div>
    );
  }
}

export default App;
