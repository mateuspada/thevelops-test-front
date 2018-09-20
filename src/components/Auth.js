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

    console.log(this.props);
    this.props.location.state = {user};
    return this.props.children;
  }
}

export default withRouter(Auth);