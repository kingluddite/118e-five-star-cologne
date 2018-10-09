import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// GraphQL
import { Mutation } from 'react-apollo';
import {
  ADD_COLOGNE,
  GET_ALL_COLOGNES,
  GET_USER_COLOGNES,
} from '../../queries';

// Auth
import withAuth from '../withAuth';

const initialState = {
  scentName: '',
  scentBrand: '',
  scentPrice: 0,
  description: '',
  username: '',
};

class AddCologne extends Component {
  state = {
    ...initialState,
  };

  clearState = () => {
    this.setState({
      ...initialState,
    });
  };

  componentDidMount = () => {
    this.setState({
      username: this.props.session.getCurrentUser.username,
    });
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event, addCologne) => {
    event.preventDefault();
    addCologne().then(({ data }) => {
      // console.log(data);
      this.clearState();
      this.props.history.push('/');
    });
  };

  updateCache = (cache, { data: { addCologne } }) => {
    // read the query
    const { getAllColognes } = cache.readQuery({
      query: GET_ALL_COLOGNES,
    });

    // write to the query
    cache.writeQuery({
      query: GET_ALL_COLOGNES,
      data: {
        getAllColognes: [addCologne, ...getAllColognes],
      },
    });
  };

  render() {
    const {
      scentName,
      scentBrand,
      scentPrice,
      description,
      username,
    } = this.state;

    return (
      <div className="App">
        <h2 className="App">Add Cologne</h2>
        <Mutation
          mutation={ADD_COLOGNE}
          variables={{
            scentName,
            scentBrand,
            scentPrice,
            description,
            username,
          }}
          refetchQueries={() => [
            {
              query: GET_USER_COLOGNES,
              variables: { username },
            },
          ]}
          update={this.updateCache}
        >
          {(addCologne, { data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error</div>;
            // console.log(data);

            return (
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, addCologne)}
              >
                <label htmlFor="scentName">Scent Name</label>
                <input
                  type="text"
                  id="scentName"
                  name="scentName"
                  placeholder="Scent Name"
                  onChange={this.handleChange}
                  value={scentName}
                />
                <label htmlFor="scentBrand">Scent Brand</label>
                <input
                  type="text"
                  id="scentBrand"
                  name="scentBrand"
                  placeholder="Scent Brand"
                  onChange={this.handleChange}
                  value={scentBrand}
                />
                <label htmlFor="scentPrice">Scent Price</label>
                <input
                  type="text"
                  id="scentPrice"
                  name="scentPrice"
                  placeholder="Scent Price"
                  onChange={this.handleChange}
                  value={scentPrice}
                />
                <label htmlFor="description">Scent Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Scent Description"
                  onChange={this.handleChange}
                  value={description}
                />
                <button className="button-primary">Add Cologne</button>
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(AddCologne)
);
