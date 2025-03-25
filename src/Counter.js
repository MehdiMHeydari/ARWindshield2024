import React from 'react';

const Counter = ({ counter }) => {
  return (
    <div className="counter-text">
      <h1 style={{marginTop: "0px", marginBottom: "0px"}}>{counter}</h1>
    </div>
  );
};

export default Counter;
