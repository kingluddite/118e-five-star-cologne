import React, { Component } from 'react';

// Auth
import withAuth from '../withAuth';

// custom components
import UserInfo from './UserInfo';
import UserColognes from '../Profile/UserColognes';

class Profile extends Component {
  render() {
    const { session } = this.props;
    return (
      <div>
        <UserInfo session={session} />
        <UserColognes username={session.getCurrentUser.username} />
      </div>
    );
  }
}

export default withAuth(session => session && session.getCurrentUser)(Profile);
