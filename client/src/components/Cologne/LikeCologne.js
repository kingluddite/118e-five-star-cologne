import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

// graphql
import { Mutation } from "react-apollo";
import { LIKE_COLOGNE, GET_COLOGNE, UNLIKE_COLOGNE } from "../../queries";

// custom components
import withSession from "../withSession";

class LikeCologne extends Component {
  static propTypes = {
    session: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired,
    _id: PropTypes.string.isRequired
  };

  state = {
    liked: false,
    username: ""
  };

  componentDidMount = () => {
    const { session } = this.props;
    // console.log(session);

    if (session.getCurrentUser) {
      const { username, favorites } = session.getCurrentUser;
      // console.log(favorites);
      const { _id } = this.props;
      const prevLiked =
        favorites.findIndex(favorite => favorite._id === _id) > -1;

      this.setState({
        liked: prevLiked,
        username
      });
    }
  };

  handleClick = (likeCologne, unlikeCologne) => {
    this.setState(
      prevState => ({
        liked: !prevState.liked
      }),
      () => this.handleLike(likeCologne, unlikeCologne)
    );
  };

  handleLike = (likeCologne, unlikeCologne) => {
    const { refetch } = this.props;
    const { liked } = this.state;

    if (liked) {
      likeCologne().then(async ({ data }) => {
        // console.log(data);
        await refetch();
      });
    } else {
      // unlike cologne mutation
      // console.log('unlike');
      unlikeCologne().then(async ({ data }) => {
        await refetch();
      });
    }
    // pass control of likeCologne to handleLike
  };

  updateLike = (cache, { data: { likeCologne } }) => {
    const { _id } = this.props;
    const { getCologne } = cache.readQuery({
      query: GET_COLOGNE,
      variables: { _id }
    });

    cache.writeQuery({
      query: GET_COLOGNE,
      variables: { _id },
      data: {
        getCologne: { ...getCologne, likes: likeCologne.likes + 1 }
      }
    });
  };

  updateUnlike = (cache, { data: { unlikeCologne } }) => {
    const { _id } = this.props;
    const { getCologne } = cache.readQuery({
      query: GET_COLOGNE,
      variables: { _id }
    });

    cache.writeQuery({
      query: GET_COLOGNE,
      variables: { _id },
      data: {
        getCologne: { ...getCologne, likes: unlikeCologne.likes - 1 }
      }
    });
  };

  render() {
    const { username, liked } = this.state;
    const { _id } = this.props;

    return (
      <Fragment>
        <Mutation
          mutation={UNLIKE_COLOGNE}
          variables={{ _id, username }}
          update={this.updateUnlike}
        >
          {unlikeCologne => (
            <Mutation
              mutation={LIKE_COLOGNE}
              variables={{ _id, username }}
              update={this.updateLike}
            >
              {likeCologne =>
                username && (
                  <button
                    onClick={() => this.handleClick(likeCologne, unlikeCologne)}
                    type="button"
                  >
                    {liked ? "Unlike" : "Like"}
                  </button>
                )
              }
            </Mutation>
          )}
        </Mutation>
      </Fragment>
    );
  }
}

export default withSession(LikeCologne);
