import React, { Component } from 'react';
import { Row, Col, Input, Container, Button } from 'react-materialize';
import { btnStyle } from './Style';
import { getJwt } from '../helpers';
import { Config } from '../Config';
import axios from 'axios'

class ProfileChangePass extends Component {
    constructor(props){
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            retypeNewPassword: '',
            error: false,
            message: ''          
        };
    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value 
        });
    }

    editPassword(event){
        let self = this;

        if (!this.state.oldPassword){
            self.setState({
                error: true,
                message: "Old Password should have a value"
            });
            return;
        } else if (!this.state.newPassword){
            self.setState({
                error: true,
                message: "New Password should have a value"
            });
            return;
        } else if (!this.state.retypeNewPassword){
            self.setState({
                error: true,
                message: "Retype the new Password to continue"
            });
            return;
        } else if (!(this.state.newPassword === this.state.retypeNewPassword)){
            self.setState({
                error: true,
                message: "New passwords don't match"
            });
            return;
        }

        let apiBaseUrl = Config.urlApi;

        let user = {
            "password": this.state.oldPassword
        }

        let jwt = getJwt();
        let header = { headers: { "Authorization": jwt }};
        
        axios.post(apiBaseUrl+ 'users/' + this.props.match.params.id + '/checkPassword', user, header)
        .then((res) => {
            if(res.status === 200){
                user.password = self.state.newPassword;

                axios.put(apiBaseUrl + 'users/' + this.props.match.params.id, user, header)
                .then((res) => {
                    if(res.status === 202){                
                        self.props.history.goBack();
                    }
                })
                .catch(function (err) {
                    console.log(err);
                    self.setState({
                        error: true,
                        message: err.response.data.error
                    });
                });

            }
        })
        .catch(function (err) {
            console.log(err);
            self.setState({
                error: true,
                message: err.response.data.error
            });
        });   
    }
    
    render() {
        return (
            <Container>            
            <Row>
            <Col s={12}><h5 className="center-align"><b>Edit Password</b></h5></Col>
            
            <Col s={6} offset="s3">
            <Input 
            name="oldPassword"
            type="password"                     
            label="Old Password" 
            onChange={e => this.change(e)}
            s={12} />
            </Col>
            
            <Col s={6} offset="s3">
            <Input 
            name="newPassword"
            type="password"                     
            label="New Password" 
            onChange={e => this.change(e)}
            s={12} />
            </Col>

            <Col s={6} offset="s3">
            <Input 
            name="retypeNewPassword"
            type="password"                     
            label="Re-type New Password" 
            onChange={e => this.change(e)}
            s={12} />
            </Col>
            
            <Col s={6} offset="s3"><Button style={btnStyle} waves='light' onClick={(event) => this.editPassword(event)}>Submit</Button></Col>
            </Row>
            <Row>
            <Col s={6} offset="s3"><blockquote className="center-align">{this.state.error && this.state.message}</blockquote></Col>            
            </Row>
            </Container>            
            );
        }
    }
    
    export default ProfileChangePass;