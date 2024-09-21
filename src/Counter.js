import React, { useState, useEffect } from 'react';
import Speedometer from './Speedometer';
import Battery from './Battery';
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
      setCounter(data.counter); // Assume data is in { counter: value } format
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
      <Speedometer counter={counter} />
      <Battery counter={counter} />
    </div>
  );
};

export default Counter;
