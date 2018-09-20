import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { getJwt } from '../helpers';
import { Config } from '../Config';

class Auth extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: undefined
    };
  }

  componentDidMount() {  
    this.getUser();
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      user: undefined
    });

    this.getUser();
  }

  getUser() {
    const jwt = getJwt();
    if (!jwt) {
      this.setState({
        user: null
      });
      return;
    }

    let apiBaseUrl = Config.urlApi;

    let self = this;

    axios.get( apiBaseUrl + 'login', { headers: { "Authorization": jwt } })
      .then(res => {
        self.setState({
          user: res.data
        })
      })
      .catch(function (err) {
        console.log(err);
        self.setState({
          user: null
        });
      });
    }

  render() {
    const user = this.state.user;

    if (user === undefined) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    if (user === null) {
      this.props.history.push('/');
    }

    this.props.location.state = {user};

    let index = 0;

    this.props.children.forEach((element, iChild) => {
      let pathChild = element.props.path.split('/');
      let pathCall = this.props.location.pathname.split('/');
      let match = 0;
      if (pathChild.length === pathCall.length){
        pathChild.forEach((e, i )=>{
          if (e.indexOf(':') >= 0){
            match++;
            return;
          }

          if (e === pathCall[i]){
            match++;
            return;
          }

        }); 
      }

      if (match === pathChild.length) {
        index = iChild;
      }
    });
  

    return this.props.children[index];
  }
}

export default withRouter(Auth);