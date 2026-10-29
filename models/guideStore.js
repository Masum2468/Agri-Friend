const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const initialGuides = require('../data/guides');

const STORE_FILE = path.join(__dirname, '../data/custom_guides.json');

// Ensure custom guides file exists
function loadCustomStore() {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, 'utf8');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading custom guides store:', e.message);
  }
  return { added: {}, deleted: [] };
}

function saveCustomStore(data) {
  try {
    const dir = path.dirname(STORE_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('Error saving custom guides store:', e.message);
  }
}

function safeFilter(item, deletedSet) {
  if (Array.isArray(item)) {
    return item.filter(x => !deletedSet.has(x && x.id));
  }
  return item;
}

// Define Mongoose Schema for Guide Item if MongoDB is active
const GuideItemSchema = new mongoose.Schema({
  customId: { type: String, required: true, unique: true },
  type: { type: String, required: true }, // 'crops', 'diseases', 'fertilizers', 'seasonal', 'calendar'
  isDeleted: { type: Boolean, default: false },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now }
});

let GuideItemModel = null;
try {
  GuideItemModel = mongoose.model('GuideItem');
} catch (e) {
  GuideItemModel = mongoose.model('GuideItem', GuideItemSchema);
}

const guideStore = {
  // Get all merged guide data
  async getAll() {
    const store = loadCustomStore();
    const deletedSet = new Set(store.deleted || []);
    const addedMap = store.added || {};

    // Clone base data
    const result = {
      knowledgeCenters: safeFilter(initialGuides.knowledgeCenters, deletedSet),
      crops: safeFilter(initialGuides.crops, deletedSet),
      diseases: safeFilter(initialGuides.diseases, deletedSet),
      fertilizers: safeFilter(initialGuides.fertilizers || (initialGuides.inputs && initialGuides.inputs.fertilizers) || [], deletedSet),
      inputs: initialGuides.inputs || {},
      seasonal: safeFilter(initialGuides.seasonal, deletedSet),
      calendar: safeFilter(initialGuides.calendar, deletedSet),
      pesticides: safeFilter(initialGuides.pesticides, deletedSet),
      troubleshoot: safeFilter(initialGuides.troubleshoot, deletedSet),
      tutorials: safeFilter(initialGuides.tutorials, deletedSet)
    };

    // If MongoDB is connected, sync any Mongo stored guides
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      try {
        const mongoItems = await GuideItemModel.find({});
        mongoItems.forEach(item => {
          if (item.isDeleted) {
            deletedSet.add(item.customId);
          } else if (item.data && item.type) {
            if (!addedMap[item.type]) addedMap[item.type] = [];
            if (!addedMap[item.type].some(x => x.id === item.customId)) {
              addedMap[item.type].push(item.data);
            }
          }
        });
      } catch (err) {
        console.warn('MongoDB guide fetch note:', err.message);
      }
    }

    // Append added items
    for (const [type, items] of Object.entries(addedMap)) {
      if (!Array.isArray(result[type])) result[type] = [];
      if (Array.isArray(items)) {
        items.forEach(item => {
          if (!deletedSet.has(item.id) && !result[type].some(x => x.id === item.id)) {
            result[type].unshift(item);
          }
        });
      }
    }

    return result;
  },

  // Add a new guide item
  async addItem(type, itemData) {
    const store = loadCustomStore();
    if (!store.added) store.added = {};
    if (!store.added[type]) store.added[type] = [];

    const id = itemData.id || `custom_${type}_${Date.now()}`;
    const newItem = { ...itemData, id, isCustom: true, createdAt: new Date().toISOString() };

    store.added[type].unshift(newItem);
    if (store.deleted) {
      store.deleted = store.deleted.filter(d => d !== id);
    }
    saveCustomStore(store);

    if (mongoose.connection && mongoose.connection.readyState === 1) {
      try {
        await GuideItemModel.findOneAndUpdate(
          { customId: id },
          { customId: id, type, isDeleted: false, data: newItem },
          { upsert: true, new: true }
        );
      } catch (err) {
        console.warn('MongoDB guide save note:', err.message);
      }
    }

    return newItem;
  },

  // Delete / remove a guide item
  async deleteItem(type, id) {
    const store = loadCustomStore();
    if (!store.deleted) store.deleted = [];
    if (!store.deleted.includes(id)) {
      store.deleted.push(id);
    }

    if (store.added && store.added[type]) {
      store.added[type] = store.added[type].filter(item => item.id !== id);
    }
    saveCustomStore(store);

    if (mongoose.connection && mongoose.connection.readyState === 1) {
      try {
        await GuideItemModel.findOneAndUpdate(
          { customId: id },
          { isDeleted: true },
          { upsert: true }
        );
      } catch (err) {
        console.warn('MongoDB guide delete note:', err.message);
      }
    }

    return true;
  }
};

module.exports = guideStore;
