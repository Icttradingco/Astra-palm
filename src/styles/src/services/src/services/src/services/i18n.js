/**
 * 🌍 INTERNATIONALIZATION SERVICE (i18n)
 * Supported: EN, HI, ES, FR, IT, KO
 */

export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'ko', name: 'Korean', native: '한국어' },
];

const translations = {
  en: {
    app_name: "AI Palm Reader",
    disclaimer_short: "Interpretation only. No guarantees.",
    disclaimer_long: "All readings are for spiritual guidance and reflection purposes only. We do not provide medical, legal, or financial advice. No future event is guaranteed.",
    onboarding_1_title: "Unlock Your Secrets",
    onboarding_1_desc: "Discover the ancient wisdom hidden in the lines of your palms using advanced AI vision.",
    onboarding_2_title: "Tarot Guidance",
    onboarding_2_desc: "Seek clarity on love, career, and personal growth through symbolic card reflections.",
    onboarding_3_title: "Cosmic Insights",
    onboarding_3_desc: "Daily horoscopes and spiritual chat to align your energy with the universe.",
    start_journey: "Start Journey",
    profile_title: "Your Profile",
    name: "Name",
    dob: "Date of Birth",
    tob: "Time of Birth",
    gender: "Gender",
    save_continue: "Save & Continue",
    nav_home: "Home",
    nav_scan: "Palm Scan",
    nav_tarot: "Tarot",
    nav_chat: "AI Chat",
    nav_settings: "Settings",
    feature_palm: "Palm Reading",
    feature_tarot: "Tarot Reading",
    feature_love: "Love Reading",
    feature_daily: "Daily Guidance",
    feature_horoscope: "Horoscope",
    scan_left: "Left Hand",
    scan_right: "Right Hand",
    scan_guide: "Position your palm within the frame and ensure good lighting.",
    analyzing: "Consulting the Stars...",
    retry: "Try Again",
  },
  hi: {
    app_name: "एआई पाम रीडर",
    disclaimer_short: "केवल व्याख्या। कोई गारंटी नहीं।",
    disclaimer_long: "सभी रीडिंग केवल आध्यात्मिक मार्गदर्शन और प्रतिबिंब के उद्देश्यों के लिए हैं। हम चिकित्सा, कानूनी या वित्तीय सलाह प्रदान नहीं करते हैं।",
    onboarding_1_title: "अपने रहस्य खोलें",
    onboarding_1_desc: "एआई दृष्टि का उपयोग करके अपनी हथेलियों की रेखाओं में छिपे प्राचीन ज्ञान की खोज करें।",
    start_journey: "यात्रा शुरू करें",
    feature_palm: "हस्तरेखा विश्लेषण",
    feature_horoscope: "राशिफल",
    analyzing: "सितारों से परामर्श कर रहे हैं...",
  },
  es: {
    app_name: "Lector de Palma AI",
    disclaimer_short: "Solo interpretación. Sin garantías.",
    onboarding_1_title: "Desbloquea tus Secretos",
    onboarding_1_desc: "Descubre la sabiduría antigua oculta en las líneas de tus palmas.",
    start_journey: "Comenzar Viaje",
    feature_palm: "Lectura de Palma",
    feature_horoscope: "Horóscopo",
    analyzing: "Consultando las estrellas...",
  },
  fr: {
    app_name: "Lecteur de Paume IA",
    disclaimer_short: "Interprétation uniquement. Aucune garantie.",
    onboarding_1_title: "Révélez vos Secrets",
    onboarding_1_desc: "Découvrez la sagesse ancienne cachée dans les lignes de vos mains.",
    start_journey: "Commencer le Voyage",
    feature_palm: "Chiromancie",
    feature_horoscope: "Horoscope",
    analyzing: "Consultation des astres...",
  },
  it: {
    app_name: "Lettore della Mano AI",
    disclaimer_short: "Solo interpretazione. Nessuna garanzia.",
    onboarding_1_title: "Svela i tuoi Segreti",
    onboarding_1_desc: "Scopri l'antica saggezza nascosta nelle linee dei tuoi palmi.",
    start_journey: "Inizia il Viaggio",
    feature_palm: "Lettura della Mano",
    feature_horoscope: "Oroscopo",
    analyzing: "Consultando le stelle...",
  },
  ko: {
    app_name: "AI 손금 판독기",
    disclaimer_short: "해석일 뿐입니다. 보장되지 않습니다.",
    onboarding_1_title: "당신의 비밀을 잠금 해제하세요",
    onboarding_1_desc: "AI 비전을 사용하여 손금에 숨겨진 고대 지혜를 발견하세요.",
    start_journey: "여행 시작",
    feature_palm: "손금 보기",
    feature_horoscope: "운세",
    analyzing: "별들에게 묻는 중...",
  }
};

/**
 * Helper to get translated string
 * @param {string} key - The key to translate
 * @param {string} lang - Language code ('en', 'hi', etc.)
 */
export const t = (key, lang = 'en') => {
  const languageSet = translations[lang] || translations['en'];
  return languageSet[key] || translations['en'][key] || key;
};

export default translations;
