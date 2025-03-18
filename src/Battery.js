import React, { useRef, useEffect } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ReactComponent as BatteryIcon } from "./battery-bolt.svg";
import * as d3 from "d3";

const BatteryVisualization = ({ counter }) => {
  const ref = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const totalWidth = 260;
    const totalHeight = 140; // Adjusted total height
    const width = 200;
    const height = 50;
    const notchWidth = 10;
    const notchHeight = 30;

    // Clear SVG before redraw
    d3.select(ref.current).selectAll("*").remove();

    // Create SVG element
    const svg = d3
      .select(ref.current)
      .attr("width", totalWidth)
      .attr("height", totalHeight);

    let fillColor;
    if (counter < 25) fillColor = "red";
    else if (counter < 50) fillColor = "orange";
    else fillColor = "limegreen";

    // Draw the notch on the left side
    svg
      .append("rect")
      .attr("x", margin.left - notchWidth)
      .attr("y", (totalHeight - notchHeight) / 2 + 20)
      .attr("height", notchHeight)
      .attr("width", notchWidth)
      .attr("fill", fillColor)
      .attr("stroke", "white")
      .attr("stroke-width", 3);

    // Draw the "battery" container with white outline
    svg
      .append("rect")
      .attr("x", margin.left)
      .attr("y", (totalHeight - height) / 2 + 20)
      .attr("height", height)
      .attr("width", width)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 3); // Changed to white outline

    // Draw the "fill" of the battery
    const fillWidth = (counter / 100) * width;
    svg
      .append("rect")
      .attr("x", margin.left + 1)
      .attr("y", (totalHeight - height) / 2 + 21)
      .attr("height", height - 2)
      .attr("width", fillWidth - 2)
      .attr("fill", fillColor);

    // Add percentage text above the battery
    svg
      .append("text")
      .attr("class", "battery-percentage")
      .attr("x", totalWidth / 2)
      .attr("y", margin.top)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", "white") // Set text color to white
      .text(`${counter}%`);
  }, [counter]);

  // <div style={{ marginLeft: "40px", marginTop: "60px", marginRight: "40px" }}><svg ref={ref}></svg></div>
  const circleScale = 0.8;
  return (
    <div style={{ marginTop: "33px" }}>
      <CircularProgressbarWithChildren
        value={counter}
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
      <h6 style={{ marginTop: "-10px" }}>{counter}%</h6>
    </div>
  );
};

export default BatteryVisualization;
