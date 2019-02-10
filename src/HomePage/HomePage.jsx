import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CardColumns, Card, CardTitle, CardSubtitle } from 'reactstrap';
import { widgetActions } from '../_actions';
import { Widget } from '../_components';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getResults()
  }

  handleInputChange = (field, value) => {
    this.setState({[field]: value}, () => {
      this.getResults();
    })
  }

  getResults = () => {
    this.props.dispatch(widgetActions.visibles(this.state));
  }

  render() {
    const { widgetReducer } = this.props;
    return (
      <div>
        <Widget title="Visible Widgets" color="colorwhite" data={widgetReducer.data} page="visibles" handleInputChange={this.handleInputChange.bind(this)} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert, widgetReducer } = state;
  return state;
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };