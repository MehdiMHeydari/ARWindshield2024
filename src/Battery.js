import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

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
    const svg = d3.select(ref.current)
      .attr("width", totalWidth)
      .attr("height", totalHeight);

    let fillColor;
    if (counter < 25) fillColor = "red";
    else if (counter < 50) fillColor = "orange";
    else fillColor = "limegreen";

    // Draw the notch on the left side
    svg.append("rect")
      .attr("x", margin.left - notchWidth)
      .attr("y", (totalHeight - notchHeight) / 2 + 20)
      .attr("height", notchHeight)
      .attr("width", notchWidth)
      .attr("fill", fillColor);

    // Draw the "battery" container with white outline
    svg.append("rect")
      .attr("x", margin.left)
      .attr("y", (totalHeight - height) / 2 + 20)
      .attr("height", height)
      .attr("width", width)
      .attr("fill", "none")
      .attr("stroke", "white"); // Changed to white outline

    // Draw the "fill" of the battery
    const fillWidth = (counter / 100) * width;
    svg.append("rect")
      .attr("x", margin.left)
      .attr("y", (totalHeight - height) / 2 + 20)
      .attr("height", height)
      .attr("width", fillWidth)
      .attr("fill", fillColor);

    // Add percentage text above the battery
    svg.append('text')
      .attr('class', 'battery-percentage')
      .attr('x', totalWidth / 2)
      .attr('y', margin.top)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'white') // Set text color to white
      .text(`${counter}%`);

  }, [counter]);

  return <svg style={{marginLeft: "60px", marginTop: "60px"}} ref={ref}></svg>;
};

export default BatteryVisualization;
