import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { Profile } from '../_components';

class UserProfilePage extends Component {
  componentDidMount() {
    const { userId } = this.props.match.params
    this.props.dispatch(userActions.show(userId));
  }

  render() {
    const { userReducer } = this.props;
    return (
      <div>
        <Profile title="User Profile" data={userReducer.data} page="userprofile" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

const connectedUserProfilePage = connect(mapStateToProps)(UserProfilePage);
export { connectedUserProfilePage as UserProfilePage };