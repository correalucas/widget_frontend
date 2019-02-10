import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert, Button } from 'reactstrap';
import { authActions } from '../_actions';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;

    dispatch(authActions.login(username, password));
  }

  handleRegister(e) {
    e.preventDefault();
    this.props.renderSignup();
  }

  handleResetPassword(e) {
    e.preventDefault();
    this.props.renderResetPassword();
  }

  render() {
    const { alert } = this.props;
    const { username, password, submitted } = this.state;
    return (
      <div>
        {alert.message && <Alert color={alert.type}>{alert.message}</Alert>}
        <form name="form" onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Login</button>
            <Button onClick={this.handleRegister.bind(this)} color="link">Register</Button>{' | '}
            <Button onClick={this.handleResetPassword.bind(this)} color="link">Reset password</Button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };