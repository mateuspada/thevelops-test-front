import React, { Component } from 'react';
import { Row, Col, Input, Container, Button } from 'react-materialize';
import { btnStyle } from './Style';
//import { Config } from '../Config';

class ProfileEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: ''
        };
    }
    
    componentWillMount() {
        if((this.props.location.state.user !== undefined) && 
        (this.props.location.state.user)) {
            this.setState({
                user: this.props.location.state.user
            })
        }
    }
    
    render() {
        return (
            <Container>            
            <Row>
            <Col s={12}><h5 className="center-align"><b>Edit User</b></h5></Col>
            
            <Col s={6} offset="s3">
            <Input 
            name="email"
            type="email"                     
            label="Email" 
            value={this.state.user.email}
            s={12} />
            </Col>
            
            <Col s={6} offset="s3">
            <Input 
            name="firstName"                   
            label="First Name" 
            value={this.state.user.first_name}
            s={12} />
            </Col>
            
            <Col s={6} offset="s3">
            <Input 
            name="lastName"                  
            label="Last Name" 
            value={this.state.user.last_name}
            s={12} />
            </Col>
            
            <Col s={6} offset="s3">
            <Input 
            name="phone"
            type="tel"                     
            label="Phone" 
            value={this.state.user.personal_phone}
            s={12} />
            </Col>
            
            <Col s={6} offset="s3"><Button style={btnStyle} waves='light'>Submit</Button></Col>
            <Row />
            <Col s={6} offset="s3"><Button style={btnStyle} waves='light'>Delete User</Button></Col>            
            </Row>
            </Container>
            );
        }
    }
    
    export default ProfileEdit;