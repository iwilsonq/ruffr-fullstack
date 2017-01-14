import React, { Component } from 'react';
import { TextSection, ImageSection, Card } from './commons';
import '../../style/ImageGallery.css';

class ImageGallery extends Component {
  render() {
    return (
      <div className="image-gallery">
        <Card>
          <ImageSection>
            <img
              className='image'
              src='http://localhost:3050/images/snarf.jpg'
              alt="snarf"
            />
          </ImageSection>
          <TextSection>
            Hello I am snarf, the ultimate thunder cat.
          </TextSection>
        </Card>
        <Card>
          <ImageSection>
            <img
              className='image'
              src='http://localhost:3050/images/sibby.jpg'
              alt="sibby"
            />
          </ImageSection>
          <TextSection>
            I am a siberian husky. L0L
          </TextSection>
        </Card>
      </div>
    );
  }
}

export default ImageGallery;
