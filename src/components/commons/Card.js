import React from 'react';

const Card = props => {
  return (
    <div
      style={cardStyle}
      className="card"
    >
      {props.children}
    </div>
  );
};

const cardStyle = {
  backgroundColor: '#fff',
  border: '1px solid #efefef',
  borderRadius: '3px',
  maxWidth: 600,
  marginBottom: 30
};

export { Card };
