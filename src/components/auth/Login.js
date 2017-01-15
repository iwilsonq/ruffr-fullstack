import React, { Component } from 'react';
import { Input } from '../commons';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  handleFormSubmit() {
    console.log(this.state);
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit.bind(this)}>
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


        <button action='submit' className='btn btn-primary'>
          Sign in
        </button>
      </form>
    );
  }
}

export default Login;
