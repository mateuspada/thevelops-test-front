import React, { Component } from 'react';
import { Row, Col, Input, Container, Button } from 'react-materialize';
import { btnStyle } from './Style';
import { Config } from '../Config';

class Profile extends Component {
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

    logout(event){
        localStorage.removeItem(Config.tokenName);
        this.props.history.push('/');
    }

    editUser(event){
        this.props.history.push('/user/'+this.state.user._id+'/edit');
    }

    editPassword(event){
        this.props.history.push('/user/'+this.state.user._id+'/edit_password');    
    }
    
    render() {
        return (
            <Container>            
            <Row>
            <Col s={12}><h5 className="center-align"><b>Get User</b></h5></Col>
            
            <Col s={6} offset="s3">
            <Input 
            name="email"
            type="email"                     
            label="Email" 
            value={this.state.user.email}
            readOnly={true}
            s={12} />
            </Col>
            
            <Col s={6} offset="s3">
            <Input 
            name="firstName"                   
            label="First Name" 
            value={this.state.user.first_name}
            readOnly={true}
            s={12} />
            </Col>
            
            <Col s={6} offset="s3">
            <Input 
            name="lastName"                  
            label="Last Name" 
            value={this.state.user.last_name}
            readOnly={true}
            s={12} />
            </Col>
            
            <Col s={6} offset="s3">
            <Input 
            name="phone"
            type="tel"                     
            label="Phone" 
            value={this.state.user.personal_phone}
            readOnly={true}
            s={12} />
            </Col>
            
            <Col s={6} offset="s3"><Button style={btnStyle} waves='light' onClick={(event) => this.editUser(event)}>Edit User</Button></Col>
            <Row />
            <Col s={6} offset="s3"><Button style={btnStyle} waves='light' onClick={(event) => this.editPassword(event)}>Edit Password</Button></Col>
            <Row />
            <Col s={6} offset="s3"><Button style={btnStyle} waves='light' onClick={(event) => this.logout(event)}>Logout</Button></Col>
            </Row>
            </Container>
            );
        }
    }
    
    export default Profile;