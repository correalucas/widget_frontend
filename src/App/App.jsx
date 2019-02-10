import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import { Container } from 'reactstrap';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute, CustomNavbar } from '../_components';
import { HomePage } from '../HomePage';
import { MyProfilePage } from '../MyProfilePage';
import { EditProfilePage } from '../EditProfilePage';
import { UserProfilePage } from '../UserProfilePage';
import { ChangePasswordPage } from '../ChangePasswordPage';
import { NewWidgetPage } from '../NewWidgetPage';
import { EditWidgetPage } from '../EditWidgetPage';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CustomNavbar />
        <br/>
        <Container>
          <Router history={history}>
            <div>
              <Route exact path="/" component={HomePage} />
              <PrivateRoute exact path="/myprofile" component={MyProfilePage} />
              <PrivateRoute exact path="/editprofile" component={EditProfilePage} />
              <PrivateRoute exact path="/changepassword" component={ChangePasswordPage} />
              <PrivateRoute exact path="/newwidget" component={NewWidgetPage} />
              <PrivateRoute exact path="/users/:userId" component={UserProfilePage} />
              <PrivateRoute exact path="/widgets/:widgetId/edit" component={EditWidgetPage} />
            </div>
          </Router>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
