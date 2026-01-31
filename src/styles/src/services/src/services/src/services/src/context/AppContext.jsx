import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { dbService } from '../services/dbService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // --- State ---
  const [language, setLanguage] = useState('en');
  const [currentView, setCurrentView] = useState('splash'); // splash, onboarding, profile, dashboard, etc.
  const [isInitialized, setIsInitialized] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);

  // --- Initialization ---
  useEffect(() => {
    const initApp = async () => {
      // Load saved language
      const savedLang = await dbService.getValue('settings', 'language');
      if (savedLang) setLanguage(savedLang);

      // Check if onboarding is complete
      const onboardingDone = await dbService.getValue('settings', 'onboarding_complete');
      const profile = await dbService.getUserProfile();

      // Determine initial view based on data presence
      if (!onboardingDone) {
        setCurrentView('onboarding');
      } else if (!profile) {
        setCurrentView('profile');
      } else {
        setCurrentView('dashboard');
      }

      setIsInitialized(true);
    };

    initApp();
  }, []);

  // --- Navigation Logic (History API Sync) ---
  const navigateTo = useCallback((view, pushState = true) => {
    setCurrentView(view);
    if (pushState) {
      window.history.pushState({ view }, '', `#${view}`);
    }
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.view) {
        setCurrentView(event.state.view);
      } else {
        // Fallback or home
        setCurrentView('dashboard');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // --- Actions ---
  const changeLanguage = async (code) => {
    setLanguage(code);
    await dbService.setValue('settings', 'language', code);
  };

  const completeOnboarding = async () => {
    await dbService.setValue('settings', 'onboarding_complete', true);
    navigateTo('profile');
  };

  const value = {
    language,
    changeLanguage,
    currentView,
    navigateTo,
    isInitialized,
    globalLoading,
    setGlobalLoading,
    completeOnboarding
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// --- Custom Hook ---
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
