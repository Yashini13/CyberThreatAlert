import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import netstat from 'node-netstat';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("Client connected for network monitoring...");

  const sendNetworkStats = () => {
    const connections = [];
    netstat({ filter: { protocol: "tcp" }, sync: true }, (data) => {
      connections.push({
        protocol: data.protocol,
        local: `${data.local.address}:${data.local.port}`,
        remote: `${data.remote.address}:${data.remote.port}`,
        state: data.state,
      });
    });

    socket.emit("networkStats", connections);
  };

  sendNetworkStats(); // Send data immediately on connection

  const interval = setInterval(sendNetworkStats, 5000); // Update every 5 sec

  socket.on("disconnect", () => {
    console.log("Client disconnected.");
    clearInterval(interval);
  });
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
