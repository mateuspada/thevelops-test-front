import React, { Component } from 'react';
import { Row, Col, Input, Container, Button } from 'react-materialize';
import { btnStyle } from './Style';
import { getJwt } from '../helpers';
import { Config } from '../Config';
import axios from 'axios'

class ProfileEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            personal_phone: ''               
        };
    }
    
    componentWillMount() {
        if((this.props.location.state.user !== undefined) && 
        (this.props.location.state.user)) {
            this.setState({
                email: this.props.location.state.user.email,
                first_name: this.props.location.state.user.first_name,
                last_name: this.props.location.state.user.last_name,
                personal_phone: this.props.location.state.user.personal_phone
            })
        }
    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value 
        });
    }

    editUser(event){
        let apiBaseUrl = Config.urlApi;
        let user = {
            "email": this.state.email,
            "first_name": this.state.first_name,
            "last_name": this.state.last_name,
            "personal_phone": this.state.personal_phone
        }
        
        let self = this;
        
        let jwt = getJwt();

        axios.put(apiBaseUrl + 'users/' + this.props.match.params.id, user, { headers: { "Authorization": jwt }} )
        .then((res) => {
            if(res.status === 202){                
                self.props.history.goBack();
            }
        })
        .catch(function (err) {
            console.log(err);
        });
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
            value={this.state.email}
            onChange={e => this.change(e)}
            s={12} />
            </Col>
            
            <Col s={6} offset="s3">
            <Input 
            name="first_name"                   
            label="First Name" 
            value={this.state.first_name}
            onChange={e => this.change(e)}
            s={12} />
            </Col>
            
            <Col s={6} offset="s3">
            <Input 
            name="last_name"                  
            label="Last Name" 
            value={this.state.last_name}
            onChange={e => this.change(e)}
            s={12} />
            </Col>
            
            <Col s={6} offset="s3">
            <Input 
            name="personal_phone"
            type="tel"                     
            label="Phone" 
            value={this.state.personal_phone}
            onChange={e => this.change(e)}
            s={12} />
            </Col>
            
            <Col s={6} offset="s3"><Button style={btnStyle} waves='light' onClick={(event) => this.editUser(event)}>Submit</Button></Col>
            <Row />
            <Col s={6} offset="s3"><Button style={btnStyle} waves='light'>Delete User</Button></Col>            
            </Row>
            </Container>            
            );
        }
    }
    
    export default ProfileEdit;