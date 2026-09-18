const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
// Import mongoose models
const User = require('./User');
const Farm = require('./Farm');
const Crop = require('./Crop');
const Inventory = require('./Inventory');
const Equipment = require('./Equipment');
const Finance = require('./Finance');
const Harvest = require('./Harvest');
const Sale = require('./Sale');
const Notification = require('./Notification');
const MarketListing = require('./MarketListing');

const MOCK_FILE_PATH = path.join(__dirname, '../data/mock_db.json');

// Ensure mock JSON database exists and has seeds
const initMockDB = () => {
  const dataDir = path.dirname(MOCK_FILE_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  let needInit = false;
  if (!fs.existsSync(MOCK_FILE_PATH)) {
    needInit = true;
  } else {
    try {
      const content = fs.readFileSync(MOCK_FILE_PATH, 'utf8').trim();
      if (!content || content.length === 0) {
        needInit = true;
      } else {
        JSON.parse(content);
      }
    } catch (e) {
      needInit = true;
    }
  }

  if (needInit) {
    const defaultData = {
      users: [
        {
          _id: "u_farmer",
          username: "farmer",
          password: bcrypt.hashSync("farmer123", 10),
          role: "farmer",
          farmName: "Sunset Valley Organic Farm",
          location: "Dhaka",
          contact: "+1 555-0199",
          createdAt: new Date().toISOString()
        },
        {
          _id: "u_admin",
          username: "admin",
          password: bcrypt.hashSync("admin123", 10),
          role: "admin",
          farmName: "Central Admin Portal",
          location: "Dhaka",
          contact: "+1 555-0100",
          createdAt: new Date().toISOString()
        }
      ],
      farms: [
        {
          _id: "f_1",
          owner: "u_farmer",
          name: "Sunset Valley Field A",
          location: "North Sector",
          size: 15,
          soilType: "Loamy",
          description: "Main farming field for seasonal cereals.",
          createdAt: new Date().toISOString()
        }
      ],
      crops: [
        {
          _id: "c_1",
          owner: "u_farmer",
          farmId: "f_1",
          name: "Wheat",
          variety: "HD 2967",
          plantingDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          expectedHarvestDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
          status: "Growing",
          notes: "Crop is showing healthy green stalks. Scheduled irrigation twice weekly.",
          createdAt: new Date().toISOString()
        }
      ],
      inventories: [
        {
          _id: "i_1",
          owner: "u_farmer",
          name: "NPK 19-19-19 Fertilizer",
          type: "Fertilizer",
          quantity: 250,
          unit: "kg",
          minThreshold: 50,
          notes: "Purchased last month. Keep in dry-storage.",
          updatedAt: new Date().toISOString()
        },
        {
          _id: "i_2",
          owner: "u_farmer",
          name: "Organic Neem Oil",
          type: "Pesticide",
          quantity: 8,
          unit: "L",
          minThreshold: 10,
          notes: "Need to restock for the pest warning season.",
          updatedAt: new Date().toISOString()
        }
      ],
      equipments: [
        {
          _id: "eq_1",
          owner: "u_farmer",
          name: "Rotary Tiller",
          type: "Tillage",
          status: "Available",
          purchaseDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
          description: "1.5m rotary tiller for seedbed preparation.",
          createdAt: new Date().toISOString()
        }
      ],
      finances: [
        {
          _id: "fi_1",
          owner: "u_farmer",
          type: "Expense",
          category: "Seeds",
          amount: 450,
          date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          description: "Purchased Wheat seeds for Field A."
        },
        {
          _id: "fi_2",
          owner: "u_farmer",
          type: "Income",
          category: "Crop Sale",
          amount: 1200,
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          description: "Sold last season tomatoes to local vendor."
        }
      ],
      harvests: [],
      sales: [],
      notifications: [
        {
          _id: "n_1",
          userId: "u_farmer",
          title: "Low Inventory Alert",
          message: "Organic Neem Oil stock is below the minimum threshold. Current: 8 L, Minimum required: 10 L.",
          type: "alert",
          isRead: false,
          createdAt: new Date().toISOString()
        }
      ],
      marketlistings: [
        {
          _id: "m_1",
          sellerId: "u_farmer",
          sellerName: "farmer",
          title: "John Deere Tractor 5050D for Rent",
          itemType: "Equipment",
          dealType: "Rent",
          price: 2500,
          contact: "+880 1711-000111",
          description: "50 HP reliable tractor in excellent condition. Available with rotary tiller attachment. Daily rates apply.",
          createdAt: new Date().toISOString()
        },
        {
          _id: "m_2",
          sellerId: "u_farmer",
          sellerName: "farmer",
          title: "Premium Organic Compost Fertilizer",
          itemType: "Seed",
          dealType: "Sale",
          price: 850,
          contact: "+880 1711-000111",
          description: "100% pure organic decomposed compost for all soil and vegetable types. 50kg bag.",
          createdAt: new Date().toISOString()
        },
        {
          _id: "m_3",
          sellerId: "u_admin",
          sellerName: "admin",
          title: "Automatic Drip Irrigation Kit",
          itemType: "Equipment",
          dealType: "Sale",
          price: 4500,
          contact: "+880 1755-000222",
          description: "Complete 1-acre drip irrigation system with filter, main pipe, drippers, and control valves.",
          createdAt: new Date().toISOString()
        },
        {
          _id: "m_4",
          sellerId: "u_farmer",
          sellerName: "farmer",
          title: "High Yield BRRI-28 Seed Paddy",
          itemType: "Seed",
          dealType: "Sale",
          price: 1200,
          contact: "+880 1711-000111",
          description: "Certified high germination rate Boro rice seeds. 20kg sealed sack.",
          createdAt: new Date().toISOString()
        },
        {
          _id: "m_5",
          sellerId: "u_farmer",
          sellerName: "farmer",
          title: "Fresh Farm Harvest Red Tomatoes",
          itemType: "Crop",
          dealType: "Sale",
          price: 40,
          contact: "+880 1711-000111",
          description: "Freshly harvested chemical-free juicy red tomatoes directly from farm. Price per kg.",
          createdAt: new Date().toISOString()
        },
        {
          _id: "m_6",
          sellerId: "u_farmer",
          sellerName: "farmer",
          title: "Tractor Plowing & Field Preparation Service",
          itemType: "Service",
          dealType: "Rent",
          price: 1500,
          contact: "+880 1711-000111",
          description: "Experienced driver offering deep plowing, rotovator tilling, and bed preparation per bigha.",
          createdAt: new Date().toISOString()
        }
      ]
    };
    fs.writeFileSync(MOCK_FILE_PATH, JSON.stringify(defaultData, null, 2));
  }
};

const readMockData = () => {
  initMockDB();
  return JSON.parse(fs.readFileSync(MOCK_FILE_PATH, 'utf8'));
};

const writeMockData = (data) => {
  fs.writeFileSync(MOCK_FILE_PATH, JSON.stringify(data, null, 2));
};

const getCollectionName = (modelName) => {
  const mapping = {
    'User': 'users',
    'Farm': 'farms',
    'Crop': 'crops',
    'Inventory': 'inventories',
    'Equipment': 'equipments',
    'Finance': 'finances',
    'Harvest': 'harvests',
    'Sale': 'sales',
    'Notification': 'notifications',
    'MarketListing': 'marketlistings'
  };
  return mapping[modelName];
};

const getMongooseModel = (modelName) => {
  const models = { User, Farm, Crop, Inventory, Equipment, Finance, Harvest, Sale, Notification, MarketListing };
  return models[modelName];
};

// Check if MongoDB is connected and active
const isDBConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Database interface manager
const dbManager = {
  isDBConnected,

  async find(modelName, query = {}) {
    if (isDBConnected()) {
      return getMongooseModel(modelName).find(query);
    }
    
    // JSON mock query solver
    const mock = readMockData();
    const collection = mock[getCollectionName(modelName)] || [];
    
    return collection.filter(item => {
      for (let key in query) {
        let val = query[key];
        
        if (key === '$or' && Array.isArray(val)) {
          const matchedAny = val.some(subQuery => {
            for (let subKey in subQuery) {
              let targetVal = item[subKey];
              let matchVal = subQuery[subKey];
              if (targetVal !== undefined && targetVal !== null) {
                if (typeof targetVal === 'string' && typeof matchVal === 'string') {
                  if (targetVal.toLowerCase() === matchVal.toLowerCase()) return true;
                } else if (String(targetVal) === String(matchVal)) {
                  return true;
                }
              }
            }
            return false;
          });
          if (!matchedAny) return false;
        } else if (val instanceof RegExp) {
          if (!val.test(item[key])) return false;
        } else if (typeof val === 'string' && typeof item[key] === 'string') {
          if (item[key].toLowerCase() !== val.toLowerCase()) return false;
        } else if (String(item[key]) !== String(val)) {
          return false;
        }
      }
      return true;
    });
  },

  async findOne(modelName, query = {}) {
    const results = await this.find(modelName, query);
    return results[0] || null;
  },

  async findById(modelName, id) {
    if (isDBConnected()) {
      return getMongooseModel(modelName).findById(id);
    }
    const mock = readMockData();
    const collection = mock[getCollectionName(modelName)] || [];
    return collection.find(item => String(item._id) === String(id)) || null;
  },

  async create(modelName, data) {
    if (isDBConnected()) {
      const Model = getMongooseModel(modelName);
      const doc = new Model(data);
      return doc.save();
    }

    const mock = readMockData();
    const collectionName = getCollectionName(modelName);
    
    const newItem = {
      _id: Math.random().toString(36).substr(2, 9),
      ...data,
      createdAt: new Date().toISOString()
    };

    // If it's a user, hash their password
    if (modelName === 'User' && newItem.password) {
      newItem.password = await bcrypt.hash(newItem.password, 10);
    }

    mock[collectionName].push(newItem);
    writeMockData(mock);
    return newItem;
  },

  async findByIdAndUpdate(modelName, id, updateData) {
    if (isDBConnected()) {
      return getMongooseModel(modelName).findByIdAndUpdate(id, updateData, { new: true });
    }

    const mock = readMockData();
    const collectionName = getCollectionName(modelName);
    const collection = mock[collectionName] || [];
    
    const index = collection.findIndex(item => String(item._id) === String(id));
    if (index === -1) return null;

    collection[index] = {
      ...collection[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    writeMockData(mock);
    return collection[index];
  },

  async findByIdAndDelete(modelName, id) {
    if (isDBConnected()) {
      return getMongooseModel(modelName).findByIdAndDelete(id);
    }

    const mock = readMockData();
    const collectionName = getCollectionName(modelName);
    const collection = mock[collectionName] || [];
    
    const index = collection.findIndex(item => String(item._id) === String(id));
    if (index === -1) return null;

    const removed = collection.splice(index, 1)[0];
    writeMockData(mock);
    return removed;
  },

  // Specific password verification helper
  async checkPassword(user, candidatePassword) {
    // If it's a Mongoose doc, it might have the comparePassword method, otherwise use bcrypt directly
    if (user.comparePassword && typeof user.comparePassword === 'function') {
      return user.comparePassword(candidatePassword);
    }
    return bcrypt.compare(candidatePassword, user.password);
  }
};

module.exports = dbManager;
