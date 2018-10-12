import React, { Component } from "react";

// graphql stuff
import { Query } from "react-apollo";
import { GET_ALL_COLOGNES } from "../queries";

// custom components
import CologneItem from "./Cologne/CologneItem";

// styles
import "./App.scss";

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

            return (
              <ul>
                {data.getAllColognes.map(cologne => (
                  <CologneItem key={cologne._id} {...cologne} />
                ))}
              </ul>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default App;
