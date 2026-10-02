import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { text, action } = req.body || {};
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ success: false, error: 'Text required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({ success: false, error: 'API key not configured' });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    let prompt = '';
    if (action === 'diacritics') {
      prompt = `You are an expert Pakistani Urdu linguist. Add correct aerab / tashkeel / diacritics (زبر، زیر، پیش، تشدید، جزم) to the following Urdu text to make it sound 100% accurate when spoken by a Text-To-Speech engine. Return ONLY the text with diacritics, without any markdown formatting or explanations:\n\n"${text}"`;
    } else if (action === 'polish') {
      prompt = `You are a master Pakistani Urdu scriptwriter. Correct any spelling or grammar mistakes in the following text (Urdu or Roman Urdu) to sound natural, eloquent, and engaging for a Pakistani voiceover. Keep the original intent intact. Return ONLY the polished text, without any introductory or explanatory text:\n\n"${text}"`;
    } else if (action === 'predict') {
      prompt = `Given this Urdu or Roman Urdu sentence: "${text}". Suggest the next 1-2 natural, meaningful Urdu sentences to continue the voiceover. Return ONLY the suggested continuation:`;
    } else {
      prompt = `Improve this Urdu voiceover text for clarity and natural Pakistani cadence:\n\n"${text}"`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt
    });

    const result = response.text || text;
    return res.json({ success: true, result: result.trim() });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
