import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import WebSocket from 'ws';
import express from 'express';
import mongoose from 'mongoose';

// Import routes
const threatRoutes = require('./src/routes/threatRoutes');
const scanRoutes = require('./src/routes/scanRoutes');
const auditRoutes = require('./src/routes/auditRoutes');

// Import middleware
const { authMiddleware } = require('./src/middleware/auth');
const rateLimitMiddleware = require('./src/middleware/rateLimit');
const { validateRequest } = require('./src/middleware/validate');

// Import configurations
const { connectDatabase } = require('./src/config/database');
const { initializeWebSocket } = require('./src/config/websocket');

// Import utils
const logger = require('./src/utils/logger');

// Initialize express app
const app = express();

// Connect to database
connectDatabase()
  .then(() => logger.info('Database connected successfully'))
  .catch(err => {
    logger.error('Database connection failed:', err);
    process.exit(1);
  });

// Middleware setup
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use(rateLimitMiddleware);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// API routes
app.use('/api/v1/threats', authMiddleware, threatRoutes);
app.use('/api/v1/scans', authMiddleware, scanRoutes);
app.use('/api/v1/audits', authMiddleware, auditRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Initialize WebSocket server
const wss = initializeWebSocket(server);

// WebSocket connection handling
wss.on('connection', (ws) => {
  logger.info('New WebSocket connection established');
  
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      // Handle different types of messages
      switch(data.type) {
        case 'scan_status':
          // Handle scan status updates
          break;
        case 'threat_alert':
          // Handle threat alerts
          break;
        default:
          logger.warn('Unknown message type received');
      }
    } catch (error) {
      logger.error('WebSocket message handling error:', error);
    }
  });

  ws.on('error', (error) => {
    logger.error('WebSocket error:', error);
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Starting graceful shutdown...');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });

  // If server hasn't closed in 10 seconds, force shutdown
  setTimeout(() => {
    logger.error('Could not close server gracefully, forcing shutdown');
    process.exit(1);
  }, 10000);
});

module.exports = { app, server };

// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post("/predict", async (req, res) => {
//     try {
//         const response = await axios.post("http://127.0.0.1:5000/predict", req.body);
//         res.json(response.data);
//     } catch (error) {
//         res.status(500).json({ error: "Error in calling ML model" });
//     }
// });

// const PORT = 3000;
// app.listen(PORT, () => console.log(`Node.js server running on port ${PORT}`));
