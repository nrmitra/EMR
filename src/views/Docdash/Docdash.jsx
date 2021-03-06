import React from "react";
import { 
  Card, 
  CardTitle, 
  Row, 
  Col,
  CardImg,
  CardBody
  } from "reactstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import Footer from "../../components/Footer/Footer";

class Docdash extends React.Component {

  constructor(props) {
    super(props);
    this.back = this.back.bind(this);
    this.search = this.search.bind(this);
    this.cp = this.cp.bind(this);
    this.sr = this.sr.bind(this);

    if (typeof(props.history.location.state) == 'undefined' || props.history.location.state == null) {
      this.props.history.push({
        pathname: '/unauth',
      });
    }
    else {
        this.state = {
        logInfoId : this.props.history.location.state.logInfo[1],
        logInfoToken : this.props.history.location.state.logInfo[0],
        uname : this.props.history.location.state.logInfo[2]
      }
        console.log(this.state.logInfoId);
    }
   
  }


  back() {
    this.props.history.push({
      pathname: '/auth',
    });
  }

  cp() {
    this.props.history.push({
      pathname: '/cp_doc',
      state: { logInfo: [this.state.logInfoId, 
        this.state.logInfoToken,
        this.state.uname
      ] }
    });
  }

  search() {
    this.props.history.push({
      pathname: '/docsearch',
      state: { logInfo: [this.state.logInfoId, 
        this.state.logInfoToken,
        this.state.uname] }
    });
  }

  sr() {
    this.props.history.push({
      pathname: '/searchreport',
      state: { logInfo: [this.state.logInfoId, 
        this.state.logInfoToken,
        this.state.nid,
        this.state.phone,
        this.state.uname] }
    });
  }


  render() {
    return (
      <div className="ddmain">
          <img src ="https://images.vexels.com/media/users/3/144185/isolated/lists/a9075b02366ea61e8995f8d5b08d0267-flat-doctor-cartoon.png" />
            <h3>Welcome Doctor <b>{this.state.uname}</b> !!</h3>
              <Row className="ddcenterbuttongroup">
            <Col sm="4">
            <Card >
              <CardImg top src="https://us.123rf.com/450wm/hilch/hilch1802/hilch180200503/94767811-date-and-time-calendar-and-add-event-thin-line-flat-color-icon-vector-illustration-pictogram-isolate.jpg?ver=6" alt="..."/>
              <CardBody>
                  <CardTitle>Add Prescription</CardTitle>
                  <Button onClick={this.cp} color="primary">Add</Button>
              </CardBody>
            </Card>
            </Col>
            <Col sm="4">
            <Card >
              <CardImg top src="https://cdn.dribbble.com/users/77712/screenshots/1170246/flat_read.png" alt="..."/>
              <CardBody>
              <CardTitle>Search Prescription/Report</CardTitle>
                  <Button onClick={this.search} color="primary">Prescription</Button>
                  <Button onClick={this.sr} color="primary">Report</Button>
              </CardBody>
            </Card>
            </Col>
            <Col sm="4">
            <Card >
              <CardImg top src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Circle-icons-power.svg/1024px-Circle-icons-power.svg.png" alt="..."/>
              <CardBody>
                  <CardTitle>Log Out</CardTitle>
                  <Button onClick={this.back} color="primary" >Log Out</Button>
              </CardBody>
            </Card>
            </Col>
          </Row>
        <Footer />
      </div>
     
     
    );
  }
  
}

export default Docdash;
