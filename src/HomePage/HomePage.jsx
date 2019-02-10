import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class HomePage extends Component {
  componentDidMount() {
    // this.props.dispatch();
  }

  render() {
    return (
      <div>
        <h1>HomePage!</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return { alert };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };