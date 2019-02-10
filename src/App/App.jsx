import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import { Container } from 'reactstrap';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute, CustomNavbar } from '../_components';
import { HomePage } from '../HomePage';

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
            </div>
          </Router>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
