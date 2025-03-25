import { circle } from "leaflet";
import React, { useState, useRef, useEffect } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

const DaqConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    const ws = new ReconnectingWebSocket("ws://localhost:3000");

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
    <div>
      <div
        style={{
          width: "150px",
          height: "150px",
          maxWidth: "200px",
          maxHeight: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          fontWeight: "bold",
          backgroundColor: isConnected ? "#d4fcd4" : "#fcd4d4",
          color: isConnected ? "green" : "red",
          border: `4px solid ${isConnected ? "green" : "red"}`,
          borderRadius: "50%",
          textAlign: "center",
          margin: "10px",
        }}
      >
        DAQ {isConnected ? "Connected" : "Disconnected"}
      </div>
    </div>
  );
};

export default DaqConnection;
