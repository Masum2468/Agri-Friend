const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dbManager = require('../models/dbManager');
const { protect } = require('../middleware/auth');

// Generate JWT Helper
const generateToken = (res, user) => {
  const userId = user._id ? user._id.toString() : '';
  const token = jwt.sign(
    { id: userId, username: user.username, role: user.role || 'farmer' },
    process.env.JWT_SECRET || 'supersecretagrikeychangeinprod',
    { expiresIn: '30d' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
  const { username, password, contact } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const trimmedUsername = username.trim();

    // Check if user already exists
    const userExists = await dbManager.findOne('User', { username: trimmedUsername });

    if (userExists) {
      return res.status(400).json({ message: 'Username already registered' });
    }

    const newUser = await dbManager.create('User', {
      username: trimmedUsername,
      password,
      contact: contact ? contact.trim() : '',
      role: 'farmer'
    });

    // Generate JWT cookie
    generateToken(res, newUser);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      contact: newUser.contact,
      role: newUser.role || 'farmer'
    });

  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token cookie
router.post('/login', async (req, res) => {
  const { emailOrUsername, username, password } = req.body;
  const loginUser = (username || emailOrUsername || '').trim();

  try {
    if (!loginUser || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await dbManager.findOne('User', { username: loginUser });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await dbManager.checkPassword(user, password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT cookie
    generateToken(res, user);

    res.json({
      _id: user._id,
      username: user.username,
      contact: user.contact,
      role: user.role || 'farmer'
    });

  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user & clear cookie
router.post('/logout', (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.json({ message: 'Logged out successfully' });
});

// @route   GET /api/auth/me
// @desc    Get current logged in user details
router.get('/me', protect, async (req, res) => {
  try {
    const user = await dbManager.findById('User', req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userDoc = user.toObject ? user.toObject() : { ...user };
    delete userDoc.password;
    res.json(userDoc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
