import React, { createContext, useContext, useState, useEffect } from 'react';
import { dbService } from '../services/dbService';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Initialize User Data ---
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const [savedProfile, savedReadings] = await Promise.all([
          dbService.getUserProfile(),
          dbService.getAllReadings()
        ]);

        if (savedProfile) setProfile(savedProfile);
        if (savedReadings) setReadings(savedReadings.sort((a, b) => b.timestamp - a.timestamp));
      } catch (error) {
        console.error("Failed to load user data from IndexedDB", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // --- Actions ---

  /**
   * Updates the user profile in state and IndexedDB
   * @param {Object} profileData - { name, dob, tob, gender }
   */
  const updateProfile = async (profileData) => {
    try {
      await dbService.saveUserProfile(profileData);
      setProfile(profileData);
      return { success: true };
    } catch (error) {
      console.error("Error saving profile:", error);
      return { success: false, error };
    }
  };

  /**
   * Adds a new reading to the history
   * @param {Object} reading - { type: 'palm'|'tarot'|'horoscope', result: string, ... }
   */
  const addReading = async (reading) => {
    try {
      const savedEntry = await dbService.saveReading(reading);
      setReadings(prev => [savedEntry, ...prev]);
      return savedEntry;
    } catch (error) {
      console.error("Error saving reading:", error);
      throw error;
    }
  };

  /**
   * Clears specific history (useful for privacy controls in Settings)
   */
  const clearHistory = async () => {
    // Logic to clear readings from DB if requested
    // This maintains the profile but wipes the readings store
    const db = await dbService.clearChatHistory(); // Placeholder for clearing specific stores
    setReadings([]);
  };

  const value = {
    profile,
    readings,
    updateProfile,
    addReading,
    clearHistory,
    loading,
    isProfileComplete: !!(profile?.name && profile?.dob)
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// --- Custom Hook ---
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
