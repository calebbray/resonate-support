import React from 'react';
import spinner from './spinner.svg';

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: '100px', margin: 'auto', display: 'block' }}
      />
    </div>
  );
};
