import React, { Component } from 'react';

import { MyModal } from './MyModal';
import { LoginPage } from '../LoginPage';
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

  toggleMyModalLogin = () => {
    this.setState({ modalTitle: 'Login', bodyContent: <LoginPage /> });
    this.myModal.current.toggle();
  }

  toggleMyModalRegistration = () => {
    this.setState({ modalTitle: 'Login', bodyContent: <RegistrationPage /> });
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
                localStorage.getItem('auth') ? '' :
                <NavItem>
                  <Button color="link" onClick={this.toggleMyModalLogin}>Login</Button>
                </NavItem>
              }
              <NavItem>
              {localStorage.getItem('auth') ? <Button color="link" onClick={this.logout}>Logout</Button> : '' }
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}