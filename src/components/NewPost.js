import React, { Component } from 'react';
// import { browserHistory } from 'react-router';
import Axios from 'axios';
import CroppingTool from './CroppingTool';
import '../../style/NewPost.css';

class NewPost extends Component {
  state = {
    title: '',
    image: ''
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
    .then(response => console.log(response))
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleImageUpload(uploader) {
    const image = uploader.target.files[0];
    console.log(image);
    this.setState({ image })
  }

  render() {
    return (
      <div className="new-post">
          <div className="new-section">
            <label>Name</label>
            <input
              type="text"
              name="title"
              value={this.state.title}
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
