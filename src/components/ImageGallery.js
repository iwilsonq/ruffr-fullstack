import React, { Component } from 'react';
import { TextSection, ImageSection, Card } from './commons';
import sibby from '../../public/images/sibby.jpg';
import snarf from '../../public/images/snarf.jpg';
import '../../style/ImageGallery.css';

class ImageGallery extends Component {
  render() {
    return (
      <div className="image-gallery">
        <Card>
          <TextSection>
            <div className="user-name">
              Snarf
            </div>
            <div className="date-posted">
              1h
            </div>
          </TextSection>
          <ImageSection>
            <img
              className='image'
              src={snarf}
              alt="snarf"
            />
          </ImageSection>
          <TextSection>
            Hello I am snarf, the ultimate thunder cat.
          </TextSection>
        </Card>
        <Card>
          <TextSection>
            <div className="user-name">
              Sibby
            </div>
            <div className="date-posted">
              2h
            </div>
          </TextSection>
          <ImageSection>
            <img
              className='image'
              src={sibby}
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
