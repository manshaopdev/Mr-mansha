import { GoogleGenAI } from '@google/genai';
import lamejs from 'lamejs';

// Polyfill lamejs internal global requirements in serverless environment
if (typeof (globalThis as any).MPEGMode === 'undefined') {
  try {
    (globalThis as any).MPEGMode = (lamejs as any)?.MPEGMode || require('lamejs/src/js/MPEGMode.js');
    (globalThis as any).Lame = (lamejs as any)?.Lame || require('lamejs/src/js/Lame.js');
  } catch {}
}

function convertWavBase64ToMp3Base64(base64Wav: string): string {
  const wavBuffer = Buffer.from(base64Wav, 'base64');
  let dataOffset = 44;
  let dataSize = wavBuffer.length - 44;
  let sampleRate = 24000;
  let numChannels = 1;

  if (wavBuffer.length > 44) {
    try {
      numChannels = wavBuffer.readUInt16LE(22) || 1;
      sampleRate = wavBuffer.readUInt32LE(24) || 24000;
      let offset = 12;
      while (offset < wavBuffer.length - 8) {
        const chunkId = wavBuffer.toString('ascii', offset, offset + 4);
        const chunkSize = wavBuffer.readUInt32LE(offset + 4);
        if (chunkId === 'data') {
          dataOffset = offset + 8;
          dataSize = chunkSize;
          break;
        }
        offset += 8 + chunkSize;
      }
    } catch {
      dataOffset = 44;
      dataSize = wavBuffer.length - 44;
    }
  }

  const maxEnd = Math.min(wavBuffer.length, dataOffset + dataSize);
  const pcmBytes = wavBuffer.subarray(dataOffset, maxEnd);
  const numSamples = Math.floor(pcmBytes.length / 2);
  const samples = new Int16Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    samples[i] = pcmBytes.readInt16LE(i * 2);
  }

  const Mp3Encoder = (lamejs as any)?.Mp3Encoder || (lamejs as any)?.default?.Mp3Encoder;
  if (!Mp3Encoder) {
    return base64Wav;
  }

  try {
    const mp3encoder = new Mp3Encoder(numChannels, sampleRate, 128);
    const mp3Buffers: Buffer[] = [];
    const sampleBlockSize = 1152;

    for (let i = 0; i < samples.length; i += sampleBlockSize) {
      const chunk = samples.subarray(i, i + sampleBlockSize);
      const mp3buf = mp3encoder.encodeBuffer(chunk);
      if (mp3buf.length > 0) {
        mp3Buffers.push(Buffer.from(mp3buf));
      }
    }

    const endBuf = mp3encoder.flush();
    if (endBuf.length > 0) {
      mp3Buffers.push(Buffer.from(endBuf));
    }

    return Buffer.concat(mp3Buffers).toString('base64');
  } catch (encErr) {
    console.warn('[Serverless MP3 encoder error, returning WAV]:', encErr);
    return base64Wav;
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { text, voiceId, style } = req.body || {};
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Text is required for voice generation' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json({
        success: true,
        isAiGemini: false,
        note: 'no_api_key',
        voiceId: voiceId || 'hamza_news',
        message: 'No GEMINI_API_KEY configured on host; activating device speech engine.'
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const voiceMap: Record<string, { voiceName: 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr' | 'Aoede'; defaultStyle: string }> = {
      hamza_news: {
        voiceName: 'Fenrir',
        defaultStyle: 'Clear, authoritative Pakistani male TV news anchor. Standard national Pakistani Urdu accent, confident cadence.'
      },
      ayesha_story: {
        voiceName: 'Kore',
        defaultStyle: 'Warm, melodious Pakistani female narrator with clear Urdu diction, engaging cadence and natural vocal expressions.'
      },
      bilal_rj: {
        voiceName: 'Puck',
        defaultStyle: 'High-energy, charismatic Pakistani commercial voice. Radio RJ style, fast-paced, vibrant modern youth cadence.'
      },
      fatima_doc: {
        voiceName: 'Aoede',
        defaultStyle: 'Educated, articulate Pakistani female narrator. Calm, sophisticated, clear pacing for documentaries and e-learning.'
      },
      zain_vlog: {
        voiceName: 'Charon',
        defaultStyle: 'Casual, friendly everyday Pakistani young adult speaking natural Urdu or Roman Urdu. Relaxed and conversational.'
      },
      sobia_poetry: {
        voiceName: 'Kore',
        defaultStyle: 'Poetic, soulful Pakistani female orator. Deep emotional resonance, classical Urdu mushaira recitation style.'
      },
      chaudhry_elder: {
        voiceName: 'Fenrir',
        defaultStyle: 'Deep, rich baritone of a respected Pakistani elder. Authoritative, dignified, grandfatherly warmth with subtle Punjabi warmth.'
      },
      mariam_calm: {
        voiceName: 'Zephyr',
        defaultStyle: 'Ultra-gentle, soothing Pakistani female voice. Soft-spoken, relaxing cadence, calm and serene.'
      }
    };

    const selected = voiceMap[voiceId] || voiceMap.hamza_news;
    const finalStyle = style || selected.defaultStyle;

    let base64Wav = '';
    let isAiGemini = false;

    const candidateModels = ['gemini-3.8-flash-lite-tts', 'gemini-3.8-flash-tts'];
    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: text.trim(),
                  speechMetadata: {
                    style: finalStyle
                  }
                } as any
              ]
            } as any
          ],
          config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: selected.voiceName }
              }
            }
          }
        });

        const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (audioData && audioData.length > 500) {
          base64Wav = audioData;
          isAiGemini = true;
          break;
        }
      } catch (modelErr) {
        console.warn(`[Vercel Serverless TTS model ${modelName} error]:`, modelErr);
      }
    }

    if (!base64Wav || !isAiGemini) {
      return res.json({
        success: true,
        isAiGemini: false,
        note: 'quota_exceeded',
        voiceId: voiceId || 'hamza_news',
        message: 'API quota reached; activating device speech engine.'
      });
    }

    let base64Mp3 = '';
    try {
      base64Mp3 = convertWavBase64ToMp3Base64(base64Wav);
    } catch {
      base64Mp3 = base64Wav;
    }

    return res.json({
      success: true,
      audioBase64: base64Mp3,
      mimeType: 'audio/mp3',
      wavBase64: base64Wav,
      isAiGemini: true,
      voiceId: voiceId || 'hamza_news'
    });
  } catch (err: any) {
    return res.json({
      success: true,
      isAiGemini: false,
      voiceId: req.body?.voiceId || 'hamza_news',
      error: err.message
    });
  }
}
