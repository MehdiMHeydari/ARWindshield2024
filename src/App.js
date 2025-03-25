import React, { useState, useEffect } from "react";
import Counter from "./Counter";
import Maps from "./Maps";
import Speedometer from "./Speedometer";
import Battery from "./Battery";
import Thermo from "./Thermo";
import DaqConnection from "./DaqConnection";
import ReconnectingWebSocket from "reconnecting-websocket";
import Temperature from "./Temperature";
import Stopwatch from "./Stopwatch";
import "./App.css";

function App() {
  const [temp, setTemp] = useState(0);
  const [leftRPM, setLeftRPM] = useState(0);
  const [rightRPM, setRightRPM] = useState(0);
  const [batteryVolt, setBatteryVolt] = useState(0);

  useEffect(() => {
    const ws = new ReconnectingWebSocket("ws://localhost:3000");

    ws.onopen = () => {
      console.log("Connected to the WebSocket server");
    };

    ws.onmessage = (message) => {
      console.log("Received:", message.data);
      const data = JSON.parse(message.data);
      setTemp(data.temp);
      setLeftRPM(data.leftRPM);
      setRightRPM(data.rightRPM);
      setBatteryVolt(data.batteryVolt);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="app-content">
          {/* <Counter counter={counter} /> */}
          <Temperature />
          <Battery volt={batteryVolt} maxValue={100} />
          <DaqConnection />
          <Thermo temp={temp} maxValue={100}></Thermo>
          <Speedometer leftRPM={leftRPM} rightRPM={rightRPM} maxValue={100} />
          <Stopwatch />
          <Maps />
        </div>
      </header>
    </div>
  );
}

export default App;
