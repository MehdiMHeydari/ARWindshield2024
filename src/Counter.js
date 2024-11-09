import React from 'react';

const Counter = ({ counter }) => {
  return (
    <div className="counter-text">
      <h2>Counter Value: {counter}</h2>
    </div>
  );
};

export default Counter;
