import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert, Button } from 'reactstrap';
import { userActions } from '../_actions';

class SignupPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        image_url: ''
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

    dispatch(userActions.signup(user));
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
            <label htmlFor="first_name">First name</label>
            <input type="text" className="form-control" name="first_name" value={user.first_name} onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor="last_name">Last name</label>
            <input type="text" className="form-control" name="last_name" value={user.last_name} onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor="image_url">Profile image url</label>
            <input type="text" className="form-control" name="image_url" value={user.image_url} onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor="email">E-mail</label>
            <input type="email" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Signup</button>
            <Button onClick={this.handleOnClick.bind(this)} color="link">Login</Button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return { alert };
}

const connectedSignupPage = connect(mapStateToProps)(SignupPage);
export { connectedSignupPage as SignupPage };