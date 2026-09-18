const express = require('express');
const router = express.Router();
const dbManager = require('../models/dbManager');
const { protect } =require('../middleware/auth');

// Protect all dashboard routes
router.use(protect);
// ----------------------------------------------------
// 1. FARM MANAGEMENT
// ----------------------------------------------------
router.get('/farms', async (req, res) => {
  try {
    const farms = await dbManager.find('Farm', { owner: req.user.id });
    res.json(farms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/farms', async (req, res) => {
  const { name, location, size, soilType, description } = req.body;
  try {
    const farm = await dbManager.create('Farm', {
      owner: req.user.id,
      name,
      location,
      size: parseFloat(size),
      soilType,
      description
    });
    res.status(201).json(farm);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/farms/:id', async (req, res) => {
  try {
    const farm = await dbManager.findById('Farm', req.params.id);
    if (!farm || String(farm.owner) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Unauthorized or not found' });
    }
    const updated = await dbManager.findByIdAndUpdate('Farm', req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/farms/:id', async (req, res) => {
  try {
    const farm = await dbManager.findById('Farm', req.params.id);
    if (!farm || String(farm.owner) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Unauthorized or not found' });
    }
    await dbManager.findByIdAndDelete('Farm', req.params.id);
    res.json({ message: 'Farm deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ----------------------------------------------------
// 2. CROP MANAGEMENT
// ----------------------------------------------------
router.get('/crops', async (req, res) => {
  try {
    const crops = await dbManager.find('Crop', { owner: req.user.id });
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/crops', async (req, res) => {
  const { farmId, name, variety, plantingDate, expectedHarvestDate, status, notes } = req.body;
  try {
    const crop = await dbManager.create('Crop', {
      owner: req.user.id,
      farmId,
      name,
      variety,
      plantingDate,
      expectedHarvestDate,
      status: status || 'Planted',
      notes
    });
    res.status(201).json(crop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/crops/:id', async (req, res) => {
  try {
    const crop = await dbManager.findById('Crop', req.params.id);
    if (!crop || String(crop.owner) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Unauthorized or not found' });
    }
    const updated = await dbManager.findByIdAndUpdate('Crop', req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/crops/:id', async (req, res) => {
  try {
    const crop = await dbManager.findById('Crop', req.params.id);
    if (!crop || String(crop.owner) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Unauthorized or not found' });
    }
    await dbManager.findByIdAndDelete('Crop', req.params.id);
    res.json({ message: 'Crop deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ----------------------------------------------------
// 3. FERTILIZER & INVENTORY MANAGEMENT
// ----------------------------------------------------
router.get('/inventory', async (req, res) => {
  try {
    const inventory = await dbManager.find('Inventory', { owner: req.user.id });
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Helper function to check threshold and spawn notifications
const checkInventoryAlert = async (userId, item) => {
  const quantity = parseFloat(item.quantity);
  const threshold = parseFloat(item.minThreshold);
  if (quantity < threshold) {
    // Check if notification already exists for this item to avoid duplicates
    const existing = await dbManager.findOne('Notification', {
      userId,
      title: 'Low Inventory Alert',
      message: new RegExp(item.name, 'i'),
      isRead: false
    });
    
    if (!existing) {
      await dbManager.create('Notification', {
        userId,
        title: 'Low Inventory Alert',
        message: `${item.name} stock is below the minimum threshold. Current: ${item.quantity} ${item.unit}, Minimum required: ${item.minThreshold} ${item.unit}.`,
        type: 'alert'
      });
    }
  }
};

router.post('/inventory', async (req, res) => {
  const { name, type, quantity, unit, minThreshold, notes } = req.body;
  try {
    const item = await dbManager.create('Inventory', {
      owner: req.user.id,
      name,
      type,
      quantity: parseFloat(quantity),
      unit,
      minThreshold: parseFloat(minThreshold),
      notes
    });
    
    // Check stock thresholds
    await checkInventoryAlert(req.user.id, item);

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/inventory/:id', async (req, res) => {
  try {
    const item = await dbManager.findById('Inventory', req.params.id);
    if (!item || String(item.owner) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Unauthorized or not found' });
    }
    const updated = await dbManager.findByIdAndUpdate('Inventory', req.params.id, {
      ...req.body,
      quantity: parseFloat(req.body.quantity),
      minThreshold: parseFloat(req.body.minThreshold)
    });

    // Check stock thresholds after update
    await checkInventoryAlert(req.user.id, updated);

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/inventory/:id', async (req, res) => {
  try {
    const item = await dbManager.findById('Inventory', req.params.id);
    if (!item || String(item.owner) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Unauthorized or not found' });
    }
    await dbManager.findByIdAndDelete('Inventory', req.params.id);
    res.json({ message: 'Inventory item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ----------------------------------------------------
// 4. EQUIPMENT MANAGEMENT
// ----------------------------------------------------
router.get('/equipment', async (req, res) => {
  try {
    const equipment = await dbManager.find('Equipment', { owner: req.user.id });
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/equipment', async (req, res) => {
  const { name, type, status, purchaseDate, description } = req.body;
  try {
    const eq = await dbManager.create('Equipment', {
      owner: req.user.id,
      name,
      type,
      status: status || 'Available',
      purchaseDate,
      description
    });
    res.status(201).json(eq);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/equipment/:id', async (req, res) => {
  try {
    const eq = await dbManager.findById('Equipment', req.params.id);
    if (!eq || String(eq.owner) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Unauthorized or not found' });
    }
    const updated = await dbManager.findByIdAndUpdate('Equipment', req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/equipment/:id', async (req, res) => {
  try {
    const eq = await dbManager.findById('Equipment', req.params.id);
    if (!eq || String(eq.owner) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Unauthorized or not found' });
    }
    await dbManager.findByIdAndDelete('Equipment', req.params.id);
    res.json({ message: 'Equipment record deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ----------------------------------------------------
// 5. EXPENSE & INCOME TRACKING (FINANCIAL)
// ----------------------------------------------------
router.get('/finance', async (req, res) => {
  try {
    const logs = await dbManager.find('Finance', { owner: req.user.id });
    // Sort descending by date
    logs.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/finance', async (req, res) => {
  const { type, category, amount, date, description } = req.body;
  try {
    const record = await dbManager.create('Finance', {
      owner: req.user.id,
      type,
      category,
      amount: parseFloat(amount),
      date: date || new Date(),
      description
    });
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/finance/:id', async (req, res) => {
  try {
    const record = await dbManager.findById('Finance', req.params.id);
    if (!record || String(record.owner) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Unauthorized or not found' });
    }
    await dbManager.findByIdAndDelete('Finance', req.params.id);
    res.json({ message: 'Financial record deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ----------------------------------------------------
// 6. HARVEST RECORDS
// ----------------------------------------------------
router.get('/harvest', async (req, res) => {
  try {
    const harvests = await dbManager.find('Harvest', { owner: req.user.id });
    res.json(harvests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/harvest', async (req, res) => {
  const { cropId, quantity, unit, harvestDate, quality, notes } = req.body;
  try {
    const harvest = await dbManager.create('Harvest', {
      owner: req.user.id,
      cropId,
      quantity: parseFloat(quantity),
      unit,
      harvestDate,
      quality,
      notes
    });

    // Auto-update the linked crop status to 'Harvested'
    await dbManager.findByIdAndUpdate('Crop', cropId, { status: 'Harvested' });

    res.status(201).json(harvest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/harvest/:id', async (req, res) => {
  try {
    const harvest = await dbManager.findById('Harvest', req.params.id);
    if (!harvest || String(harvest.owner) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Unauthorized or not found' });
    }
    await dbManager.findByIdAndDelete('Harvest', req.params.id);
    res.json({ message: 'Harvest record deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ----------------------------------------------------
// 7. SALES MANAGEMENT
// ----------------------------------------------------
router.get('/sales', async (req, res) => {
  try {
    const sales = await dbManager.find('Sale', { owner: req.user.id });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/sales', async (req, res) => {
  const { harvestId, buyerName, quantity, revenue, date, notes } = req.body;
  try {
    const sale = await dbManager.create('Sale', {
      owner: req.user.id,
      harvestId,
      buyerName,
      quantity: parseFloat(quantity),
      revenue: parseFloat(revenue),
      date: date || new Date(),
      notes
    });

    // Smart Integration: Auto-create an Income entry in the Finance ledger!
    const harvest = await dbManager.findById('Harvest', harvestId);
    let cropName = 'Crop';
    if (harvest) {
      const crop = await dbManager.findById('Crop', harvest.cropId);
      if (crop) cropName = crop.name;
    }

    const financeLog = await dbManager.create('Finance', {
      owner: req.user.id,
      type: 'Income',
      category: 'Crop Sale',
      amount: parseFloat(revenue),
      date: date || new Date(),
      description: `Sale of ${quantity} units of ${cropName} to ${buyerName} (Ref: Sale Log)`
    });

    // Link the financial transaction ID back to the sale notes if desired
    sale.notes = (sale.notes ? sale.notes + '. ' : '') + `Link ID: ${financeLog._id}`;
    
    // Save updated sale (if mock we rewrite, if mongoose it updates)
    if (!dbManager.isDBConnected()) {
      await dbManager.findByIdAndUpdate('Sale', sale._id, { notes: sale.notes });
    }

    res.status(201).json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/sales/:id', async (req, res) => {
  try {
    const sale = await dbManager.findById('Sale', req.params.id);
    if (!sale || String(sale.owner) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Unauthorized or not found' });
    }
    
    // Locate and remove auto-linked Finance log
    let linkId = '';
    const match = sale.notes ? sale.notes.match(/Link ID: (\w+)/) : null;
    if (match && match[1]) {
      linkId = match[1];
      await dbManager.findByIdAndDelete('Finance', linkId);
    }

    await dbManager.findByIdAndDelete('Sale', req.params.id);
    res.json({ message: 'Sale deleted and income log reversed.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ----------------------------------------------------
// 8. NOTIFICATIONS
// ----------------------------------------------------
router.get('/notifications', async (req, res) => {
  try {
    const farmerNotifications = await dbManager.find('Notification', {
      $or: [{ userId: req.user.id }, { userId: 'all' }]
    });
    // Sort descending by date
    farmerNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(farmerNotifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/notifications/:id/read', async (req, res) => {
  try {
    const notification = await dbManager.findById('Notification', req.params.id);
    if (!notification || (String(notification.userId) !== String(req.user.id) && notification.userId !== 'all')) {
      return res.status(403).json({ message: 'Unauthorized or not found' });
    }
    const updated = await dbManager.findByIdAndUpdate('Notification', req.params.id, { isRead: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/notifications/:id', async (req, res) => {
  try {
    const notification = await dbManager.findById('Notification', req.params.id);
    if (!notification || (String(notification.userId) !== String(req.user.id) && notification.userId !== 'all')) {
      return res.status(403).json({ message: 'Unauthorized or not found' });
    }
    await dbManager.findByIdAndDelete('Notification', req.params.id);
    res.json({ message: 'Notification removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ----------------------------------------------------
// 9. REPORTS & CHARTS
// ----------------------------------------------------
router.get('/reports', async (req, res) => {
  try {
    const finances = await dbManager.find('Finance', { owner: req.user.id });
    const crops = await dbManager.find('Crop', { owner: req.user.id });
    const harvests = await dbManager.find('Harvest', { owner: req.user.id });

    // Financial sums
    let totalIncome = 0;
    let totalExpenses = 0;
    const categoryTotals = {};

    finances.forEach(log => {
      const amount = parseFloat(log.amount);
      if (log.type === 'Income') {
        totalIncome += amount;
      } else {
        totalExpenses += amount;
      }

      categoryTotals[log.category] = (categoryTotals[log.category] || 0) + amount;
    });

    // Active crop states
    const cropStatus = { Planted: 0, Growing: 0, Harvested: 0, Failed: 0 };
    crops.forEach(crop => {
      cropStatus[crop.status] = (cropStatus[crop.status] || 0) + 1;
    });

    // Harvest yields grouped by Crop Name
    const cropYields = {};
    for (let h of harvests) {
      const crop = await dbManager.findById('Crop', h.cropId);
      const name = crop ? crop.name : 'Unknown';
      cropYields[name] = (cropYields[name] || 0) + parseFloat(h.quantity);
    }

    res.json({
      financials: {
        totalIncome,
        totalExpenses,
        netProfit: totalIncome - totalExpenses,
        categoryTotals
      },
      crops: {
        totalCount: crops.length,
        statusDistribution: cropStatus
      },
      harvests: {
        cropYields
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
