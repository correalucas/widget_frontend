import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert, Button, Jumbotron, Container } from 'reactstrap';
import { widgetActions } from '../_actions';
import { history } from '../_helpers';

class EditWidgetPage extends Component {
  constructor(props) {
    super(props);
    const { widgetReducer } = props;
    let widgetData = widgetReducer.data[0];
    this.state = {
      widget: {
        name: widgetData && widgetData.name || '',
        description: widgetData && widgetData.description || '',
        kind: widgetData && widgetData.kind || 'visible'
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

    const { widgetId } = this.props.match.params;
    this.setState({ submitted: true });
    const { widget } = this.state;
    const { dispatch } = this.props;

    dispatch(widgetActions.update(widgetId, widget));
  }

  componentWillReceiveProps(props) {
    if(props.widgetReducer && props.widgetReducer.updated){
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
            <h2 className="pageTitle">Edit Widget</h2>
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
  const { alert, widgetReducer } = state;
  return state;
}

const connectedEditWidgetPage = connect(mapStateToProps)(EditWidgetPage);
export { connectedEditWidgetPage as EditWidgetPage };