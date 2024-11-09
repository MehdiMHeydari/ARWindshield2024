import React, { useState, useRef, useEffect } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import './DaqConnection.css'; 

const DaqConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    const ws = new ReconnectingWebSocket('ws://localhost:3000'); 

    ws.onopen = () => {
      setIsConnected(true);
    };
    ws.onclose = () => {
      setIsConnected(false);
    };
    ws.onerror = () => {
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (

    <div className={`circle ${isConnected ? 'connected' : 'disconnected'}`}>
      DAQ <br  /> {isConnected ? 'Connected' : 'Disconnected'}
    </div>
  );
  
};

export default DaqConnection;
