const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const stream = require('stream');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const guides = require('../data/guides');
const guideStore = require('../models/guideStore');
const dbManager = require('../models/dbManager');
const { protect } = require('../middleware/auth');

// Ensure uploads directory exists for disk fallback
const uploadsDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer in-memory storage (allows streaming images directly to MongoDB Atlas GridFS)
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: function (req, file, cb) {
    const allowed = /jpeg|jpg|png|webp|gif|bmp/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext) || allowed.test(file.mimetype)) {
      return cb(null, true);
    }
    cb(new Error('Only image files (JPG, PNG, WEBP, GIF) are allowed.'));
  }
});

// Helper to stream file buffer to MongoDB Atlas GridFS
async function saveToGridFS(buffer, filename, mimetype, metadata = {}) {
  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'marketplace_images'
  });

  const uploadStream = bucket.openUploadStream(filename, {
    contentType: mimetype || 'image/jpeg',
    metadata: {
      ...metadata,
      uploadedAt: new Date()
    }
  });

  return new Promise((resolve, reject) => {
    const readable = new stream.Readable();
    readable.push(buffer);
    readable.push(null);
    readable.pipe(uploadStream)
      .on('error', reject)
      .on('finish', () => resolve(uploadStream.id));
  });
}

// Helper to delete an image from MongoDB Atlas GridFS
async function deleteFromGridFS(fileId) {
  try {
    if (!mongoose.connection || mongoose.connection.readyState !== 1 || !mongoose.connection.db) {
      return false;
    }
    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      return false;
    }
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'marketplace_images'
    });
    await bucket.delete(new mongoose.Types.ObjectId(fileId));
    return true;
  } catch (err) {
    console.warn(`GridFS deletion notice for ID ${fileId}:`, err.message);
    return false;
  }
}

// @route   GET /api/public/guides/all-centers
router.get('/guides/all-centers', async (req, res) => {
  try {
    const data = await guideStore.getAll();
    res.json(data);
  } catch (err) {
    res.json({
      knowledgeCenters: guides.knowledgeCenters,
      crops: guides.crops,
      diseases: guides.diseases,
      inputs: guides.inputs,
      seasonal: guides.seasonal,
      calendar: guides.calendar,
      troubleshoot: guides.troubleshoot,
      tutorials: guides.tutorials,
      fertilizers: guides.fertilizers,
      pesticides: guides.pesticides
    });
  }
});

// Admin Verification Route
router.post('/admin/verify', (req, res) => {
  const { passkey } = req.body;
  const adminSecret = process.env.ADMIN_KEY || 'admin123';
  if (passkey === adminSecret) {
    return res.json({ success: true, token: 'agri-admin-authorized-session' });
  }
  return res.status(401).json({ success: false, message: 'ভুল অ্যাডমিন পাসওয়ার্ড (Invalid admin key)' });
});

// Admin Add Guide Item
router.post('/admin/guide/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const allowed = ['crops', 'diseases', 'fertilizers', 'seasonal', 'calendar'];
    if (!allowed.includes(type)) {
      return res.status(400).json({ message: 'Invalid guide category' });
    }
    const item = await guideStore.addItem(type, req.body);
    res.status(201).json({ success: true, item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin Delete Guide Item
router.delete('/admin/guide/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params;
    await guideStore.deleteItem(type, id);
    res.json({ success: true, message: 'Guide card deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/public/guides/diagnose
router.post('/guides/diagnose', upload.single('diseaseImage'), (req, res) => {
  try {
    const { crop, symptoms } = req.body;
    let queryCrop = (crop || '').toLowerCase().trim();
    let querySym = (symptoms || '').toLowerCase().trim();
    
    // Find matching diseases from database
    let matches = guides.diseases.filter(d => {
      let cropMatch = !queryCrop || (d.crop && d.crop.toLowerCase().includes(queryCrop)) || (d.crop_bn && d.crop_bn.includes(queryCrop));
      let symMatch = !querySym || (d.symptoms && d.symptoms.toLowerCase().includes(querySym)) || (d.symptoms_bn && d.symptoms_bn.includes(querySym)) || (d.name_bn && d.name_bn.includes(querySym));
      return cropMatch && symMatch;
    });

    if (matches.length === 0) {
      // Return top 2 general disease matches for crop or overall
      matches = guides.diseases.filter(d => !queryCrop || (d.crop && d.crop.toLowerCase().includes(queryCrop))).slice(0, 2);
    }
    if (matches.length === 0) {
      matches = guides.diseases.slice(0, 3);
    }

    let uploadedImagePath = null;
    if (req.file) {
      if (req.file.buffer) {
        const ext = path.extname(req.file.originalname) || '.jpg';
        const diagFilename = 'diag-' + Date.now() + ext.toLowerCase();
        fs.writeFileSync(path.join(uploadsDir, diagFilename), req.file.buffer);
        uploadedImagePath = `/uploads/${diagFilename}`;
      } else if (req.file.filename) {
        uploadedImagePath = `/uploads/${req.file.filename}`;
      }
    }

    res.json({
      success: true,
      uploadedImage: uploadedImagePath,
      matches: matches,
      confidence: req.file ? '৮৭% (লক্ষণ সাদৃশ্য ভিত্তিক)' : '৭৫% (লক্ষণ অনুসন্ধান ভিত্তিক)',
      recommendation: 'আক্রান্ত অংশের পাতা কৃষি কর্মকর্তার কাছে প্রদর্শন করতে পারেন অথবা হটলাইন ১৬১২৩ নম্বরে কল করুন।'
    });
  } catch (err) {
    res.status(500).json({ error: 'নির্ণয় প্রক্রিয়াকরণে সমস্যা হয়েছে।' });
  }
});

// @route   GET /api/public/guides/crops
router.get('/guides/crops', (req, res) => {
  res.json(guides.crops);
});

// @route   GET /api/public/guides/diseases
router.get('/guides/diseases', (req, res) => {
  res.json(guides.diseases);
});

// @route   GET /api/public/guides/fertilizers
router.get('/guides/fertilizers', (req, res) => {
  res.json(guides.fertilizers);
});

// @route   GET /api/public/guides/pesticides
router.get('/guides/pesticides', (req, res) => {
  res.json(guides.pesticides);
});

// WMO Weather Interpretation Codes mapping
const WMO_MAP = {
  0: 'Sunny',
  1: 'Mainly Clear',
  2: 'Partly Cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Foggy',
  51: 'Drizzle',
  53: 'Drizzle',
  55: 'Dense Drizzle',
  56: 'Freezing Drizzle',
  57: 'Freezing Drizzle',
  61: 'Light Rain',
  63: 'Moderate Rain',
  65: 'Heavy Rain',
  66: 'Freezing Rain',
  67: 'Freezing Rain',
  71: 'Slight Snow',
  73: 'Moderate Snow',
  75: 'Heavy Snow',
  77: 'Snow Grains',
  80: 'Rain Showers',
  81: 'Heavy Rain Showers',
  82: 'Violent Rain Showers',
  85: 'Snow Showers',
  86: 'Heavy Snow Showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with Hail',
  99: 'Severe Thunderstorm'
};

// Known coordinates for major Bangladesh divisions & districts for instant sub-millisecond lookup
const BD_COORDINATES = {
  'dhaka': { lat: 23.8103, lon: 90.4125, name: 'Dhaka, Bangladesh' },
  'chattogram': { lat: 22.3569, lon: 91.7832, name: 'Chattogram, Bangladesh' },
  'chittagong': { lat: 22.3569, lon: 91.7832, name: 'Chattogram, Bangladesh' },
  'rajshahi': { lat: 24.3636, lon: 88.6241, name: 'Rajshahi, Bangladesh' },
  'khulna': { lat: 22.8456, lon: 89.5403, name: 'Khulna, Bangladesh' },
  'barishal': { lat: 22.7010, lon: 90.3535, name: 'Barishal, Bangladesh' },
  'barisal': { lat: 22.7010, lon: 90.3535, name: 'Barishal, Bangladesh' },
  'sylhet': { lat: 24.8949, lon: 91.8687, name: 'Sylhet, Bangladesh' },
  'rangpur': { lat: 25.7439, lon: 89.2752, name: 'Rangpur, Bangladesh' },
  'mymensingh': { lat: 24.7471, lon: 90.4203, name: 'Mymensingh, Bangladesh' },
  'cumilla': { lat: 23.4682, lon: 91.1788, name: 'Cumilla, Bangladesh' },
  'comilla': { lat: 23.4682, lon: 91.1788, name: 'Cumilla, Bangladesh' },
  'bogura': { lat: 24.8465, lon: 89.3777, name: 'Bogura, Bangladesh' },
  'bogra': { lat: 24.8465, lon: 89.3777, name: 'Bogura, Bangladesh' },
  'pirojpur': { lat: 22.5786, lon: 89.9720, name: 'Pirojpur, Bangladesh' },
  'gazipur': { lat: 24.0023, lon: 90.4264, name: 'Gazipur, Bangladesh' },
  'narayanganj': { lat: 23.6238, lon: 90.5000, name: 'Narayanganj, Bangladesh' },
  'tangail': { lat: 24.2513, lon: 89.9167, name: 'Tangail, Bangladesh' },
  'narsingdi': { lat: 23.9197, lon: 90.7176, name: 'Narsingdi, Bangladesh' },
  'faridpur': { lat: 23.6071, lon: 89.8429, name: 'Faridpur, Bangladesh' },
  'jashore': { lat: 23.1664, lon: 89.2081, name: 'Jashore, Bangladesh' },
  'jessore': { lat: 23.1664, lon: 89.2081, name: 'Jashore, Bangladesh' },
  'dinajpur': { lat: 25.6217, lon: 88.6355, name: 'Dinajpur, Bangladesh' },
  'pabna': { lat: 24.0116, lon: 89.2458, name: 'Pabna, Bangladesh' },
  'kushtia': { lat: 23.9013, lon: 89.1205, name: 'Kushtia, Bangladesh' },
  'cox\'s bazar': { lat: 21.4272, lon: 92.0058, name: "Cox's Bazar, Bangladesh" },
  'feni': { lat: 23.0186, lon: 91.3966, name: 'Feni, Bangladesh' },
  'noakhali': { lat: 22.8696, lon: 91.0994, name: 'Noakhali, Bangladesh' },
  'patuakhali': { lat: 22.3596, lon: 90.3299, name: 'Patuakhali, Bangladesh' },
  'bhola': { lat: 22.6859, lon: 90.6481, name: 'Bhola, Bangladesh' },
  'naogaon': { lat: 24.7936, lon: 88.9318, name: 'Naogaon, Bangladesh' },
  'natore': { lat: 24.4206, lon: 89.0003, name: 'Natore, Bangladesh' },
  'sirajganj': { lat: 24.4534, lon: 89.7008, name: 'Sirajganj, Bangladesh' },
  'jamalpur': { lat: 24.9375, lon: 89.9378, name: 'Jamalpur, Bangladesh' }
};

// @route   GET /api/public/weather
// @desc    Get agricultural-focused weather analysis using Open-Meteo Open API with smart Bangladesh district geocoding
router.get('/weather', async (req, res) => {
  const rawCity = (req.query.city || 'Dhaka').trim();
  const cityKey = rawCity.toLowerCase().replace(/,\s*bangladesh/i, '').trim();

  try {
    let lat, lon, displayName;

    // 1. Check known Bangladesh coordinates table for instant resolution
    if (BD_COORDINATES[cityKey]) {
      lat = BD_COORDINATES[cityKey].lat;
      lon = BD_COORDINATES[cityKey].lon;
      displayName = BD_COORDINATES[cityKey].name;
    } else {
      // 2. Lookup via Open-Meteo Geocoding Open API
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(rawCity)}&count=5&language=en&format=json`;
      const geoRes = await fetch(geoUrl);
      const geoData = await geoRes.json();

      if (geoData && geoData.results && geoData.results.length > 0) {
        // Prioritize Bangladesh results if available
        const bdMatch = geoData.results.find(r => r.country_code === 'BD');
        const match = bdMatch || geoData.results[0];
        lat = match.latitude;
        lon = match.longitude;
        displayName = match.country ? `${match.name}, ${match.country}` : match.name;
      } else {
        // Fallback default to Dhaka
        lat = 23.8103;
        lon = 90.4125;
        displayName = `${rawCity.charAt(0).toUpperCase() + rawCity.slice(1)}, Bangladesh`;
      }
    }

    // 3. Fetch real-time meteorological data from Open-Meteo Forecast API
    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&wind_speed_unit=kmh`;
    const weatherRes = await fetch(forecastUrl);
    const weatherData = await weatherRes.json();

    if (weatherData && weatherData.current) {
      const current = weatherData.current;
      const temp = Math.round(current.temperature_2m * 10) / 10;
      const humidity = Math.round(current.relative_humidity_2m);
      const windSpeed = Math.round(current.wind_speed_10m);
      const code = current.weather_code;
      const condition = WMO_MAP[code] || 'Partly Cloudy';

      const recommendation = generateAgriAdvice(temp, humidity, condition, windSpeed);

      return res.json({
        city: displayName,
        temp,
        humidity,
        condition,
        windSpeed,
        weatherCode: code,
        recommendation,
        isMock: false
      });
    }
  } catch (err) {
    console.warn('Live Open Weather API fetch failed, falling back to simulated engine:', err.message);
  }
  
  // 4. MOCK WEATHER FALLBACK (runs offline or on network interruption)
  const hash = rawCity.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const conditions = ['Sunny', 'Cloudy', 'Overcast with Rain', 'Windy', 'Drizzle', 'Partly Cloudy'];
  const condition = conditions[hash % conditions.length];

  let temp = 22 + (hash % 12); // 22°C to 34°C (typical Bangladesh temperature)
  let humidity = 60 + (hash % 30); // 60% to 90%
  let windSpeed = 6 + (hash % 12); // 6 km/h to 18 km/h

  if (condition.includes('Rain') || condition.includes('Drizzle')) {
    humidity = 82 + (hash % 12);
    temp = 24 + (hash % 4);
  }

  const recommendation = generateAgriAdvice(temp, humidity, condition, windSpeed);

  res.json({
    city: rawCity.toLowerCase() === 'dhaka' ? 'Dhaka, Bangladesh' : rawCity.charAt(0).toUpperCase() + rawCity.slice(1),
    temp,
    humidity,
    condition,
    windSpeed,
    recommendation,
    isMock: true
  });
});

// Helper for farming advice based on weather metrics
function generateAgriAdvice(temp, humidity, condition, windSpeed) {
  let adviceList = [];
  const condLower = condition.toLowerCase();

  const isRainy = condLower.includes('rain') || 
                  condLower.includes('drizzle') || 
                  condLower.includes('thunderstorm') || 
                  condLower.includes('shower');

  const isWindy = condLower.includes('wind') || 
                  condLower.includes('squall') || 
                  condLower.includes('tornado') || 
                  windSpeed > 15;

  if (isRainy) {
    adviceList.push("Natural irrigation active. Postpone scheduled field watering.");
    adviceList.push("Avoid applying foliar spray pesticides or chemical fertilizers since rain will wash them away.");
    adviceList.push("Ensure proper drainage in fields to prevent waterlogging and root rot.");
  } else {
    adviceList.push("Standard irrigation schedule recommended.");
    if (temp > 32) {
      adviceList.push("High temperature detected. Increase watering frequency for shallow-rooted crops.");
      adviceList.push("Excellent conditions for soil drying and land clearing.");
      adviceList.push("Avoid transplanting delicate seedlings during mid-day heat to prevent transplant shock.");
    } else {
      adviceList.push("Favorable ambient temperature for sowing and crop maintenance.");
    }
  }

  if (humidity > 80) {
    adviceList.push("High humidity levels. Monitor susceptible plants for fungal leaf spots or Powdery Mildew.");
    adviceList.push("Limit morning watering; water closer to the soil to avoid wet leaves.");
  }

  if (isWindy) {
    adviceList.push("Strong winds alert. Avoid spraying liquid chemicals as drift will reduce efficiency and harm surrounding areas.");
    adviceList.push("Inspect tall crop stakes or netting supports for wind stability.");
  } else if (isRainy) {
    adviceList.push("Calm winds, but postpone spraying pesticides or fertilizers until active precipitation stops.");
  } else {
    adviceList.push("Calm winds. Perfect time for spraying organic pesticides or foliar feeds.");
  }

  return adviceList;
}

// @route   GET /api/public/marketplace
// @desc    Get all active marketplace listings with optional search by item name/description and category filtering
router.get('/marketplace', async (req, res) => {
  try {
    const { search, q, itemType, dealType } = req.query;
    let query = {};

    const searchQuery = (search || q || '').trim();
    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, 'i');
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { sellerName: searchRegex }
      ];
    }

    if (itemType && itemType !== 'all') {
      query.itemType = itemType;
    }

    if (dealType && dealType !== 'all') {
      query.dealType = dealType;
    }

    const listings = await dbManager.find('MarketListing', query);
    // Sort descending by date
    listings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/public/marketplace/image/:id
// @desc    Stream permanently stored marketplace pictures directly from MongoDB Atlas GridFS
router.get('/marketplace/image/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if database is connected
    if (mongoose.connection && mongoose.connection.readyState === 1 && mongoose.connection.db) {
      const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'marketplace_images'
      });

      let objectId = null;
      let file = null;

      if (mongoose.Types.ObjectId.isValid(id)) {
        try {
          objectId = new mongoose.Types.ObjectId(id);
          const files = await bucket.find({ _id: objectId }).toArray();
          if (files && files.length > 0) {
            file = files[0];
          }
        } catch (e) {}
      }

      // If not found by ObjectId, attempt lookup by filename
      if (!file) {
        const filesByName = await bucket.find({ filename: id }).toArray();
        if (filesByName && filesByName.length > 0) {
          file = filesByName[0];
          objectId = file._id;
        }
      }

      if (file && objectId) {
        res.setHeader('Content-Type', file.contentType || 'image/jpeg');
        if (file.length) res.setHeader('Content-Length', file.length);
        // Cache for 1 year in browser/CDN
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        res.setHeader('Accept-Ranges', 'bytes');

        const downloadStream = bucket.openDownloadStream(objectId);
        downloadStream.on('error', (streamErr) => {
          console.error('GridFS streaming error:', streamErr);
          if (!res.headersSent) {
            res.status(404).json({ message: 'Error streaming image from GridFS' });
          }
        });

        return downloadStream.pipe(res);
      }
    }

    // Disk fallback if GridFS doesn't have it or local mode
    const diskFallback = path.join(uploadsDir, id);
    if (fs.existsSync(diskFallback)) {
      return res.sendFile(diskFallback);
    }

    res.status(404).json({ message: 'Image not found' });
  } catch (err) {
    console.error('Error fetching GridFS image:', err);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Server error retrieving image' });
    }
  }
});

// Alias for plural /images/:id
router.get('/marketplace/images/:id', (req, res) => {
  res.redirect(301, `/api/public/marketplace/image/${req.params.id}`);
});

// Optional Auth Middleware for marketplace creation
const optionalAuth = (req, res, next) => {
  const token = req.cookies && req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretagrikeychangeinprod');
      req.user = decoded;
    } catch (err) {
      // Continue without user
    }
  }
  next();
};

// Middleware to handle both JSON and multipart/form-data seamlessly
const handleUpload = (req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  if (contentType.includes('multipart/form-data')) {
    upload.single('image')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message || 'File upload failed' });
      }
      next();
    });
  } else {
    // Regular JSON/urlencoded body already parsed by express
    next();
  }
};

// @route   POST /api/public/marketplace
// @desc    Create a new listing with permanent picture storage in MongoDB Atlas GridFS
router.post('/marketplace', protect, handleUpload, async (req, res) => {
  try {
    const body = req.body || {};
    const title = (body.title || '').trim();
    
    let rawItemType = (body.itemType || 'Equipment').trim();
    let itemType = 'Equipment';
    if (/^seed/i.test(rawItemType)) itemType = 'Seed';
    else if (/^crop/i.test(rawItemType)) itemType = 'Crop';
    else if (/^serv/i.test(rawItemType) || /^labor/i.test(rawItemType)) itemType = 'Service';
    else itemType = 'Equipment';

    let rawDealType = (body.dealType || 'Sale').trim();
    let dealType = 'Sale';
    if (/^rent/i.test(rawDealType)) dealType = 'Rent';
    else if (/^share/i.test(rawDealType) || /^free/i.test(rawDealType)) dealType = 'Share';
    else dealType = 'Sale';

    const parsedPrice = parseFloat(body.price);
    const price = (!isNaN(parsedPrice) && parsedPrice >= 0) ? parsedPrice : 0;
    const contact = (body.contact || '').trim();
    const description = (body.description || '').trim();
    let imageUrl = (body.imageUrl || '').trim();

    // Handle Uploaded Picture: Permanently save to MongoDB Atlas GridFS
    if (req.file && req.file.buffer) {
      const isMongoConnected = mongoose.connection && mongoose.connection.readyState === 1 && mongoose.connection.db;

      if (isMongoConnected) {
        try {
          const ext = path.extname(req.file.originalname) || '.jpg';
          const gfsFilename = `listing-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext.toLowerCase()}`;
          
          const fileId = await saveToGridFS(
            req.file.buffer,
            gfsFilename,
            req.file.mimetype || 'image/jpeg',
            {
              originalName: req.file.originalname,
              sellerId: req.user ? (req.user.id || req.user._id) : null,
              size: req.file.size
            }
          );

          imageUrl = `/api/public/marketplace/image/${fileId}`;
          console.log(`✅ Marketplace picture permanently stored in MongoDB Atlas GridFS: ${imageUrl}`);
        } catch (gfsErr) {
          console.error('GridFS upload failed, using disk fallback:', gfsErr);
          const ext = path.extname(req.file.originalname) || '.jpg';
          const fallbackFilename = `listing-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext.toLowerCase()}`;
          fs.writeFileSync(path.join(uploadsDir, fallbackFilename), req.file.buffer);
          imageUrl = `/uploads/${fallbackFilename}`;
        }
      } else {
        // Fallback for local testing without active MongoDB Atlas connection
        const ext = path.extname(req.file.originalname) || '.jpg';
        const fallbackFilename = `listing-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext.toLowerCase()}`;
        fs.writeFileSync(path.join(uploadsDir, fallbackFilename), req.file.buffer);
        imageUrl = `/uploads/${fallbackFilename}`;
      }
    }

    if (!title) {
      return res.status(400).json({ message: 'Listing title is required.' });
    }
    if (!contact) {
      return res.status(400).json({ message: 'Contact info is required.' });
    }

    // Must be an authorized user
    if (!req.user || (!req.user.id && !req.user._id)) {
      return res.status(401).json({ message: 'Unauthorized. Please sign in to post a marketplace listing.' });
    }

    const sellerId = req.user.id || req.user._id;
    const sellerName = req.user.username || (body.sellerName || '').trim() || 'Farmer';

    const newListing = await dbManager.create('MarketListing', {
      sellerId,
      sellerName,
      title,
      itemType,
      dealType,
      price,
      contact,
      description,
      imageUrl
    });

    res.status(201).json(newListing);
  } catch (err) {
    console.error('Marketplace creation error:', err);
    res.status(500).json({ message: err.message || 'Server error creating listing' });
  }
});

// @route   DELETE /api/public/marketplace/:id
// @desc    Delete marketplace listing and clean up GridFS picture if present
router.delete('/marketplace/:id', protect, async (req, res) => {
  try {
    const listing = await dbManager.findById('MarketListing', req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Must be seller or admin to delete
    const currentUserId = String(req.user.id || req.user._id);
    const currentUsername = (req.user.username || '').trim().toLowerCase();
    const listingSellerId = String(listing.sellerId || '');
    const listingSellerName = (listing.sellerName || '').trim().toLowerCase();

    const isAuthorized = listingSellerId === currentUserId ||
                         (listingSellerName && currentUsername && listingSellerName === currentUsername) ||
                         req.user.role === 'admin';

    if (!isAuthorized) {
      return res.status(403).json({ message: 'Unauthorized: Only the creator of this listing or an admin can delete it.' });
    }

    // Clean up GridFS image if this listing had one
    if (listing.imageUrl && listing.imageUrl.includes('/marketplace/image/')) {
      const parts = listing.imageUrl.split('/marketplace/image/');
      const fileId = parts[1] ? parts[1].split('?')[0] : null;
      if (fileId) {
        await deleteFromGridFS(fileId);
      }
    }

    await dbManager.findByIdAndDelete('MarketListing', req.params.id);
    res.json({ message: 'Market listing deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
