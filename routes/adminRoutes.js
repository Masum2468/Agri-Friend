const express = require('express');
const router = express.Router();
const dbManager = require('../models/dbManager');
const { protect, authorize } = require('../middleware/auth');

// Protect and lock to Admins only
router.use(protect);
router.use(authorize('admin'));

// @route   GET /api/admin/stats
// @desc    Get system global statistics
router.get('/stats', async (req, res) => {
  try {
    const users = await dbManager.find('User', {});
    const listings = await dbManager.find('MarketListing', {});
    const farms = await dbManager.find('Farm', {});
    const crops = await dbManager.find('Crop', {});

    const totalFarmers = users.filter(u => u.role === 'farmer').length;
    const totalAdmins = users.filter(u => u.role === 'admin').length;

    res.json({
      farmersCount: totalFarmers,
      adminsCount: totalAdmins,
      listingsCount: listings.length,
      farmsCount: farms.length,
      cropsCount: crops.length
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/admin/users
// @desc    List all registered users
router.get('/users', async (req, res) => {
  try {
    const users = await dbManager.find('User', {});
    // Return users without passwords
    const sanitized = users.map(u => {
      const copy = u.toObject ? u.toObject() : { ...u };
      delete copy.password;
      return copy;
    });
    res.json(sanitized);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/admin/notifications/broadcast
// @desc    Broadcast a notification to all users
router.post('/notifications/broadcast', async (req, res) => {
  const { title, message, type } = req.body;
  try {
    const announcement = await dbManager.create('Notification', {
      userId: 'all',
      title,
      message,
      type: type || 'info'
    });
    res.status(201).json(announcement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete a user account
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await dbManager.findById('User', req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'admin' || String(user._id) === String(req.user.id)) {
      return res.status(400).json({ message: 'Cannot delete admin or current account' });
    }

    await dbManager.findByIdAndDelete('User', req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
