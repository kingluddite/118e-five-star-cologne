import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

// GraphQL
import { Query, Mutation } from 'react-apollo';
import {
  GET_USER_COLOGNES,
  DELETE_USER_COLOGNE,
  GET_ALL_COLOGNES,
  GET_CURRENT_USER,
} from '../../queries';

// custom components
import EditCologneModal from '../Cologne/EditCologneModal';

class UserColognes extends Component {
  state = {
    _id: '',
    scentName: '',
    scentBrand: '',
    scentPrice: 0,
    description: '',
    modal: false,
  };

  loadCologne = cologne => {
    // console.log(cologne);
    this.setState({ ...cologne, modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  handleDelete = deleteUserCologne => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this cologne?'
    );

    if (confirmDelete) {
      deleteUserCologne().then(({ data }) => {
        console.log(data);
      });
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event, updateUserCologne) => {
    event.preventDefault();
    updateUserCologne().then(({ data }) => {
      this.closeModal();
    });
  };

  render() {
    const { username } = this.props;
    const { modal } = this.state;
    return (
      <Query query={GET_USER_COLOGNES} variables={{ username }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;
          // console.log(data);

          return (
            <ul>
              {modal && (
                <EditCologneModal
                  handleChange={this.handleChange}
                  closeModal={this.closeModal}
                  cologne={this.state}
                  handleSubmit={this.handleSubmit}
                />
              )}
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
                  <p style={{ marginBottom: '0' }}>Likes: {cologne.likes}</p>
                  <Mutation
                    mutation={DELETE_USER_COLOGNE}
                    variables={{ _id: cologne._id }}
                    refetchQueries={() => [
                      { query: GET_ALL_COLOGNES },
                      { query: GET_CURRENT_USER },
                    ]}
                    update={(cache, { data: { deleteUserCologne } }) => {
                      // console.log(cache, data);
                      const { getUserColognes } = cache.readQuery({
                        query: GET_USER_COLOGNES,
                        variables: { username },
                      });

                      cache.writeQuery({
                        query: GET_USER_COLOGNES,
                        variables: { username },
                        data: {
                          getUserColognes: getUserColognes.filter(
                            cologne => cologne._id !== deleteUserCologne._id
                          ),
                        },
                      });
                    }}
                  >
                    {(deleteUserCologne, attrs = {}) => {
                      return (
                        <Fragment>
                          <button
                            type="button"
                            className="button-primary"
                            onClick={() => this.loadCologne(cologne)}
                          >
                            Update
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => this.handleDelete(deleteUserCologne)}
                          >
                            {attrs.loading ? 'deleting...' : 'X'}
                          </button>
                        </Fragment>
                      );
                    }}
                  </Mutation>
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
