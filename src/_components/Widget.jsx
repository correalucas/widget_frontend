import React, { Component } from 'react';
import { Alert, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { widgetActions } from '../_actions';
import { connect } from 'react-redux';

class Widget extends Component {
  constructor(props) {
    super(props);
  }

  onFieldChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    this.props.handleInputChange(fieldName, fieldValue);
  }

  handleDeleteWidget(id) {
    this.props.dispatch(widgetActions.destroy(id));
    this.props.handleInputChange('term', '');
  }

  render() {
    const { title, color, data, page } = this.props;
    return (
      <div>
        <h2 className={"pageTitle " + color}>
          {title}
          <form className="float-right col-sm-3 m0 p0">
            <input className="form-control" placeholder="Search for..." name="term" onChange={this.onFieldChange.bind(this)} />
          </form>
          {page == 'mywidgets' ? <Link className="btn btn-primary btn-sm float-right mr-10" to="/newwidget">New widget</Link> : ''}
        </h2>
          {data.length > 0 ?
            <React.Fragment>
              <div className="widgetColumns">
                {data.map((widget, index) =>
                  <div className="widget" key={widget.id} >
                    <div className="widgetTitle">
                      {widget.name}
                      {page == 'mywidgets' ?
                        <React.Fragment>
                          <Button outline color="danger" className="btn-sm float-right" onClick={() => { this.handleDeleteWidget(widget.id) }}>Delete</Button>
                          <Link className="btn btn-outline-primary btn-sm float-right mr-10" params={widget} to={"/widgets/" + widget.id + "/edit"}>Edit</Link>
                        </React.Fragment>
                        : ''
                      }
                    </div>
                    <div className="widgetBody">{widget.description}</div>
                    <div className="widgetFooter">
                      <Link to={"users/" + widget.user.id}>
                        <img src={widget.user.images.small_url} alt="User image" className="widgetImage" />
                        {widget.user.name}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </React.Fragment>
            :
            <React.Fragment>
              <Alert color="warning">No records found</Alert>
            </React.Fragment>
          }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert, widgetReducer } = state;
  return state;
}

const connectedWidget = connect(mapStateToProps)(Widget);
export { connectedWidget as Widget };