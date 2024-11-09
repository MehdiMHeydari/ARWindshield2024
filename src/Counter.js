import React, { useState, useEffect } from 'react';
import Speedometer from './Speedometer';
import Battery from './Battery';
import Thermo from './Thermo';
import ReconnectingWebSocket from 'reconnecting-websocket';

const Counter = () => {
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
    <div>
      <h2>Counter Value: {counter}</h2>
      <Thermo counter={counter}  maxValue={100}/>
      <Speedometer counter={counter} maxValue={100}/>
      <Battery counter={counter} maxValue={100}/>
    </div>
  );
};

export default Counter;
