const express = require('express');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');

const app = express();

// Set the port for the HTTP server
app.set('port', process.env.PORT || 3000);

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'build')));

// Catchall handler for any request that doesn't match one above, send back React's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Create an HTTP server
const server = http.createServer(app);

// Listen on the specified port
server.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});

// Set up WebSocket server
const wss = new WebSocket.Server({ server }); // Integrating WebSocket server with the Express/HTTP server

wss.on('connection', (ws) => {
  console.log('WebSocket connection established');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Broadcast received message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
