import React, { Component } from 'react';

// GraphQL
import { ApolloConsumer } from 'react-apollo';
import { SEARCH_COLOGNES } from '../../queries';

// custom components
import SearchItem from './SearchItem;';

class Search extends Component {
  state = {
    searchResults: [],
  };

  handleChange = ({ searchColognes }) => {
    this.setState({
      searchResults: searchColognes,
    });
  };

  render() {
    const { searchResults } = this.state;

    return (
      <ApolloConsumer>
        {client => {
          return (
            <div className="App">
              <input
                type="search"
                placeholder="Search for Colognes"
                name="search"
                id="search"
                onChange={async event => {
                  event.persist();
                  const { data } = await client.query({
                    query: SEARCH_COLOGNES,
                    variables: { searchTerm: event.target.value },
                  });
                  this.handleChange(data);
                }}
              />
              <ul>
                {searchResults.map(cologne => {
                  return <SearchItem key={cologne._id} {...cologne} />;
                })}
              </ul>
            </div>
          );
        }}
      </ApolloConsumer>
    );
  }
}

export default Search;
