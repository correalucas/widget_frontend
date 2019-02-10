import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert, Button, Jumbotron, Container } from 'reactstrap';
import { userActions } from '../_actions';
import { history } from '../_helpers';

class EditProfilePage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(userActions.myProfile());
    this.state = {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        image_url: '',
        date_of_birth: ''
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      user: {
        first_name: props.userReducer.data.first_name,
        last_name: props.userReducer.data.last_name,
        image_url: props.userReducer.data.images.medium_url,
        email: props.userReducer.data.email,
        date_of_birth: props.userReducer.data.date_of_birth || '',
      }
    });
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

    console.log(user);

    dispatch(userActions.update(user));
  }

  render() {
    const { alert } = this.props;
    const { user, submitted } = this.state;
    return (
      <div>
        <Jumbotron>
          <Container>
            <h2 className="pageTitle">Edit Profile</h2>
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
                <label htmlFor="date_of_birth">Date of birth</label>
                <input type="text" className="form-control" name="date_of_birth" value={user.date_of_birth} onChange={this.handleChange} />
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

const connectedEditProfilePage = connect(mapStateToProps)(EditProfilePage);
export { connectedEditProfilePage as EditProfilePage };