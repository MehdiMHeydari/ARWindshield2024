import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

const Speedometer = ({ counter }) => {
  return (
    <ReactSpeedometer
      maxValue={100}
      value={counter}
      needleColor="red"
      startColor="green"
      segments={10}
      endColor="blue"
    />
  );
};

export default Speedometer;
