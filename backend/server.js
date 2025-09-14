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
    'http://localhost:3000',
    'https://railway.com'
  ],
  credentials: true
}));

app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant';
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // In production, don't exit immediately - let the server start
    console.log('Server will start without database connection');
  }
};

// Connect to database
connectDB();

// Routes
app.use('/api/meals', require('./routes/meals'));
app.use('/api/offers', require('./routes/offers'));
app.use('/api/restaurant', require('./routes/restaurant'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/upload', require('./routes/upload'));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Restaurant API Server', 
    status: 'running',
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`CORS enabled for: ${process.env.FRONTEND_URL || 'https://restaurantsite1.vercel.app'}`);
});