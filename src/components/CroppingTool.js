import React, { Component } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export default class CroppingTool extends Component {
  state = {
    src: ''
  };

  onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);
  }

  cropImage() {
    if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
      this.renderCroppedImage();
    }

  renderCroppedImage() {
    const img = document.createElement('img');
    const preview = document.getElementById('image-preview');
    img.classList.add('image-preview');

    if (preview.hasChildNodes()) {
      preview.removeChild(preview.childNodes[0]);
    }
    img.src = this.refs.cropper.getCroppedCanvas().toDataURL();
    preview.appendChild(img);
    this.props.onCrop(img.src);
  }

  render() {
    const { aspectRatio } = this.props;
    return (
      <div className="cropping-tool">
        <input
          id='image-upload'
          type="file"
          accept="image/*"
          onChange={this.onChange.bind(this)}
        />

        <Cropper
          style={{height: 300, width: '100%'}}
          aspectRatio={aspectRatio || (300 / 280)}
          guides={false}
          src={this.state.src}
          ref='cropper'
        />

        <div className="box" style={{ width: '100%', float: 'right' }}>
          <h1>
            <button onClick={this.cropImage.bind(this)} style={{ float: 'left' }}>
              Crop Image
            </button>
          </h1>
        </div>
      </div>
    )
  }
}
