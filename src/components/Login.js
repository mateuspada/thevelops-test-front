import React, { Component } from 'react';
import { Row, Col, Input, Container, Button } from 'react-materialize';
import Axios from 'axios';
import { Config } from '../Config';
import { btnStyle } from './Style';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            error: false,
            message: ''
        };
    }
    
    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    login(event){
        let apiBaseUrl = Config.urlApi;
        let user = {
            "email": this.state.email,
            "password": this.state.password
        }
        
        let self = this;
        
        Axios.post(apiBaseUrl+'login', user)
        .then((res) => {
            if(res.status === 200){
                localStorage.setItem(Config.tokenName, res.data.token);
                self.props.history.push('/user/'+res.data._id);
            }
        })
        .catch(function (err) {
            console.log(err);
            if(err.response.status === 422){
                self.setState({
                    error: true,
                    message: "Email and password don't match"
                });
            }
            else{
                self.setState({
                    error: true,
                    message: "User doesn't exist"
                });
            }
        });
    }
    
    render() {
        return (
            <Container>            
            <Row>
            <Col s={12}><h5 className="center-align"><b>Login</b></h5></Col>
            
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
            name="password"
            type="password" 
            label="Password" 
            onChange={e => this.change(e)}
            s={12} />
            </Col>
            <Col s={6} offset="s3"><Button style={btnStyle} waves='light' onClick={(event) => this.login(event)}>Login</Button></Col>    
            <Row></Row>            
            <Col s={6} offset="s3"><Button style={btnStyle} waves='light'>Sign Up</Button></Col>
            </Row>
            <Row>
            <Col s={6} offset="s3"><blockquote className="center-align">{this.state.error && this.state.message}</blockquote></Col>            
            </Row>
            </Container>
            );
        }              
    }
    
    export default Login;