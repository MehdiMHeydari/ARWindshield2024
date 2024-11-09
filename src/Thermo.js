import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const Thermo = ({ counter }) => {
  const ref = useRef();

  useEffect(() => {
    const width = 80;
    const height = 300;
    const bulbRadius = 20;
    const tubeWidth = 21.5;
    const tubeBorderWidth = 1;
    const mercuryColor = 'rgb(230,0,0)';
    const tubeBorderColor = '#999999';

    // Clear any existing content in the SVG
    d3.select(ref.current).selectAll('*').remove();

    // Create the SVG container
    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height);

    // Scale for temperature
    const scale = d3.scaleLinear()
      .domain([0, 100]) // Assuming 0 to 100 for the counter as the max value
      .range([height - bulbRadius - 5, 5]);

    // Draw the tube background
    svg.append('rect')
      .attr('x', width / 2 - tubeWidth / 2)
      .attr('y', 5)
      .attr('width', tubeWidth)
      .attr('height', height - bulbRadius - 5)
      .style('fill', '#FFFFFF')
      .style('stroke', tubeBorderColor)
      .style('stroke-width', `${tubeBorderWidth}px`);

    // Draw the mercury column
    const mercuryHeight = height - bulbRadius - 5 - scale(counter);
    svg.append('rect')
      .attr('x', width / 2 - (tubeWidth - 10) / 2)
      .attr('y', scale(counter)) // Position based on the scaled value
      .attr('width', tubeWidth - 10)
      .attr('height', mercuryHeight > 0 ? mercuryHeight : 0) // Ensure height is not negative
      .attr('fill', mercuryColor);

    // Draw the bulb at the bottom of the thermometer
    svg.append('circle')
      .attr('cx', width / 2)
      .attr('cy', height - bulbRadius)
      .attr('r', bulbRadius)
      .attr('fill', mercuryColor)
      .attr('stroke', tubeBorderColor)
      .attr('stroke-width', `${tubeBorderWidth}px`);

    // Add text to display the counter value above the thermometer
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .attr('fill', 'black')
      .text(`${counter}°`);

  }, [counter]); // Re-run this effect when `counter` changes

  return <svg ref={ref}></svg>;
};

export default Thermo;
