import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Axios from 'axios';
import { Input } from '../commons';
import '../../../style/Auth.css';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  handleSubmit() {
    Axios({
      url: 'http://localhost:3050/login',
      method: 'post',
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
    .then(response => {
      if (response.status === 200)
        browserHistory.push('/');
    })
    .catch(err => { throw new Error(err); });
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div className="login">
        <div className="headers">
          <h1 className="header">Ruffr</h1>
          <h3 className="sub-header">The next big thing</h3>
        </div>

        <div className="form">
          <div className='form-group'>
            <Input
              label='Email:'
              name='email'
              type='text'
              value={this.state.email}
              onChange={this.handleTextChange.bind(this)}
            />
          </div>

          <div className='form-group'>
            <Input
              label='Password:'
              name='password'
              type='password'
              value={this.state.password}
              onChange={this.handleTextChange.bind(this)}
            />
          </div>
        </div>

        <div className="buttons">
          <div className="login-button">
            <button onClick={this.handleSubmit.bind(this)} className='btn btn-primary'>
              Log in
            </button>
          </div>

          <div className="sign-up-button">
            <span><b>Not already on Ruffr?</b></span>
            <button className='btn btn-primary'>
              Signup
            </button>
          </div>
        </div>

      </div>
    );
  }
}

export default Login;
