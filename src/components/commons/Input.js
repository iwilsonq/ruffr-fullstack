import React from 'react';

const Input = props => {
  return (
    <label>
      {props.label}
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </label>
  );
};

export { Input };
