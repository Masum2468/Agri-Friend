const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const publicRoutes = require('./routes/publicRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Database
connectDB();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
  origin: true,
  credentials: true
}));

// Serve static assets from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Register API Routes
app.use('/api/auth', authRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Frontend Page Routing Fallbacks
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get(['/crop-guides', '/crops'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'crop-guides.html'));
});

app.get(['/disease-guide', '/diseases'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'disease-guide.html'));
});

app.get(['/fertilizer-guide', '/fertilizers'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'fertilizer-guide.html'));
});

app.get(['/seasonal-advisory', '/seasonal'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'seasonal-advisory.html'));
});

app.get(['/crop-calendar', '/calendar'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'crop-calendar.html'));
});

app.get(['/knowledgehub', '/knowledge-hub'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'knowledgehub.html'));
});

app.get(['/marketplace', '/marketpalce'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'marketpalce.html'));
});

// Default fallback for SPA-like navigation or home
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`Agriculture Management System running on port: ${PORT}`);
  console.log(`Access the application at: http://localhost:${PORT}`);
  console.log(`======================================================\n`);
});
