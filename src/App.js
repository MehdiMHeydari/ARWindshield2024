import React, { useState, useEffect } from 'react';
import Counter from './Counter';
import Maps from './Maps';
import Speedometer from './Speedometer';
import Battery from './Battery';
import Thermo from './Thermo';
import DaqConnection from './DaqConnection';
import ReconnectingWebSocket from 'reconnecting-websocket';
import Temperature from './Temperature';
import './App.css';


function App() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const ws = new ReconnectingWebSocket('ws://localhost:3000');

    ws.onopen = () => {
      console.log('Connected to the WebSocket server');
    };

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      setCounter(data.counter); // Ensure `data.counter` matches your data format
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
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
          <Temperature/>
          <Thermo counter={counter} maxValue={100} />
          <Speedometer counter={counter} maxValue={100} />
          <Battery counter={counter} maxValue={100} />
          <DaqConnection />
          <Maps />
        </div>
      </header>
    </div>
  );
}

export default App;
