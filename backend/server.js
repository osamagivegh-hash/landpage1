const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration - Allow your Vercel frontend
app.use(cors({
  origin: [
    'https://restaurantsite-blue.vercel.app',
    'https://restaurantsite1.vercel.app',
    'https://restaurantsite1-blue.vercel.app',
    'http://localhost:3000',
    'https://railway.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} from ${req.get('origin') || 'no-origin'}`);
  next();
});

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant';
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.log('⚠️ Server will start without database connection');
  }
};

// Connect to database
connectDB();

// Routes with error handling
try {
  app.use('/api/meals', require('./routes/meals'));
  app.use('/api/offers', require('./routes/offers'));
  app.use('/api/restaurant', require('./routes/restaurant'));
  app.use('/api/messages', require('./routes/messages'));
  app.use('/api/admin', require('./routes/admin'));
  app.use('/api/upload', require('./routes/upload'));
  console.log('✅ All routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading routes:', error);
}

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    origin: req.get('origin') || 'no-origin'
  });
});

// CORS test endpoint
app.get('/cors-test', (req, res) => {
  res.status(200).json({
    message: 'CORS is working!',
    origin: req.get('origin') || 'no-origin',
    headers: req.headers
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Restaurant API Server', 
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: [
      '/api/meals',
      '/api/offers', 
      '/api/restaurant',
      '/api/messages',
      '/api/admin',
      '/api/upload'
    ]
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Global error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Handle 404 errors
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    availableEndpoints: [
      '/',
      '/health',
      '/cors-test',
      '/api/meals',
      '/api/offers',
      '/api/restaurant',
      '/api/messages',
      '/api/admin',
      '/api/upload'
    ]
  });
});

const PORT = process.env.PORT || 5000;

console.log('🚀 Starting server...');
console.log('📋 Environment variables:');
console.log('   PORT:', process.env.PORT);
console.log('   NODE_ENV:', process.env.NODE_ENV);
console.log('   MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ Not set');

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`✅ CORS enabled for: ${process.env.FRONTEND_URL || 'https://restaurantsite1.vercel.app'}`);
  console.log(`✅ Health check available at: http://0.0.0.0:${PORT}/health`);
  console.log(`✅ Root endpoint available at: http://0.0.0.0:${PORT}/`);
});

// Handle server errors
server.on('error', (error) => {
  console.error('❌ Server error:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});