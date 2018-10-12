import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

// graphql
import { Mutation } from "react-apollo";
import { LIKE_COLOGNE } from "../../queries";

// custom components
import withSession from "../withSession";

class LikeCologne extends Component {
  static propTypes = {
    session: PropTypes.object.isRequired,
    _id: PropTypes.string.isRequired
  };

  state = {
    username: ""
  };

  componentDidMount = () => {
    const { session } = this.props;
    console.log(session);

    if (session.getCurrentUser) {
      const { username } = session.getCurrentUser;
      console.log(username);
      this.setState({
        username
      });
    }
  };

  handleLike = likeCologne => {
    // pass control of likeCologne to handleLike
    likeCologne().then(({ data }) => {
      console.log(data);
    });
  };

  render() {
    const { username } = this.state;
    const { _id } = this.props;

    return (
      <Fragment>
        <Mutation mutation={LIKE_COLOGNE} variables={{ username, _id }}>
          {likeCologne =>
            username && (
              <button
                onClick={() => this.handleLike(likeCologne)}
                type="button"
              >
                Like
              </button>
            )
          }
        </Mutation>
      </Fragment>
    );
  }
}

export default withSession(LikeCologne);
