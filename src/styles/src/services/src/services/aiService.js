/**
 * AI SERVICE - OpenRouter Integration
 * Models: 
 * - Vision: allenai/molmo-2-8b:free
 * - Reasoning: liquid/lfm-2.5-1.2b-thinking:free
 */

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

const MODELS = {
  VISION: "allenai/molmo-2-8b:free",
  REASONING: "liquid/lfm-2.5-1.2b-thinking:free",
};

/**
 * STRICT SYSTEM PROMPT
 * Enforces safety, tone, and symbolic nature of the app.
 */
const getSystemPrompt = (language = 'English', context = 'general') => {
  const basePrompt = `
    You are a Senior Spiritual Guide and Master of Symbolic Interpretation. 
    Your expertise covers Palmistry, Tarot, and Astrology.

    STRICT RULES:
    1. TONE: Calm, reflective, spiritual, and human-like.
    2. CONTENT: Provide symbolic insight and guidance only. 
    3. FORBIDDEN: 
       - No medical, legal, or financial advice.
       - No fixed predictions or "guaranteed" future events.
       - No fear-based language, curses, or threats.
       - No manipulation or artificial urgency.
    4. STRUCTURE: Provide long-form, structured, and poetic responses.
    5. LANGUAGE: You MUST respond entirely in ${language}.
    6. DISCLAIMER: Always frame insights as "possibilities" or "symbolic reflections."
  `;

  const contexts = {
    palm: "Focus on the Heart Line, Head Line, Life Line, and Fate Line. Interpret their curves and intersections as metaphors for emotional, intellectual, and life energy. Avoid health diagnostics.",
    tarot: "Interpret the cards drawn in the context of the user's question. Focus on archetypes and spiritual growth.",
    horoscope: "Provide a reflection based on planetary movements and zodiac archetypes.",
    chat: "Engage in a messenger-style spiritual conversation. Be a reflective listener."
  };

  return `${basePrompt}\n\nContext-Specific Task: ${contexts[context] || contexts.chat}`;
};

/**
 * API Request Wrapper
 */
async function fetchOpenRouter(payload) {
  if (!API_KEY) {
    throw new Error("API_KEY_MISSING");
  }

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "AI Palm Reader",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error?.message || "API_REQUEST_FAILED");
    }

    return await response.json();
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
}

export const aiService = {
  /**
   * PALM SCAN: Vision-based analysis
   * @param {string} imageBase64 - The base64 encoded image of the palm
   * @param {string} language - User selected language
   */
  async analyzePalm(imageBase64, language = 'English') {
    const payload = {
      model: MODELS.VISION,
      messages: [
        {
          role: "system",
          content: getSystemPrompt(language, 'palm')
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this palm image. Identify the Heart, Head, Life, and Fate lines. Provide a structured, symbolic reading of each."
            },
            {
              type: "image_url",
              image_url: {
                url: imageBase64
              }
            }
          ]
        }
      ]
    };

    return await fetchOpenRouter(payload);
  },

  /**
   * TEXT COMPLETION: Tarot, Horoscope, and Chat
   */
  async getGuidance({ messages, context = 'chat', language = 'English' }) {
    const payload = {
      model: MODELS.REASONING,
      messages: [
        {
          role: "system",
          content: getSystemPrompt(language, context)
        },
        ...messages
      ],
      temperature: 0.7,
    };

    return await fetchOpenRouter(payload);
  }
};
