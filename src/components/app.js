import React, { Component } from 'react';
import { Navbar } from './commons';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}
