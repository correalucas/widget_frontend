import React, { Component } from 'react';
import { Jumbotron, Container, Row, Col, Media } from 'reactstrap';
import { Link } from 'react-router-dom';

export class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props)
    const { title, data, page } = this.props;
    return (
      <div>
        <Jumbotron>
          <Container>
            <h2 className="pageTitle">
              {title}
              {page == 'myprofile' ?
                <React.Fragment>
                  <Link className="btn btn-outline-warning btn-sm float-right" to="/changepassword">Change password</Link>
                  <Link className="btn btn-outline-primary btn-sm float-right mr-10" to="/editprofile">Edit profile</Link>
                </React.Fragment>
              : ''}
            </h2>
            <Media>
              <Media left href="#">
                <img src={data && data.images && data.images.medium_url} alt="User image" className="myProfileImage" />
              </Media>
              <Media body>
                <Row>
                  <Col>
                    <label>Name</label>
                    <p className="form-control-static">{data && data.name}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label>E-mail</label>
                    <p className="form-control-static">{data && data.email}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label>Date of birth</label>
                    <p className="form-control-static">{data && data.date_of_birth}</p>
                  </Col>
                </Row>
              </Media>
            </Media>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}