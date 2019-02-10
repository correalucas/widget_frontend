import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert, Button } from 'reactstrap';
import { userActions } from '../_actions';

class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: ''
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;

    dispatch(userActions.resetPassword(user));
  }

  handleOnClick(e) {
    e.preventDefault();
    this.props.renderLogin();
  }

  render() {
    const { alert } = this.props;
    const { user, submitted } = this.state;
    return (
      <div>
        {alert.message && <Alert color={alert.type}>{alert.message}</Alert>}
        <form name="form" onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor="email">E-mail</label>
            <input type="email" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Reset password</button>
            <Button onClick={this.handleOnClick.bind(this)} color="link">Login</Button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

const connectedResetPasswordPage = connect(mapStateToProps)(ResetPasswordPage);
export { connectedResetPasswordPage as ResetPasswordPage };