import React, { useRef, useEffect } from "react";
import Thermometer from "./react-thermometer-component/index.js";
import * as d3 from "d3";
import { AlignCenter } from "lucide-react";

const Thermo = ({ temp }) => {
  const ref = useRef();

  return (
    <div style={{ placeItems: "center" }}>
      <div>
        <h3>{temp}&deg;</h3>
      </div>
      <Thermometer
        theme="light"
        value={temp}
        max="100"
        size="normal"
        height="300"
      />
    </div>
  );
};

export default Thermo;
