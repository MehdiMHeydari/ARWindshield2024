import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

const Speedometer = ({ counter }) => {
  // Ensure counter doesn't go over the max value
  const cappedCounter = Math.min(counter, 60);

  return (
    <ReactSpeedometer
      maxValue={60}
      value={cappedCounter}
      needleColor="white"
      startColor="green"
      segments={8}
      endColor="red"
      textColor="white" // Set text color to white
    />
  );
};

export default Speedometer;
