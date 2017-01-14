import React, { Component } from 'react';
import { Navbar } from './commons';
import ImageGallery from './ImageGallery';
import NewPost from './NewPost';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Navbar />
        <NewPost />
      </div>
    );
  }
}
