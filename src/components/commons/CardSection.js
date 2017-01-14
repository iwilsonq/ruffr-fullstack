import React from 'react';

const TextSection = props => {
  return (
    <div style={textSectionStyle}>
      {props.children}
    </div>
  );
};

const ImageSection = props => {
  return (
    <div style={imageSectionStyle}>
      {props.children}
    </div>
  );
};

const imageSectionStyle = {
  maxWidth: 600,
  maxHeight: 600
};

const textSectionStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 24px',
  minHeight: 65
};

export { TextSection, ImageSection };
