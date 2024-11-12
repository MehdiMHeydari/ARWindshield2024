import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

const Speedometer = ({ counter }) => {
  return (
    <ReactSpeedometer
      maxValue={60}
      value={counter}
      needleColor="white"
      startColor="green"
      segments={8}
      endColor="red"
      textColor="white" // Set text color to white
    />
  );
};

export default Speedometer;
