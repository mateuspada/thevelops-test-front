import React, { Component } from 'react';
import { Row, Col, Input, Container, Button } from 'react-materialize';
import { btnStyle } from './Style';
import { Config } from '../Config';
import axios from 'axios'

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            personal_phone: '',
            password: '',
            retypepassword: '',
            error: false,
            message: ''           
        };
    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    insertUser(event){
        let self = this;

        if (!this.state.email){
            self.setState({
                error: true,
                message: "Email should have a value"
            });
            return;   
        } else if (!this.state.first_name){
            self.setState({
                error: true,
                message: "First Name should have a value"
            });
            return;   
        } else if (!this.state.last_name){
            self.setState({
                error: true,
                message: "Last Name should have a value"
            });
            return;   
        } else if (!this.state.password){
            self.setState({
                error: true,
                message: "Password Phone should have a value"
            });
            return;   
        } else if (!this.state.retypepassword){
            self.setState({
                error: true,
                message: "Re-type the password to continue"
            });
            return;   
        } else if (!(this.state.password === this.state.retypepassword)){
            self.setState({
                error: true,
                message: "Passwords don't match"
            });
            return;      
        }

        let apiBaseUrl = Config.urlApi;
        let user = {
            "email": this.state.email,
            "first_name": this.state.first_name,
            "last_name": this.state.last_name,
            "personal_phone": this.state.personal_phone,
            "password": this.state.password
        }       
        
        axios.post(apiBaseUrl+'users', user)
        .then((res) => {
            if(res.status === 201){                                
                axios.post(apiBaseUrl+'login', user)
                .then((res) => {
                    if(res.status === 200){
                        localStorage.setItem(Config.tokenName, res.data.token);
                        self.props.history.push('/user/'+res.data._id);
                    }
                })
                .catch(function (err) {
                    console.log(err);                    
                    self.props.history.goBack();
                });
            }
        })
        .catch(function (err) {
            console.log(err);
            self.setState({
                error: true,
                message: err.message
            });  
        });
    }
    
    render() {
        return (
            <Container>            
            <Row>
            <Col s={12}><h5 className="center-align"><b>Create User</b></h5></Col>
            
            <Col s={6} offset="s3">
            <Input 
            name="email"
            type="email"                     
            label="Email" 
            onChange={e => this.change(e)}
            s={12} />
            </Col>
            
            <Col s={6} offset="s3">
            <Input 
            name="first_name"                   
            label="First Name" 
            onChange={e => this.change(e)}
            s={12} />
            </Col>
            
            <Col s={6} offset="s3">
            <Input 
            name="last_name"                  
            label="Last Name" 
            onChange={e => this.change(e)}
            s={12} />
            </Col>
            
            <Col s={6} offset="s3">
            <Input 
            name="personal_phone"
            type="tel"                     
            label="Phone" 
            onChange={e => this.change(e)}
            s={12} />
            </Col>

            <Col s={6} offset="s3">
            <Input 
            name="password"
            type="password"                     
            label="Password" 
            onChange={e => this.change(e)}
            s={12} />
            </Col>

            <Col s={6} offset="s3">
            <Input 
            name="retypepassword"
            type="password"                     
            label="Re-type Password" 
            onChange={e => this.change(e)}
            s={12} />
            </Col>
            
            <Col s={6} offset="s3"><Button style={btnStyle} waves='light' onClick={(event) => this.insertUser(event)} >Submit</Button></Col>            
            </Row>
            <Row>
            <Col s={6} offset="s3"><blockquote className="center-align">{this.state.error && this.state.message}</blockquote></Col>            
            </Row>

            </Container>
            );
        }
    }
    
    export default Signup;