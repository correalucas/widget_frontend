import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { Profile } from '../_components';

class MyProfilePage extends Component {
  componentDidMount() {
    this.props.dispatch(userActions.myProfile());
  }

  render() {
    const { userReducer } = this.props;
    return (
      <div>
        <Profile title="My Profile" data={userReducer.data} page="myprofile" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

const connectedMyProfilePage = connect(mapStateToProps)(MyProfilePage);
export { connectedMyProfilePage as MyProfilePage };