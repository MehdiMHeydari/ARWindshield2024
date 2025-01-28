import React, { useRef, useEffect } from 'react';
import Thermometer from 'react-thermometer-component';
import * as d3 from 'd3';

const Thermo = ({ counter }) => {
  const ref = useRef();

  useEffect(() => {
    const width = 80;
    const height = 340;
    const bulbRadius = 20;
    const tubeWidth = 21.5;
    const tubeBorderWidth = 1;
    const mercuryColor = 'rgb(230,0,0)';
    const tubeBorderColor = '#999999';
    const topMargin = 50;

    d3.select(ref.current).selectAll('*').remove();

    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height);

    svg.append('text')
      .attr('class', 'thermo-text')
      .attr('x', width / 2)
      .attr('y', topMargin - 20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '1.5rem')
      .attr('fill', 'white') // Set text color to white
      .text(`${counter}°`);

    const scale = d3.scaleLinear()
      .domain([0, 100])
      .range([height - bulbRadius - tubeBorderWidth, topMargin + 10]);

    svg.append('rect')
      .attr('x', width / 2 - tubeWidth / 2)
      .attr('y', topMargin)
      .attr('width', tubeWidth)
      .attr('height', height - bulbRadius - topMargin)
      .style('fill', '#FFFFFF')
      .style('stroke', tubeBorderColor)
      .style('stroke-width', `${tubeBorderWidth}px`);

    const mercuryHeight = height - bulbRadius - scale(counter);
    svg.append('rect')
      .attr('x', width / 2 - (tubeWidth - 10) / 2)
      .attr('y', scale(counter))
      .attr('width', tubeWidth - 10)
      .attr('height', mercuryHeight > 0 ? mercuryHeight : 0)
      .attr('fill', mercuryColor);

    svg.append('circle')
      .attr('cx', width / 2)
      .attr('cy', height - bulbRadius)
      .attr('r', bulbRadius)
      .attr('fill', mercuryColor)
      .attr('stroke', tubeBorderColor)
      .attr('stroke-width', `${tubeBorderWidth}px`);

  }, [counter]);

  return (
    <Thermometer
      theme="light"
      value={counter}
      max="100"
      format="°C"
      size="normal"
      height="300"
    />
  );
};

export default Thermo;
