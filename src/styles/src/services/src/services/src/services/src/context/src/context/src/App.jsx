import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from './context/AppContext';
import { useUser } from './context/UserContext';
import { t } from './services/i18n';

// Views (Components will be created in subsequent steps)
import SplashScreen from './views/SplashScreen';
import Onboarding from './views/Onboarding';
import ProfileSetup from './views/ProfileSetup';
import Dashboard from './views/Dashboard';
import PalmScan from './views/PalmScan';
import PalmChat from './views/PalmChat';
import TarotReading from './views/TarotReading';
import DailyGuidance from './views/DailyGuidance';
import Horoscope from './views/Horoscope';
import Settings from './views/Settings';
import PrivacyPolicy from './views/PrivacyPolicy';
import Disclaimer from './views/Disclaimer';

const App = () => {
  const { currentView, navigateTo, language, isInitialized } = useApp();
  const { isProfileComplete } = useUser();
  const [backPressCount, setBackPressCount] = useState(0);

  // --- Double Back to Exit Logic ---
  useEffect(() => {
    const handleBackButton = (e) => {
      if (currentView === 'dashboard') {
        e.preventDefault();
        setBackPressCount((prev) => prev + 1);
        setTimeout(() => setBackPressCount(0), 2000);
      }
    };

    window.addEventListener('popstate', handleBackButton);
    return () => window.removeEventListener('popstate', handleBackButton);
  }, [currentView]);

  // --- View Mapper ---
  const renderView = () => {
    switch (currentView) {
      case 'splash': return <SplashScreen key="splash" />;
      case 'onboarding': return <Onboarding key="onboarding" />;
      case 'profile': return <ProfileSetup key="profile" />;
      case 'dashboard': return <Dashboard key="dashboard" />;
      case 'palm-scan': return <PalmScan key="palm-scan" />;
      case 'palm-chat': return <PalmChat key="palm-chat" />;
      case 'tarot': return <TarotReading key="tarot" />;
      case 'daily-guidance': return <DailyGuidance key="daily-guidance" />;
      case 'horoscope': return <Horoscope key="horoscope" />;
      case 'settings': return <Settings key="settings" />;
      case 'privacy': return <PrivacyPolicy key="privacy" />;
      case 'disclaimer-full': return <Disclaimer key="disclaimer" />;
      default: return <Dashboard key="dashboard-default" />;
    }
  };

  if (!isInitialized) return <SplashScreen />;

  return (
    <div className="relative min-h-screen w-full bg-midnight overflow-hidden font-sans selection:bg-spirit-purple/30">
      
      {/* 🌌 Permanent Cosmic Background Elements */}
      <div className="cosmic-bg">
        <div className="cosmic-orb w-[300px] h-[300px] -top-20 -left-20 bg-spirit-indigo/20" />
        <div className="cosmic-orb w-[400px] h-[400px] -bottom-40 -right-20 bg-spirit-purple/10" />
        <div className="cosmic-orb w-[250px] h-[250px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-spirit-cyan/5" />
      </div>

      {/* 📱 Main View Container */}
      <main className="relative z-10 h-full w-full max-w-md mx-auto flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex-grow flex flex-col"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>

        {/* ⚖️ Mandatory Subtle Disclaimer (Hidden on Splash/Onboarding) */}
        {!['splash', 'onboarding'].includes(currentView) && (
          <footer className="p-4 text-center">
            <button 
              onClick={() => navigateTo('disclaimer-full')}
              className="text-[10px] uppercase tracking-widest text-cosmic-muted/50 hover:text-cosmic-text transition-colors"
            >
              {t('disclaimer_short', language)}
            </button>
          </footer>
        )}
      </main>

      {/* 🛡️ Exit Snackbar */}
      <AnimatePresence>
        {backPressCount > 1 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-spirit-purple text-white shadow-2xl text-sm"
          >
            Press back again to exit
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
