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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "150px",
          height: "150px",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          fontWeight: "bold",
          color: "white",
          border: `15px solid ${isConnected ? "green" : "red"}`,
          borderRadius: "50%",
          textAlign: "center",
          margin: "5px",
          padding: "2px",
        }}
      >
        DAQ {isConnected ? "Connected" : "Disconnected"}
      </div>
    </div>
  );
};

export default DaqConnection;
