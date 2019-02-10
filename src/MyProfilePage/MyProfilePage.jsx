import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { widgetActions } from '../_actions';
import { Profile } from '../_components';
import { Widget } from '../_components';

class MyProfilePage extends Component {
  componentDidMount() {
    this.props.dispatch(userActions.myProfile());
    this.getResults();
  }

  handleInputChange = (field, value) => {
    this.setState({[field]: value}, () => {
      this.getResults();
    })
  }

  getResults = () => {
    this.props.dispatch(widgetActions.myWidgets(this.state));
  }

  render() {
    const { userReducer, widgetReducer } = this.props;
    console.log(widgetReducer);
    return (
      <div>
        <Profile title="My Profile" data={userReducer.data} page="myprofile" />
        <Widget title="My Widgets" color="colorwhite" data={widgetReducer.data} page="mywidgets" handleInputChange={this.handleInputChange.bind(this)} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert, widgetReducer } = state;
  return state;
}

const connectedMyProfilePage = connect(mapStateToProps)(MyProfilePage);
export { connectedMyProfilePage as MyProfilePage };