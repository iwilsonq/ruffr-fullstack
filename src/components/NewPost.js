import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Axios from 'axios';
import { Input } from './commons';
import '../../style/NewPost.css';

class NewPost extends Component {
  state = {
    title: ''
  };

  handleSubmit() {
    const { title, image } = this.state;
    let data = new FormData();
    data.append('title', title);
    data.append('image', image);
    console.log()

    Axios({
      method: 'post',
      url: 'http://localhost:3050/images',
      data
    })
    .then(response => {
      console.log(response);
      browserHistory.push('/');
    })
    .catch(err => {
      throw new Error(err.message);
    });

  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleImageUpload(uploader) {
    const image = uploader.target.files[0];
    const preview = document.querySelector('.image-preview');
    const img = document.createElement('img');
    img.style.maxWidth = "300px";
    preview.appendChild(img);

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      img.src = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }

    this.setState({ image })
  }

  render() {
    return (
      <div className="new-post">
          <div className="new-section">
            <Input
              label='Title'
              name='title'
              type='text'
              value={this.state.value}
              onChange={this.handleTextChange.bind(this)}
            />
          </div>

          <div className="new-section">
            <label>Picture</label>
            <input
              type="file"
              name="image"
              onChange={this.handleImageUpload.bind(this)}
            />
            <div className="image-preview" />
          </div>

          <div className="new-section">
            <button
              type="button"
              onClick={this.handleSubmit.bind(this)}
            >
              Submit
            </button>
          </div>
        </div>
    );
  }
}

export default NewPost;
