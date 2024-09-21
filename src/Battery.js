import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BatteryVisualization = ({ counter }) => {
  const ref = useRef();

  useEffect(() => {
    const margin = { top: 40, right: 20, bottom: 40, left: 50 }; // increased left margin for the notch
    const totalWidth = 260; // increased total width to prevent cutting off
    const totalHeight = 100;
    const width = 200; // width of the battery
    const height = 50; // height of the battery
    const notchWidth = 10;
    const notchHeight = 30; // increased for a better visual effect

    // Clear SVG before redraw
    d3.select(ref.current).selectAll("*").remove();

    // Create SVG element
    const svg = d3.select(ref.current)
      .attr("width", totalWidth)
      .attr("height", totalHeight);

    // Determine fill color based on the counter value
    let fillColor;
    if (counter < 25) fillColor = "red";
    else if (counter < 50) fillColor = "orange";
    else fillColor = "limegreen";

    // Draw the notch on the left side, vertically centered
    svg.append("rect")
      .attr("x", margin.left - notchWidth) // Shift notch to the left of the battery
      .attr("y", (totalHeight - notchHeight) / 2) // Vertically center the notch
      .attr("height", notchHeight)
      .attr("width", notchWidth)
      .attr("fill", fillColor);

    // Draw the "battery" container, accounting for the notch
    svg.append("rect")
      .attr("x", margin.left)
      .attr("y", (totalHeight - height) / 2) // Vertically center the battery
      .attr("height", height)
      .attr("width", width)
      .attr("fill", "none")
      .attr("stroke", "black");

    // Draw the "fill" of the battery, considering the new margins and notch
    const fillWidth = (counter / 100) * width;
    svg.append("rect")
      .attr("x", margin.left)
      .attr("y", (totalHeight - height) / 2) // Vertically center the battery fill
      .attr("height", height)
      .attr("width", fillWidth)
      .attr("fill", fillColor);

    // Add text for battery value above the battery
    svg.append("text")
      .attr("x", totalWidth / 2) // Center the text horizontally
      .attr("y", margin.top / 2) // Position the text above the battery
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .text(`${counter}%`);

  }, [counter]);

  return <svg ref={ref}></svg>;
};

export default BatteryVisualization;
