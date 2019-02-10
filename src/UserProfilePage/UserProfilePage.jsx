import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { widgetActions } from '../_actions';
import { Profile } from '../_components';
import { Widget } from '../_components';

class UserProfilePage extends Component {
  componentDidMount() {
    const { userId } = this.props.match.params;
    this.props.dispatch(userActions.show(userId));
    this.getResults();
  }

  handleInputChange = (field, value) => {

    this.setState({[field]: value}, () => {
      this.getResults();
    })
  }

  getResults = () => {
    const { userId } = this.props.match.params;
    this.props.dispatch(widgetActions.userWidgets(userId, this.state));
  }

  render() {
    const { userReducer, widgetReducer } = this.props;
    return (
      <div>
        <Profile title="User Profile" data={userReducer.data} page="userprofile" />
        <Widget title="User Widgets" color="colorwhite" data={widgetReducer.data} page="userwidgets" handleInputChange={this.handleInputChange.bind(this)} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert, widgetReducer } = state;
  return state;
}

const connectedUserProfilePage = connect(mapStateToProps)(UserProfilePage);
export { connectedUserProfilePage as UserProfilePage };