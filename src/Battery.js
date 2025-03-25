import React, { useRef, useEffect } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ReactComponent as BatteryIcon } from "./battery-bolt.svg";
import * as d3 from "d3";

const BatteryVisualization = ({ volt }) => {
  const ref = useRef();

  // <div style={{ marginLeft: "40px", marginTop: "60px", marginRight: "40px" }}><svg ref={ref}></svg></div>
  const circleScale = 0.8;
  return (
    <div style={{ marginTop: "33px" }}>
      <CircularProgressbarWithChildren
        value={volt}
        strokeWidth={10}
        styles={{
          // Customize the root svg element
          root: {},
          // Customize the path, i.e. the "completed progress"
          path: {
            // Path color
            stroke: `rgb(0, 167, 53)`,
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "butt",
            // Rotate the path
            transform: `scale(${circleScale})`,
            transformOrigin: "center center",
          },
          // Customize the circle behind the path, i.e. the "total progress"
          trail: {
            // Trail color
            stroke: "rgb(123, 152, 132)",
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "butt",
            // Rotate the trail
            transform: `scale(${circleScale})`,
            transformOrigin: "center center",
          },
        }}
      >
        <BatteryIcon
          style={{ transform: `scale(${circleScale * 0.4})`, fill: "white" }}
        />
      </CircularProgressbarWithChildren>
      <h6 style={{ marginTop: "-10px" }}>{volt}%</h6>
    </div>
  );
};

export default BatteryVisualization;
