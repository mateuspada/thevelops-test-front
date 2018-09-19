import React, { Component } from 'react';
import { Row, Col, Input, Container, Button } from 'react-materialize';
import Axios from 'axios';

class Login extends Component {
  render() {
    return (
        <Container>            
            <Row>
                <Col s={12}><h5 class="center-align"><b>Login</b></h5></Col>

                <Col s={6} offset="s3">
                    <Input 
                    type="email" 
                    label="Email" 
                    s={12} />
                </Col>

                <Col s={6} offset="s3">
                    <Input type="password" label="Password" s={12} value={this.props.password} />
                </Col>
                <Col s={6} offset="s3"><Button waves='light' onClick={(event) => this.login(event)}>Login</Button></Col>    
                <Row></Row>            
                <Col s={6} offset="s3"><Button waves='light'>Sign Up</Button></Col>
            </Row>
        </Container>
    );
  }

  login(event){
    let apiBaseUrl = "http://localhost:4000/api/";
    let user = {
        "email":this.props.email,
        "password":this.props.password
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