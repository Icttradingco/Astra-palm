import { openDB } from 'idb';

const DB_NAME = 'AIPalmReaderDB';
const DB_VERSION = 1;

/**
 * DATABASE SCHEMA:
 * - settings: App preferences (language, onboarding_complete)
 * - profile: User identity (name, dob, tob, gender)
 * - readings: History of Palm, Tarot, and Horoscope results
 * - chats: Persistent AI messenger history
 */

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    // App settings store
    if (!db.objectStoreNames.contains('settings')) {
      db.createObjectStore('settings');
    }
    // User profile store (usually one entry)
    if (!db.objectStoreNames.contains('profile')) {
      db.createObjectStore('profile');
    }
    // Readings history (keyed by timestamp/id)
    if (!db.objectStoreNames.contains('readings')) {
      db.createObjectStore('readings', { keyPath: 'id' });
    }
    // Chat sessions and messages
    if (!db.objectStoreNames.contains('chats')) {
      db.createObjectStore('chats', { keyPath: 'id', autoIncrement: true });
    }
  },
});

export const dbService = {
  // Generic Get/Set
  async getValue(storeName, key) {
    const db = await dbPromise;
    return db.get(storeName, key);
  },

  async setValue(storeName, key, value) {
    const db = await dbPromise;
    return db.put(storeName, value, key);
  },

  // Profile Management
  async getUserProfile() {
    const db = await dbPromise;
    return db.get('profile', 'user_data');
  },

  async saveUserProfile(profile) {
    const db = await dbPromise;
    return db.put('profile', profile, 'user_data');
  },

  // Readings (Palm, Tarot, Daily)
  async saveReading(reading) {
    const db = await dbPromise;
    const entry = {
      ...reading,
      id: reading.id || Date.now().toString(),
      timestamp: Date.now(),
    };
    await db.put('readings', entry);
    return entry;
  },

  async getAllReadings() {
    const db = await dbPromise;
    return db.getAll('readings');
  },

  // Chat History
  async getChatHistory() {
    const db = await dbPromise;
    return db.getAll('chats');
  },

  async addChatMessage(message) {
    const db = await dbPromise;
    // message: { role: 'user' | 'assistant', content: string, timestamp: number }
    return db.add('chats', {
      ...message,
      timestamp: Date.now()
    });
  },

  async clearChatHistory() {
    const db = await dbPromise;
    return db.clear('chats');
  }
};
