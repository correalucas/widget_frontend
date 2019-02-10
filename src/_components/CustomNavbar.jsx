import React, { Component } from 'react';

import { MyModal } from './MyModal';
import { LoginPage } from '../LoginPage';
import { SignupPage } from '../SignupPage';
import { ResetPasswordPage } from '../ResetPasswordPage';
import { authActions } from '../_actions';

import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

export class CustomNavbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = { isOpen: false };
    this.myModal = React.createRef();
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  renderLogin = () => {
    this.setState({ modalTitle: 'Login', bodyContent: <LoginPage renderSignup={this.renderSignup} renderResetPassword={this.renderResetPassword} /> });
  }

  toggleMyModalLogin = () => {
    this.renderLogin();
    this.myModal.current.toggle();
  }

  renderSignup = () => {
    this.setState({ modalTitle: 'Registration', bodyContent: <SignupPage renderLogin={this.renderLogin} /> });
  }

  renderResetPassword = () => {
    this.setState({ modalTitle: 'Reset Password', bodyContent: <ResetPasswordPage renderLogin={this.renderLogin} /> });
  }

  toggleMyModalSignup = () => {
    this.renderSignup();
    this.myModal.current.toggle();
  }

  logout = () => {
    authActions.logout();
  }

  render() {
    const { modalTitle, bodyContent } = this.state;
    return (
      <div>
        <MyModal ref={this.myModal} modalTitle={modalTitle} bodyContent={bodyContent} />
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Widget App</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {
                localStorage.getItem('auth') ?
                <NavItem>
                  <Button color="link" onClick={this.logout}>Logout</Button>
                </NavItem>
                 :
                <React.Fragment>
                  <NavItem>
                    <Button color="link" onClick={this.toggleMyModalLogin}>Login</Button>
                  </NavItem>
                  <NavItem>
                    <Button color="link" onClick={this.toggleMyModalSignup}>Signup</Button>
                  </NavItem>
                </React.Fragment>
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}