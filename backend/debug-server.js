// Debug server to check what's happening
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Simple middleware
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Debug server is running',
    timestamp: new Date().toISOString(),
    env: {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Not set',
      JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Not set'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Debug server is healthy',
    timestamp: new Date().toISOString()
  });
});

// MongoDB connection test
app.get('/test-db', async (req, res) => {
  try {
    if (!process.env.MONGODB_URI) {
      return res.status(500).json({ error: 'MONGODB_URI not set' });
    }
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    res.json({ 
      status: 'OK', 
      message: 'MongoDB connected successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'MongoDB connection failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

const PORT = process.env.PORT || 5000;

console.log('🔍 Starting debug server...');
console.log('📋 Environment variables:');
console.log('   PORT:', process.env.PORT);
console.log('   NODE_ENV:', process.env.NODE_ENV);
console.log('   MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ Not set');
console.log('   JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Not set');

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Debug server is running on port ${PORT}`);
  console.log(`✅ Health check: http://0.0.0.0:${PORT}/health`);
  console.log(`✅ DB test: http://0.0.0.0:${PORT}/test-db`);
});

server.on('error', (error) => {
  console.error('❌ Debug server error:', error);
  process.exit(1);
});
