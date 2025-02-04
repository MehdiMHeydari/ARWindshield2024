import React, { useRef, useEffect } from 'react';
import Thermometer from 'react-thermometer-component';
import * as d3 from 'd3';
import { AlignCenter } from 'lucide-react';

const Thermo = ({ counter }) => {
  const ref = useRef();

  useEffect(() => {
    const width = 50;
    const height = 50;
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

    svg.append()

    

  }, [counter]);

  return (
    <div style={{placeItems: "center"}}>
      <svg ref={ref}></svg>
      <Thermometer 
      showCurrentValue={false}
        theme="light"
        value={counter}
        max="100"
        format="°C"
        size="normal"
        height="300"
      />
    </div>
    
  );
};

export default Thermo;
