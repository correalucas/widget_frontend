import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert, Button, Jumbotron, Container } from 'reactstrap';
import { widgetActions } from '../_actions';
import { history } from '../_helpers';

class NewWidgetPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      widget: {
        name: '',
        description: '',
        kind: 'visible'
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    const { widget } = this.state;
    this.setState({
      widget: {
        ...widget,
        [name]: value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { widget } = this.state;
    const { dispatch } = this.props;

    dispatch(widgetActions.create(widget));
  }

  componentWillReceiveProps(props) {
    console.log(props);
    if(props.widgetReducer && props.widgetReducer.created){
      history.push('/myprofile');
    }
  }

  render() {
    const { alert } = this.props;
    const { widget, submitted } = this.state;
    return (
      <div>
        <Jumbotron>
          <Container>
            <h2 className="pageTitle">Create Widget</h2>
            {alert.message && <Alert color={alert.type}>{alert.message}</Alert>}
            <form name="form" onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" name="name" value={widget.name} onChange={this.handleChange} />
              </div>
              <div className='form-group'>
                <label htmlFor="description">Description</label>
                <textarea className="form-control" name="description" value={widget.description} onChange={this.handleChange} />
              </div>
              <div className='form-group'>
                <label htmlFor="kind">Kind</label>
                <select value={widget.kind} onChange={this.handleChange} name="kind" className="form-control">
                  <option value="visible">Visible</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>
              <div className="form-group">
                <button className="btn btn-primary">Create</button>
              </div>
            </form>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert, widgetReducer } = state;
  return state;
}

const connectedNewWidgetPage = connect(mapStateToProps)(NewWidgetPage);
export { connectedNewWidgetPage as NewWidgetPage };