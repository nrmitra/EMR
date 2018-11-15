import React from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
  Navbar,
  Form, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  FormGroup,
  Input,
  Table
 } from "reactstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ReactLoading from 'react-loading';
import {client} from "../../index";
import { confirmAlert } from "react-confirm-alert"; 
import "react-confirm-alert/src/react-confirm-alert.css";

const ListUser = (props) => (
  <Query
    query={gql`
    query allPrescriptions($userid: ID!){
      
      allPrescriptions(
        filter : {
          user : {
            id : $userid
          }
      }
      ){
        id
        docname
        docid
        details
        createdAt
        owner
        chember
        med
        updatedAt
        phn
        nid
      }
    }
    `}
    variables={
      {
        userid : props.state.logInfoId
      }
    }
  >
    {({ loading, error, data }) => {
      if (loading) return <div>
      <ReactLoading className="loadingScreenAnimation" type={'spin'} color={'white'} height={'60%'} width={'60%'} />
      </div>;
      if (error) return <p>Error :(</p>;

      return data.allPrescriptions.map(({ id, docname, details, createdAt, owner, docid, chember, med, updatedAt, phn, nid }) => (
          
          <Col key={id+1} xs="auto">
          
          <Card style={{width: '20rem'}}>
          <CardImg top src="http://icons-for-free.com/free-icons/png/512/1290990.png" alt="..."/>
          <CardBody>
            <CardTitle>Doctor : {docname}</CardTitle>
            <CardText><b>Problem :</b> {details}</CardText>
            <CardText><b>Date :</b> {createdAt}</CardText>
            <Button key={id+2} onClick={() => {props.toggle(id)}} color="primary">View</Button>
            <Modal key={id+3} isOpen={props.state.modal && props.state.viewPresciptionId === id} toggle={props.toggle} >
            <ModalHeader toggle={props.toggle}><p>Prescription of <b><i>{owner}</i></b></p></ModalHeader>
            <ModalBody>
            <Table key={id+4} bordered>
  
              <tbody>
              <tr>
              <td>
              Prescription Id : &nbsp; {id}
              </td>
              </tr>
              <tr>
              <td>
              Created at :  &nbsp; {createdAt}
              </td>
              </tr>
              <tr>
              <td>
              Doctor :  &nbsp; {docname}
              </td>
              </tr>
              <tr>
              <td>
              DocID :  &nbsp; {docid}
               </td>
              </tr>
              <tr>
              <td>
              Paitent contact no :  &nbsp; {phn}
              </td>
              </tr>
              <tr>
              <td>
              Chember :  &nbsp; {chember}
              </td>
              </tr>
              <tr>
              <td>
              Details :  &nbsp; {details}
              </td>
              </tr>
              <tr>
              <td>
              Medicine :  &nbsp; {med}
              </td>
              </tr>
              <tr>
              <td>
              Last Updated :  &nbsp; {updatedAt}
              </td>
              </tr>
              </tbody>
            </Table>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={props.toggle}>Back</Button>
            </ModalFooter>
            </Modal>

          </CardBody>
          </Card>
          </Col>
      ));
    }}
  </Query>
  );

class UserPrescription extends React.Component {

  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    
    if (typeof(props.history.location.state) == 'undefined' || props.history.location.state == null) {
      this.props.history.push({
        pathname: '/unauth',
      });
    }
    else {
        this.state = {
        modal: false,
        viewPresciptionId: null,
        logInfoId : this.props.history.location.state.logInfo[0],
        logInfoToken : this.props.history.location.state.logInfo[1],
        uname : this.props.history.location.state.logInfo[2]
      }
        console.log(this.state.logInfoId);
        console.log(this.state.logInfoToken);
        console.log(this.state.uname);
        
        
    }

  }

  toggle(viewPresciptionId) {
    this.setState({
      modal: !this.state.modal,
      viewPresciptionId
    });
  }

  
  render() {
    return (
      <div className="content">
      <Navbar expand="lg" color="dark">
      <Form inline className="ml-auto">
       <FormGroup className={"no-border"}>
        <Input type="text" placeholder="Search"/>
      </FormGroup>
      <Button color="neutral" icon round>
       <i className="nc-icon nc-zoom-split"></i>
     </Button>
      </Form>
      </Navbar>
      <div>
      <Row className="helper">

      <ListUser toggle={this.toggle} state={this.state} delete={this.delete} preDelete={this.preDelete} up={this.up}/>

      </Row>
      </div>
      </div>
    );
  }
}

export default UserPrescription;