const WebSocket = require('ws');
const jwt = require('jsonwebtoken');

const setupWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', async (ws, req) => {
    try {
      const token = req.url.split('=')[1];
      jwt.verify(token, process.env.JWT_SECRET);
      
      ws.on('message', (message) => {
        // Handle incoming messages
      });
      
      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
      });
    } catch (error) {
      ws.terminate();
    }
  });

  return wss;
};

module.exports = setupWebSocket;