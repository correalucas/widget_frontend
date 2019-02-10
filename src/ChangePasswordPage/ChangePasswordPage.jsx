import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert, Button, Jumbotron, Container } from 'reactstrap';
import { userActions } from '../_actions';
import { history } from '../_helpers';

class ChangePasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        current_password: '',
        new_password: ''
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    if(props.userReducer && props.userReducer.updated){
      history.push('/myprofile');
    }
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

    dispatch(userActions.changePassword(user));
  }

  render() {
    const { alert } = this.props;
    const { user, submitted } = this.state;
    return (
      <div>
        <Jumbotron>
          <Container>
            <h2 className="pageTitle">Change Password</h2>
            {alert.message && <Alert color={alert.type}>{alert.message}</Alert>}
            <form name="form" onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <label htmlFor="current_password">Current Password</label>
                <input type="password" className="form-control" name="current_password" value={user.current_password} onChange={this.handleChange} />
              </div>
              <div className='form-group'>
                <label htmlFor="new_password">New Password</label>
                <input type="password" className="form-control" name="new_password" value={user.new_password} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <button className="btn btn-primary">Save</button>
              </div>
            </form>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { userReducer } = state;
  return state;

}

const connectedChangePasswordPage = connect(mapStateToProps)(ChangePasswordPage);
export { connectedChangePasswordPage as ChangePasswordPage };