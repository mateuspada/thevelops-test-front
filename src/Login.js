import React, { Component } from 'react';
import { Row, Col, Input, Container, Button } from 'react-materialize';
import Axios from 'axios';
import { Config } from './Config'

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      error: false
    };
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value
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
                <Col s={6} offset="s3"><Button waves='light' onClick={(event) => this.login(event)}>Login</Button></Col>    
                <Row></Row>            
                <Col s={6} offset="s3"><Button waves='light'>Sign Up</Button></Col>
            </Row>
        </Container>
    );
  }

  login(event){
    let apiBaseUrl = Config.urlApi;
    let user = {
        "email": this.state.email,
        "password": this.state.password
    }
    
    Axios.post(apiBaseUrl+'login', user)
            .then(function (res) {
                console.log(res);
                if(res.status === 200){
                    console.log("Login successfull");
                    //var uploadScreen=[];
                    //uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>)
                    //self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
                }
            })
            .catch(function (err) {
                console.log(err);
                if(err.response.status === 422){
                    console.log("Email and password not match");
                    alert("Email and password not match")
                }
                else{
                    console.log("Email doesn't exists");
                    alert("Email doesn't exist");
                }
            });
    }
}

export default Login;