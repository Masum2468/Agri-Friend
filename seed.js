const mongoose = require('mongoose');
const User = require('./models/User');
const MarketListing = require('./models/MarketListing');
const connectDB = require('./db');

const seedDatabase = async () => {
  // Connect to DB
  const isConnected = await connectDB();
  if (!isConnected) {
    console.log('Skipping database seeding since MongoDB is not connected.');
    return;
  }

  try {
    // Clear existing users and listings
    await User.deleteMany({});
    await MarketListing.deleteMany({});
    console.log('Cleared existing users and marketplace listings...');

    // 1. Create Admin User
    const admin = new User({
      username: 'admin',
      password: 'admin123',
      role: 'admin',
      farmName: 'Central Admin Office',
      location: 'Dhaka',
      contact: '+1 555-0100'
    });
    await admin.save();
    console.log('Created Admin User: username=admin, password=admin123');

    // 2. Create Farmer User
    const farmer = new User({
      username: 'farmer',
      password: 'farmer123',
      role: 'farmer',
      farmName: 'Sunset Valley Organic Farm',
      location: 'Dhaka',
      contact: '+1 555-0199'
    });
    await farmer.save();
    console.log('Created Farmer User: username=farmer, password=farmer123');

    // 3. Create Sample Market Listings
    const sampleListings = [
      {
        sellerId: farmer._id,
        sellerName: farmer.username,
        title: 'John Deere Tractor 5050D for Rent',
        itemType: 'Equipment',
        dealType: 'Rent',
        price: 50,
        contact: '+1 555-0199',
        description: '50 HP reliable tractor in excellent condition. Available with rotary tiller attachment. Daily rates apply.'
      },
      {
        sellerId: farmer._id,
        sellerName: farmer.username,
        title: 'Premium Organic Compost Bags',
        itemType: 'Seed',
        dealType: 'Sale',
        price: 12,
        contact: '+1 555-0199',
        description: '100% organic, fully decomposed cow manure and crop residue compost. High in nutrient density. Minimum order 10 bags.'
      },
      {
        sellerId: admin._id,
        sellerName: admin.username,
        title: 'Automatic Drip Irrigation Kit',
        itemType: 'Equipment',
        dealType: 'Sale',
        price: 350,
        contact: '+1 555-0100',
        description: 'Complete drip irrigation setup suitable for up to 1 acre. Includes water filter, drip tubes, drippers, and fittings.'
      },
      {
        sellerId: farmer._id,
        sellerName: farmer.username,
        title: 'High-yield Seed Potatoes (Kufri Jyoti)',
        itemType: 'Seed',
        dealType: 'Sale',
        price: 2,
        contact: '+1 555-0199',
        description: 'Certified disease-free potato seed tubers, size 35-45mm. High yields and late blight resistance.'
      }
    ];
    await MarketListing.insertMany(sampleListings);
    console.log('Created sample marketplace listings!');
    console.log('Database seeding completed successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Seeding Error:', err.message);
    mongoose.connection.close();
  }
};

seedDatabase();
