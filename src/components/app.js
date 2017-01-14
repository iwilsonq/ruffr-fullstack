import React, { Component } from 'react';
import { Navbar } from './commons';
import ImageGallery from './ImageGallery';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Navbar />
        <ImageGallery />
      </div>
    );
  }
}
