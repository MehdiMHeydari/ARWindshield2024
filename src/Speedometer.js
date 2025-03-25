import React from "react";
import ReactSpeedometer from "react-d3-speedometer";
import Counter from "./Counter";

const wheelDiameter = 22.42;

const Speedometer = ({ leftRPM, rightRPM }) => {
  // Ensure counter doesn't go over the max value

  const calcSpeed = (leftRPM, rightRPM, diameter) => {
    // Sourced from Mobile Dash
    let avgRPM = (parseFloat(leftRPM) + parseFloat(rightRPM)) / 2;
    let inchesPerMin = diameter * Math.PI * avgRPM;
    let milesPerHour = inchesPerMin * (60.0 / 63360.0);
    return Math.round(leftRPM); // change to milesPerHour when RPM data is received
  };
  const cappedSpeed = Math.min(calcSpeed(leftRPM, rightRPM, wheelDiameter), 60);

  return (
    <div style={{ minWidth: "300px" }}>
      <div style={{ marginTop: "30px", minWidth: "300px" }}>
        <ReactSpeedometer
          maxValue={60}
          height={160}
          value={cappedSpeed}
          needleColor="white"
          startColor="green"
          segments={8}
          endColor="red"
          textColor="white" // Set text color to white
        />
      </div>
      <Counter counter={cappedSpeed} />
      <h6
        style={{
          marginTop: "0px",
          marginBottom: "150px",
          lineHeight: "2px",
        }}
      >
        mph
      </h6>
    </div>
  );
};

export default Speedometer;
