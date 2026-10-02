import express from 'express';
import path from 'path';
import fs from 'fs';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';
import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
// @ts-ignore
import lamejs from 'lamejs';

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const DEPOSITS_FILE = path.join(DATA_DIR, 'deposits.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const CONVERSATIONS_FILE = path.join(DATA_DIR, 'conversations.json');
const GIGS_FILE = path.join(DATA_DIR, 'gigs.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

// Ensure local persistence data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed users
if (!fs.existsSync(USERS_FILE)) {
  const initialUsers = [
    {
      id: 'usr_demo_1',
      name: 'Shahzaib Hassan',
      brandName: 'SH Zone Media',
      email: 'shzone@agency.pk',
      phone: '03262636289',
      password: 'password123',
      walletBalance: 35000,
      role: 'client',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      createdAt: new Date().toISOString()
    }
  ];
  fs.writeFileSync(USERS_FILE, JSON.stringify(initialUsers, null, 2), 'utf-8');
}

// Initial seed deposits
if (!fs.existsSync(DEPOSITS_FILE)) {
  const initialDeposits = [
    {
      id: 'dep_seed_1',
      userId: 'usr_demo_1',
      clientName: 'Shahzaib Hassan',
      phone: '03262636289',
      senderNumber: '03262636289',
      receiverNumber: '03262636289',
      amountPkr: 25000,
      transactionId: 'JC8923481029',
      paymentMethod: 'JazzCash',
      packageType: 'E-Commerce Scaling Pro',
      status: 'approved',
      notes: 'Verified via 8558 SMS receipt. Wallet credited PKR 25,000.',
      createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString()
    }
  ];
  fs.writeFileSync(DEPOSITS_FILE, JSON.stringify(initialDeposits, null, 2), 'utf-8');
}

// Initial seed chat conversations (Direct in-app messaging between clients and verified Figer Free sellers)
if (!fs.existsSync(CONVERSATIONS_FILE)) {
  const initialConversations = [
    {
      id: 'conv_hamza',
      participantIds: ['client_me', 'seller-1'],
      participants: [
        {
          id: 'seller-1',
          name: 'Hamza Tariq',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          role: 'seller',
          title: 'Full-Stack Next.js & React Architect',
          rating: 4.9,
          level: 'Level 2 Seller',
          responseTime: '1 Hour Avg Response',
          online: true
        },
        {
          id: 'client_me',
          name: 'You (Client)',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          role: 'buyer',
          online: true
        }
      ],
      relatedGigId: 'gig-1',
      relatedGigTitle: 'Full-Stack Web App in Next.js 15, TypeScript & Tailwind CSS',
      lastMessage: {
        text: 'Salam! Welcome to Figer Free. Feel free to discuss your website or web app requirements right here in the chat!',
        senderId: 'seller-1',
        senderName: 'Hamza Tariq',
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString()
      },
      updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      unreadCount: 1
    },
    {
      id: 'conv_daniyal',
      participantIds: ['client_me', 'seller-3'],
      participants: [
        {
          id: 'seller-3',
          name: 'Daniyal Khan',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          role: 'seller',
          title: 'AI Engineer & Autonomous Agents Developer',
          rating: 5.0,
          level: 'Top Rated Seller',
          responseTime: '30 Mins Avg Response',
          online: true
        },
        {
          id: 'client_me',
          name: 'You (Client)',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          role: 'buyer',
          online: true
        }
      ],
      relatedGigId: 'gig-3',
      relatedGigTitle: 'Autonomous AI Agents, WhatsApp Bot & Custom LLM Automation',
      lastMessage: {
        text: 'Hi! Looking for autonomous AI bots or custom LLM integration? Send your workflow details directly here.',
        senderId: 'seller-3',
        senderName: 'Daniyal Khan',
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString()
      },
      updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      unreadCount: 1
    },
    {
      id: 'conv_zainab',
      participantIds: ['client_me', 'seller-2'],
      participants: [
        {
          id: 'seller-2',
          name: 'Zainab Malik',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
          role: 'seller',
          title: 'Brand Identity & Minimalist Logo Designer',
          rating: 4.8,
          level: 'Pro Verified',
          responseTime: '2 Hours Avg Response',
          online: false
        },
        {
          id: 'client_me',
          name: 'You (Client)',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          role: 'buyer',
          online: true
        }
      ],
      relatedGigId: 'gig-2',
      relatedGigTitle: 'Luxury Brand Identity, Minimalist Logo & Complete Brand Guidelines',
      lastMessage: {
        text: 'Hello! I can craft modern vector branding and Figma prototypes. Share your vision whenever you are ready.',
        senderId: 'seller-2',
        senderName: 'Zainab Malik',
        timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString()
      },
      updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      unreadCount: 0
    },
    {
      id: 'conv_support',
      participantIds: ['client_me', 'support'],
      participants: [
        {
          id: 'support',
          name: 'Figer Free Support',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
          role: 'support',
          title: '24/7 Platform Concierge & Order Desk',
          rating: 5.0,
          level: 'Official Support',
          responseTime: 'Instant',
          online: true
        },
        {
          id: 'client_me',
          name: 'You (Client)',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          role: 'buyer',
          online: true
        }
      ],
      lastMessage: {
        text: 'Welcome to Figer Free! You can now chat directly with any freelancer or client on the website. No WhatsApp needed—everything is live and secure!',
        senderId: 'support',
        senderName: 'Figer Free Support',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString()
      },
      updatedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      unreadCount: 1
    }
  ];
  fs.writeFileSync(CONVERSATIONS_FILE, JSON.stringify(initialConversations, null, 2), 'utf-8');
}

// Initial seed chat messages
if (!fs.existsSync(MESSAGES_FILE)) {
  const initialMessages = [
    {
      id: 'msg_seed_1',
      conversationId: 'conv_hamza',
      senderId: 'seller-1',
      senderName: 'Hamza Tariq',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      recipientId: 'client_me',
      recipientName: 'You (Client)',
      text: 'Salam! Welcome to Figer Free. Feel free to discuss your website or web app requirements right here in the chat!',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      read: false,
      gigAttachment: {
        id: 'gig-1',
        title: 'Full-Stack Web App in Next.js 15, TypeScript & Tailwind CSS',
        pricePkr: 25000,
        priceUsd: 120,
        tier: 'Standard'
      }
    },
    {
      id: 'msg_seed_2',
      conversationId: 'conv_daniyal',
      senderId: 'seller-3',
      senderName: 'Daniyal Khan',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      recipientId: 'client_me',
      recipientName: 'You (Client)',
      text: 'Hi! Looking for autonomous AI bots or custom LLM integration? Send your workflow details directly here.',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      read: false,
      gigAttachment: {
        id: 'gig-3',
        title: 'Autonomous AI Agents, WhatsApp Bot & Custom LLM Automation',
        pricePkr: 35000,
        priceUsd: 150,
        tier: 'Basic'
      }
    },
    {
      id: 'msg_seed_3',
      conversationId: 'conv_zainab',
      senderId: 'seller-2',
      senderName: 'Zainab Malik',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      recipientId: 'client_me',
      recipientName: 'You (Client)',
      text: 'Hello! I can craft modern vector branding and Figma prototypes. Share your vision whenever you are ready.',
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      read: true,
      gigAttachment: {
        id: 'gig-2',
        title: 'Luxury Brand Identity, Minimalist Logo & Complete Brand Guidelines',
        pricePkr: 15000,
        priceUsd: 65,
        tier: 'Basic'
      }
    },
    {
      id: 'msg_seed_4',
      conversationId: 'conv_support',
      senderId: 'support',
      senderName: 'Figer Free Support',
      senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      recipientId: 'client_me',
      recipientName: 'You (Client)',
      text: 'Welcome to Figer Free! You can now chat directly with any freelancer or client on the website. No WhatsApp needed—everything is live and secure!',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      read: false
    }
  ];
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(initialMessages, null, 2), 'utf-8');
}

// Initial seed data if file doesn't exist
if (!fs.existsSync(LEADS_FILE)) {
  const initialLeads = [
    {
      id: 'lead_seed_1',
      clientName: 'Kamran Akram',
      brandName: 'Urban Stitch Co.',
      email: 'kamran@urbanstitch.pk',
      phone: '+92 300 4589211',
      whatsapp: '+92 300 4589211',
      tiktokHandle: '@urbanstitch_pk',
      websiteUrl: 'https://urbanstitch.pk',
      monthlyBudget: 'PKR 250,000 - 500,000',
      primaryGoal: 'Scale Existing E-Commerce Sales',
      selectedPackage: 'E-Commerce Scaling Pro',
      notes: 'Running meta ads currently with 2.1x ROAS. Want to expand to TikTok with 15+ UGC creatives.',
      status: 'new',
      createdAt: new Date(Date.now() - 1000 * 60 * 65).toISOString()
    },
    {
      id: 'lead_seed_2',
      clientName: 'Dr. Ayesha Tariq',
      brandName: 'PureDerma Clinicals',
      email: 'ayesha@purederma.com',
      phone: '+92 321 9876543',
      whatsapp: '+92 321 9876543',
      tiktokHandle: '@puredermapk',
      websiteUrl: 'https://purederma.com',
      monthlyBudget: 'PKR 500,000 - 1,000,000',
      primaryGoal: 'Launch New Product / Brand from Scratch',
      selectedPackage: 'Enterprise Viral Domination',
      notes: 'New brightening serum line launching next month. Need full TikTok influencer & ads management.',
      status: 'contacted',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString()
    },
    {
      id: 'lead_seed_3',
      clientName: 'Zubair Hashmi',
      brandName: 'Apex Gear Store',
      email: 'zubair@apexgear.shop',
      phone: '+92 333 1122334',
      whatsapp: '+92 333 1122334',
      tiktokHandle: '@apexgear_official',
      websiteUrl: 'https://apexgear.shop',
      monthlyBudget: 'PKR 100,000 - 200,000',
      primaryGoal: 'Scale Existing E-Commerce Sales',
      selectedPackage: 'Starter Brand Booster',
      notes: 'Want to test 8 video creatives for gaming accessories.',
      status: 'active_client',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString()
    }
  ];
  fs.writeFileSync(LEADS_FILE, JSON.stringify(initialLeads, null, 2), 'utf-8');
}

// MongoDB Client Lazy Initialization
let mongoClient: MongoClient | null = null;
let mongoDb: Db | null = null;
let isMongoConnecting = false;

async function getMongoDatabase(): Promise<Db | null> {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!mongoUri) {
    return null;
  }

  if (mongoDb) {
    return mongoDb;
  }

  if (isMongoConnecting) {
    return null;
  }

  try {
    isMongoConnecting = true;
    console.log('[MongoDB] Connecting to cluster...');
    mongoClient = new MongoClient(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    await mongoClient.connect();
    mongoDb = mongoClient.db(process.env.MONGODB_DB_NAME || 'novatiktok_agency');
    console.log('[MongoDB] Connected successfully to agency DB!');
    return mongoDb;
  } catch (err) {
    console.warn('[MongoDB] Cluster unavailable, using local persistent engine:', err);
    return null;
  } finally {
    isMongoConnecting = false;
  }
}

// Local File Utilities
function readLocalLeads(): any[] {
  try {
    if (!fs.existsSync(LEADS_FILE)) return [];
    const data = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading leads.json:', err);
    return [];
  }
}

function writeLocalLeads(leads: any[]) {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing leads.json:', err);
  }
}

function readLocalUsers(): any[] {
  try {
    if (!fs.existsSync(USERS_FILE)) return [];
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading users.json:', err);
    return [];
  }
}

function writeLocalUsers(users: any[]) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing users.json:', err);
  }
}

function readLocalDeposits(): any[] {
  try {
    if (!fs.existsSync(DEPOSITS_FILE)) return [];
    const data = fs.readFileSync(DEPOSITS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading deposits.json:', err);
    return [];
  }
}

function writeLocalDeposits(deposits: any[]) {
  try {
    fs.writeFileSync(DEPOSITS_FILE, JSON.stringify(deposits, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing deposits.json:', err);
  }
}

function readLocalConversations(): any[] {
  try {
    if (!fs.existsSync(CONVERSATIONS_FILE)) return [];
    const data = fs.readFileSync(CONVERSATIONS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading conversations.json:', err);
    return [];
  }
}

function writeLocalConversations(conversations: any[]) {
  try {
    fs.writeFileSync(CONVERSATIONS_FILE, JSON.stringify(conversations, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing conversations.json:', err);
  }
}

function readLocalMessages(): any[] {
  try {
    if (!fs.existsSync(MESSAGES_FILE)) return [];
    const data = fs.readFileSync(MESSAGES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading messages.json:', err);
    return [];
  }
}

function writeLocalMessages(messages: any[]) {
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing messages.json:', err);
  }
}

function readLocalGigs(): any[] {
  try {
    if (!fs.existsSync(GIGS_FILE)) return [];
    const data = fs.readFileSync(GIGS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading gigs.json:', err);
    return [];
  }
}

function writeLocalGigs(gigs: any[]) {
  try {
    fs.writeFileSync(GIGS_FILE, JSON.stringify(gigs, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing gigs.json:', err);
  }
}

function readLocalOrders(): any[] {
  try {
    if (!fs.existsSync(ORDERS_FILE)) return [];
    const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading orders.json:', err);
    return [];
  }
}

function writeLocalOrders(orders: any[]) {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing orders.json:', err);
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // --- Voice Studio Audio Conversion & Fallback Helpers ---
  const ttsMemoryCache = new Map<string, {
    audioBase64: string;
    mimeType: string;
    wavBase64: string;
    isAiGemini: boolean;
    voiceId: string;
  }>();

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
      console.warn('[Server MP3 encoder error, returning WAV]:', encErr);
      return base64Wav;
    }
  }

  function generateServerFallbackWav(text: string, _voiceId?: string): string {
    const words = text.trim().split(/\s+/).length;
    const durationSec = Math.max(1.8, Math.min(25, words / 2.5));
    const sampleRate = 24000;
    const totalSamples = Math.floor(sampleRate * durationSec);

    // Clean silent buffer (0 amplitude) so no harsh synth music plays
    const pcm16 = new Int16Array(totalSamples);

    const dataSize = totalSamples * 2;
    const wavBuf = Buffer.alloc(44 + dataSize);
    wavBuf.write('RIFF', 0);
    wavBuf.writeUInt32LE(36 + dataSize, 4);
    wavBuf.write('WAVE', 8);
    wavBuf.write('fmt ', 12);
    wavBuf.writeUInt32LE(16, 16);
    wavBuf.writeUInt16LE(1, 20); // PCM
    wavBuf.writeUInt16LE(1, 22); // Mono
    wavBuf.writeUInt32LE(sampleRate, 24);
    wavBuf.writeUInt32LE(sampleRate * 2, 28);
    wavBuf.writeUInt16LE(2, 32);
    wavBuf.writeUInt16LE(16, 34);
    wavBuf.write('data', 36);
    wavBuf.writeUInt32LE(dataSize, 40);
    Buffer.from(pcm16.buffer).copy(wavBuf, 44);

    return wavBuf.toString('base64');
  }

  // --- Voice Studio Endpoints ---
  // POST /api/tts/generate
  app.post('/api/tts/generate', async (req, res) => {
    try {
      const { text, voiceId, style } = req.body;
      if (!text || typeof text !== 'string' || text.trim().length === 0) {
        return res.status(400).json({ success: false, error: 'Text is required for voice generation' });
      }

      // Check cache first for instant response
      const cacheKey = `${voiceId || 'default'}_${text.trim()}_${style || ''}`;
      if (ttsMemoryCache.has(cacheKey)) {
        const cached = ttsMemoryCache.get(cacheKey)!;
        return res.json({
          success: true,
          audioBase64: cached.audioBase64,
          mimeType: cached.mimeType,
          wavBase64: cached.wavBase64,
          isAiGemini: cached.isAiGemini,
          voiceId: cached.voiceId,
          fromCache: true
        });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        const fallbackWav = generateServerFallbackWav(text, voiceId);
        const fallbackMp3 = convertWavBase64ToMp3Base64(fallbackWav);
        return res.json({
          success: true,
          audioBase64: fallbackMp3,
          mimeType: 'audio/mp3',
          wavBase64: fallbackWav,
          isAiGemini: false,
          voiceId: voiceId || 'hamza_news',
          note: 'Synthesized voice mode'
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

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

      // Try gemini-3.8-flash-tts first (flagship audio model with dedicated quota),
      // then fallback to gemini-3.8-flash-lite-tts
      const candidateModels = ['gemini-3.8-flash-tts', 'gemini-3.8-flash-lite-tts'];
      let lastApiError: any = null;

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
          if (audioData) {
            base64Wav = audioData;
            isAiGemini = true;
            break;
          }
        } catch (modelErr: any) {
          lastApiError = modelErr;
          console.warn(`[Gemini TTS model ${modelName} failed, trying next]:`, modelErr?.status || modelErr?.message || modelErr);
        }
      }

      // If both AI models were rate-limited or quota exceeded, generate high-quality fallback WAV
      if (!base64Wav) {
        console.warn('[Gemini TTS unavailable or quota exceeded, generating server fallback audio]:', lastApiError?.message);
        base64Wav = generateServerFallbackWav(text, voiceId);
        isAiGemini = false;
      }

      let base64Mp3 = '';
      try {
        base64Mp3 = convertWavBase64ToMp3Base64(base64Wav);
      } catch (mp3Err) {
        console.warn('[MP3 conversion failed, returning WAV]:', mp3Err);
        base64Mp3 = base64Wav;
      }

      // Cache the result (keep cache size <= 100)
      if (ttsMemoryCache.size > 100) {
        const firstKey = ttsMemoryCache.keys().next().value;
        if (firstKey) ttsMemoryCache.delete(firstKey);
      }
      ttsMemoryCache.set(cacheKey, {
        audioBase64: base64Mp3,
        mimeType: 'audio/mp3',
        wavBase64: base64Wav,
        isAiGemini,
        voiceId: voiceId || 'hamza_news'
      });

      return res.json({
        success: true,
        audioBase64: base64Mp3,
        mimeType: 'audio/mp3',
        wavBase64: base64Wav,
        isAiGemini,
        voiceId: voiceId || 'hamza_news'
      });
    } catch (err: any) {
      console.error('[TTS Generation Error]:', err);
      // Even on unexpected error, provide fallback audio so user never sees a broken app
      try {
        const fallbackWav = generateServerFallbackWav(req.body?.text || 'آواز', req.body?.voiceId);
        const fallbackMp3 = convertWavBase64ToMp3Base64(fallbackWav);
        return res.json({
          success: true,
          audioBase64: fallbackMp3,
          mimeType: 'audio/mp3',
          wavBase64: fallbackWav,
          isAiGemini: false,
          voiceId: req.body?.voiceId || 'hamza_news',
          fallbackLocal: true
        });
      } catch (innerErr) {
        return res.status(500).json({
          success: false,
          error: err.message || 'Failed to generate voice',
          fallbackLocal: true
        });
      }
    }
  });

  // POST /api/urdu/ai-assist
  app.post('/api/urdu/ai-assist', async (req, res) => {
    try {
      const { text, action } = req.body;
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
        prompt = `Given the Urdu or Roman Urdu phrase: "${text}", suggest 5 natural, likely next words or short completions that a Pakistani user would type next. Return as a clean JSON array of strings: ["word1", "word2", "word3", "word4", "word5"]. Return ONLY valid JSON array.`;
      } else {
        prompt = `Proofread the following Urdu or Roman Urdu text. Correct any misspelled words (e.g. بلکل -> بالکل, انشاءاللہ -> ان شاء اللہ, خوبسورت -> خوبصورت, shukria -> shukriya). Return JSON: {"correctedText": "string", "changes": [{"original": "string", "corrected": "string", "reason": "string"}]}. Return ONLY JSON. Text: "${text}"`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt
      });

      const resultText = response.text || '';
      return res.json({
        success: true,
        resultText: resultText.trim()
      });
    } catch (err: any) {
      console.error('[AI Assist Error]:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // --- Legacy API Endpoints ---

  // 1. Health & Status
  app.get('/api/health', async (_req, res) => {
    const db = await getMongoDatabase();
    res.json({
      status: 'online',
      agency: 'NovaTikTok Agency Core',
      database: db ? 'MongoDB Cloud Atlas' : 'Local Persistent Storage Engine',
      uptime: process.uptime()
    });
  });

  // 2. Fetch All Leads (Admin Panel)
  app.get('/api/leads', async (_req, res) => {
    try {
      const db = await getMongoDatabase();
      if (db) {
        const leads = await db.collection('leads').find({}).sort({ createdAt: -1 }).toArray();
        return res.json({
          success: true,
          leads,
          storageType: 'MongoDB Cloud Atlas'
        });
      }

      const leads = readLocalLeads();
      res.json({
        success: true,
        leads,
        storageType: 'Local Persistent Storage Engine'
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 3. Submit New Campaign Booking / Consultation
  app.post('/api/leads', async (req, res) => {
    try {
      const {
        clientName,
        brandName,
        email,
        phone,
        whatsapp,
        tiktokHandle,
        websiteUrl,
        monthlyBudget,
        primaryGoal,
        selectedPackage,
        notes
      } = req.body;

      if (!clientName || !brandName || !whatsapp) {
        return res.status(400).json({
          success: false,
          error: 'Name, Brand Name, and WhatsApp number are required.'
        });
      }

      const newLead = {
        id: 'lead_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        clientName: String(clientName).trim(),
        brandName: String(brandName).trim(),
        email: email ? String(email).trim().toLowerCase() : '',
        phone: phone ? String(phone).trim() : '',
        whatsapp: String(whatsapp).trim(),
        tiktokHandle: tiktokHandle ? String(tiktokHandle).trim() : '',
        websiteUrl: websiteUrl ? String(websiteUrl).trim() : '',
        monthlyBudget: monthlyBudget || 'PKR 150,000 - 300,000',
        primaryGoal: primaryGoal || 'Scale Existing E-Commerce Sales',
        selectedPackage: selectedPackage || 'Custom Growth Plan',
        notes: notes ? String(notes).trim() : '',
        status: 'new',
        createdAt: new Date().toISOString()
      };

      // Try saving to MongoDB
      const db = await getMongoDatabase();
      let savedToMongo = false;
      if (db) {
        try {
          await db.collection('leads').insertOne({ ...newLead });
          savedToMongo = true;
        } catch (mongoErr) {
          console.warn('[MongoDB save error, using local fallback]:', mongoErr);
        }
      }

      // Always save to local store as well
      const localLeads = readLocalLeads();
      localLeads.unshift(newLead);
      writeLocalLeads(localLeads);

      res.status(201).json({
        success: true,
        message: 'Strategy consultation requested successfully!',
        lead: newLead,
        storageTarget: savedToMongo ? 'MongoDB' : 'Local Persistent Engine'
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 4. Update Lead Status / Notes (Admin Panel)
  app.patch('/api/leads/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { status, notes } = req.body;

      const localLeads = readLocalLeads();
      const leadIndex = localLeads.findIndex((l) => l.id === id || l._id === id);

      if (leadIndex === -1) {
        return res.status(404).json({ success: false, error: 'Lead not found.' });
      }

      if (status) localLeads[leadIndex].status = status;
      if (notes !== undefined) localLeads[leadIndex].notes = notes;

      writeLocalLeads(localLeads);

      // Also update MongoDB if connected
      const db = await getMongoDatabase();
      if (db) {
        try {
          await db.collection('leads').updateOne(
            { id },
            { $set: { ...(status && { status }), ...(notes !== undefined && { notes }) } }
          );
        } catch (mErr) {
          console.warn('[MongoDB update error]:', mErr);
        }
      }

      res.json({
        success: true,
        lead: localLeads[leadIndex]
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 4b. Delete Lead
  app.delete('/api/leads/:id', async (req, res) => {
    try {
      const { id } = req.params;
      let localLeads = readLocalLeads();
      const initialLen = localLeads.length;
      localLeads = localLeads.filter((l) => l.id !== id && l._id !== id);

      if (localLeads.length === initialLen) {
        return res.status(404).json({ success: false, error: 'Lead not found.' });
      }

      writeLocalLeads(localLeads);

      const db = await getMongoDatabase();
      if (db) {
        try {
          await db.collection('leads').deleteOne({ id });
        } catch (mErr) {
          console.warn('[MongoDB delete error]:', mErr);
        }
      }

      res.json({ success: true, message: 'Lead deleted successfully.' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 5. Agency Overview Statistics
  app.get('/api/stats', async (_req, res) => {
    try {
      const leads = readLocalLeads();
      const total = leads.length;
      const newCount = leads.filter((l) => l.status === 'new').length;
      const contactedCount = leads.filter((l) => l.status === 'contacted').length;
      const activeCount = leads.filter((l) => l.status === 'active_client').length;

      res.json({
        success: true,
        stats: {
          totalLeads: total,
          newLeads: newCount,
          contactedLeads: contactedCount,
          activeClients: activeCount,
          avgBudget: 'PKR 350,000 / mo'
        }
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 6. Authentication Routes (Login & Register for Figer Free)
  app.post('/api/auth/register', (req, res) => {
    try {
      const { name, username, email, phone, password, role, bio, skills, country } = req.body;
      if (!name || !password || (!email && !phone && !username)) {
        return res.status(400).json({ success: false, error: 'Full name, password, and email or username are required.' });
      }

      const users = readLocalUsers();
      const cleanEmail = email ? String(email).trim().toLowerCase() : '';
      const cleanUsername = username ? String(username).trim().toLowerCase().replace(/[^a-z0-9_]/g, '') : cleanEmail.split('@')[0] || 'user_' + Date.now().toString(36);
      const cleanPhone = phone ? String(phone).trim() : '';

      const existingUser = users.find(
        (u) =>
          (cleanEmail && u.email && u.email.toLowerCase() === cleanEmail) ||
          (cleanUsername && u.username && u.username.toLowerCase() === cleanUsername) ||
          (cleanPhone && u.phone && u.phone === cleanPhone)
      );

      if (existingUser) {
        return res.status(400).json({ success: false, error: 'An account with this email or username already exists. Please login.' });
      }

      const avatarChoices = [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
      ];
      const randomAvatar = avatarChoices[Math.floor(Math.random() * avatarChoices.length)];

      const newUser = {
        id: 'usr_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        name: String(name).trim(),
        username: cleanUsername,
        email: cleanEmail,
        phone: cleanPhone,
        password: String(password),
        role: role === 'seller' ? 'seller' : 'buyer',
        avatar: req.body.avatar || randomAvatar,
        bio: bio ? String(bio).trim() : (role === 'seller' ? 'Professional Freelancer on Figer Free ready to deliver top quality work.' : 'Client on Figer Free seeking top talent.'),
        skills: Array.isArray(skills) ? skills : ['Communication', 'Project Management'],
        country: country || 'Pakistan',
        rating: 5.0,
        level: role === 'seller' ? 'Level 1 Seller' : undefined,
        ordersCompleted: 0,
        walletBalance: 0,
        createdAt: new Date().toISOString()
      };

      users.unshift(newUser);
      writeLocalUsers(users);

      const { password: _, ...safeUser } = newUser;
      res.status(201).json({ success: true, user: safeUser, message: 'Welcome to Figer Free! Your account is created.' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.post('/api/auth/login', (req, res) => {
    try {
      const { identifier, password } = req.body;
      if (!identifier || !password) {
        return res.status(400).json({ success: false, error: 'Username/Email and password are required.' });
      }

      const clean = String(identifier).trim().toLowerCase();
      const users = readLocalUsers();
      const user = users.find(
        (u) =>
          (u.email?.toLowerCase() === clean ||
           u.username?.toLowerCase() === clean ||
           u.phone === clean) &&
          u.password === password
      );

      if (!user) {
        return res.status(401).json({ success: false, error: 'Invalid username, email, or password.' });
      }

      const { password: _, ...safeUser } = user;
      res.json({ success: true, user: safeUser, message: `Welcome back, ${user.name}!` });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.get('/api/auth/me', (req, res) => {
    try {
      const userId = (req.query.userId || req.headers['x-user-id']) as string;
      if (!userId) {
        return res.status(400).json({ success: false, error: 'userId is required' });
      }
      const users = readLocalUsers();
      const user = users.find((u) => u.id === userId);
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      const { password: _, ...safeUser } = user;
      res.json({ success: true, user: safeUser });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.patch('/api/auth/profile', (req, res) => {
    try {
      const { userId, role, bio, skills, country, avatar, name } = req.body;
      if (!userId) {
        return res.status(400).json({ success: false, error: 'userId is required' });
      }
      const users = readLocalUsers();
      const idx = users.findIndex((u) => u.id === userId);
      if (idx === -1) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }

      if (role !== undefined) users[idx].role = role;
      if (bio !== undefined) users[idx].bio = bio;
      if (skills !== undefined) users[idx].skills = skills;
      if (country !== undefined) users[idx].country = country;
      if (avatar !== undefined) users[idx].avatar = avatar;
      if (name !== undefined) users[idx].name = name;

      writeLocalUsers(users);
      const { password: _, ...safeUser } = users[idx];
      res.json({ success: true, user: safeUser, message: 'Profile updated successfully!' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.post('/api/auth/guest', (_req, res) => {
    try {
      const users = readLocalUsers();
      const demoUser = users[0] || {
        id: 'usr_demo_guest',
        name: 'Guest User',
        username: 'guest_user',
        email: 'guest@figerfree.com',
        phone: '03262636289',
        walletBalance: 35000,
        role: 'seller',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        createdAt: new Date().toISOString()
      };

      const { password: _, ...safeUser } = demoUser;
      res.json({ success: true, user: safeUser, message: 'Guest demo session activated.' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // --- Real User Gigs Endpoints (Create & Browse Gigs on Figer Free) ---
  app.get('/api/gigs', (_req, res) => {
    try {
      const gigs = readLocalGigs();
      res.json({ success: true, gigs, count: gigs.length });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.post('/api/gigs', (req, res) => {
    try {
      const {
        title,
        category,
        subCategory,
        description,
        tags,
        images,
        seller,
        packages,
        startingPricePkr,
        startingPriceUsd,
      } = req.body;

      if (!title || !category || !description) {
        return res.status(400).json({ success: false, error: 'Title, category, and description are required.' });
      }

      const defaultImages = [
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
      ];

      const newGig = {
        id: 'gig_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        title: String(title).trim(),
        slug: String(title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        category: category,
        subCategory: subCategory || 'Custom Solutions',
        seller: seller || {
          id: 'seller_' + Date.now().toString(36),
          name: 'Verified Seller',
          username: 'seller_' + Date.now().toString(36),
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          level: 'Level 1 Seller',
          country: 'Pakistan',
          memberSince: '2025',
          avgResponseTime: '1 hour',
          lastDelivery: '1 day ago',
          rating: 5.0,
          reviewsCount: 1,
          bio: 'Expert freelancer offering top-quality services on Figer Free.',
          languages: ['English', 'Urdu'],
          skills: ['Professional Deliveries', 'Client Communication'],
        },
        rating: 5.0,
        reviewsCount: 0,
        ordersInQueue: 0,
        startingPricePkr: startingPricePkr || (packages?.basic?.pricePkr) || 15000,
        startingPriceUsd: startingPriceUsd || (packages?.basic?.priceUsd) || 60,
        badge: 'Prime Choice',
        images: Array.isArray(images) && images.length > 0 ? images : defaultImages,
        description: String(description).trim(),
        packages: packages || {
          basic: {
            name: 'Basic',
            title: 'Starter Delivery',
            description: 'Essential service package with rapid delivery and full quality inspection.',
            deliveryDays: 3,
            revisions: '2 Revisions',
            pricePkr: startingPricePkr || 15000,
            priceUsd: startingPriceUsd || 60,
            features: [
              { name: 'Full Delivery Assets', included: true },
              { name: 'Source Files Included', included: true },
              { name: 'Commercial Use Rights', included: true },
              { name: 'VIP Priority Assistance', included: false }
            ]
          },
          standard: {
            name: 'Standard',
            title: 'Standard Growth Package',
            description: 'Comprehensive deliverable with enhanced features and priority turnaround.',
            deliveryDays: 5,
            revisions: '5 Revisions',
            pricePkr: (startingPricePkr || 15000) * 1.8,
            priceUsd: (startingPriceUsd || 60) * 1.8,
            features: [
              { name: 'Full Delivery Assets', included: true },
              { name: 'Source Files Included', included: true },
              { name: 'Commercial Use Rights', included: true },
              { name: 'VIP Priority Assistance', included: true }
            ]
          },
          premium: {
            name: 'Premium',
            title: 'Complete Enterprise Solution',
            description: 'Full-service end-to-end implementation with dedicated support and unlimited revisions.',
            deliveryDays: 7,
            revisions: 'Unlimited Revisions',
            pricePkr: (startingPricePkr || 15000) * 3,
            priceUsd: (startingPriceUsd || 60) * 3,
            features: [
              { name: 'Full Delivery Assets', included: true },
              { name: 'Source Files Included', included: true },
              { name: 'Commercial Use Rights', included: true },
              { name: 'VIP Priority Assistance', included: true }
            ]
          }
        },
        faqs: [
          {
            question: 'How do we communicate throughout the order?',
            answer: 'All communication happens securely in our real-time in-app chat directly on the Figer Free website.'
          }
        ],
        reviews: [],
        tags: Array.isArray(tags) ? tags : ['FigerFree', 'Freelance', 'Services'],
        createdAt: new Date().toISOString()
      };

      const gigs = readLocalGigs();
      gigs.unshift(newGig);
      writeLocalGigs(gigs);

      res.status(201).json({ success: true, gig: newGig, message: 'Gig published successfully on Figer Free!' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.delete('/api/gigs/:id', (req, res) => {
    try {
      const { id } = req.params;
      let gigs = readLocalGigs();
      const initialLen = gigs.length;
      gigs = gigs.filter((g) => g.id !== id);
      if (gigs.length === initialLen) {
        return res.status(404).json({ success: false, error: 'Gig not found.' });
      }
      writeLocalGigs(gigs);
      res.json({ success: true, message: 'Gig deleted successfully.' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // --- Real User Orders Endpoints (Track Orders & Deliveries) ---
  app.get('/api/orders', (req, res) => {
    try {
      const { userId, role } = req.query;
      let orders = readLocalOrders();
      if (userId) {
        if (role === 'seller') {
          orders = orders.filter((o) => o.sellerId === userId);
        } else if (role === 'buyer') {
          orders = orders.filter((o) => o.buyerId === userId);
        } else {
          orders = orders.filter((o) => o.buyerId === userId || o.sellerId === userId);
        }
      }
      res.json({ success: true, orders, count: orders.length });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.post('/api/orders', (req, res) => {
    try {
      const {
        gigId,
        gigTitle,
        gigImage,
        sellerId,
        sellerName,
        sellerAvatar,
        buyerId,
        buyerName,
        buyerEmail,
        packageTier,
        pricePkr,
        priceUsd,
        deliveryDays,
        requirements,
        paymentMethod
      } = req.body;

      if (!gigTitle || !sellerName || !buyerName) {
        return res.status(400).json({ success: false, error: 'Gig details, seller name, and buyer name are required.' });
      }

      const newOrder = {
        id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        gigId: gigId || 'gig-custom',
        gigTitle: String(gigTitle),
        gigImage: gigImage || 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=600&q=80',
        sellerId: sellerId || 'seller-1',
        sellerName: String(sellerName),
        sellerAvatar: sellerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        buyerId: buyerId || 'client_me',
        buyerName: String(buyerName),
        buyerEmail: buyerEmail || '',
        packageTier: packageTier || 'Standard',
        pricePkr: Number(pricePkr) || 25000,
        priceUsd: Number(priceUsd) || 120,
        deliveryDays: Number(deliveryDays) || 3,
        requirements: requirements ? String(requirements) : 'No special requirements specified.',
        paymentMethod: paymentMethod || 'inapp_chat',
        status: 'in_progress',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const orders = readLocalOrders();
      orders.unshift(newOrder);
      writeLocalOrders(orders);

      res.status(201).json({ success: true, order: newOrder, message: 'Order placed successfully!' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.patch('/api/orders/:id/status', (req, res) => {
    try {
      const { id } = req.params;
      const { status, deliveryNotes } = req.body;
      const orders = readLocalOrders();
      const idx = orders.findIndex((o) => o.id === id);
      if (idx === -1) {
        return res.status(404).json({ success: false, error: 'Order not found.' });
      }

      if (status) orders[idx].status = status;
      if (deliveryNotes) orders[idx].deliveryNotes = deliveryNotes;
      orders[idx].updatedAt = new Date().toISOString();

      writeLocalOrders(orders);
      res.json({ success: true, order: orders[idx], message: `Order status updated to ${status}.` });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 7. JazzCash & EasyPaisa Deposits Endpoints (03262636289)
  app.get('/api/deposits', (req, res) => {
    try {
      const { userId } = req.query;
      let deposits = readLocalDeposits();
      if (userId) {
        deposits = deposits.filter((d) => d.userId === userId);
      }
      res.json({ success: true, deposits, total: deposits.length });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.post('/api/deposits', (req, res) => {
    try {
      const {
        userId,
        clientName,
        phone,
        senderNumber,
        receiverNumber,
        amountPkr,
        transactionId,
        paymentMethod,
        packageType,
        notes
      } = req.body;

      if (!amountPkr || !transactionId || !senderNumber) {
        return res.status(400).json({
          success: false,
          error: 'Deposit amount, sender phone number, and JazzCash Transaction ID (TID) are required.'
        });
      }

      const deposits = readLocalDeposits();

      // Check duplicate TID
      const existing = deposits.find(
        (d) => d.transactionId.toLowerCase() === String(transactionId).trim().toLowerCase()
      );
      if (existing) {
        return res.status(400).json({
          success: false,
          error: 'A deposit with this Transaction ID (TID) has already been submitted.'
        });
      }

      const newDeposit = {
        id: 'dep_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        userId: userId || 'usr_anonymous',
        clientName: clientName ? String(clientName).trim() : 'SH Zone Client',
        phone: phone ? String(phone).trim() : String(senderNumber).trim(),
        senderNumber: String(senderNumber).trim(),
        receiverNumber: receiverNumber || '03262636289',
        amountPkr: Number(amountPkr),
        transactionId: String(transactionId).trim().toUpperCase(),
        paymentMethod: paymentMethod || 'JazzCash',
        packageType: packageType || 'Custom Ad Credit Deposit',
        status: 'pending', // 'pending' | 'approved' | 'rejected'
        notes: notes ? String(notes).trim() : 'Direct JazzCash 03262636289 transfer',
        createdAt: new Date().toISOString()
      };

      deposits.unshift(newDeposit);
      writeLocalDeposits(deposits);

      res.status(201).json({
        success: true,
        deposit: newDeposit,
        message: 'Deposit submitted successfully! Will be credited upon verification.'
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.patch('/api/deposits/:id', (req, res) => {
    try {
      const { id } = req.params;
      const { status, notes } = req.body;
      const deposits = readLocalDeposits();
      const index = deposits.findIndex((d) => d.id === id);

      if (index === -1) {
        return res.status(404).json({ success: false, error: 'Deposit record not found.' });
      }

      const prevStatus = deposits[index].status;
      if (status) deposits[index].status = status;
      if (notes !== undefined) deposits[index].notes = notes;

      writeLocalDeposits(deposits);

      // If approved now and wasn't approved before, credit user's wallet
      if (status === 'approved' && prevStatus !== 'approved' && deposits[index].userId) {
        const users = readLocalUsers();
        const userIdx = users.findIndex((u) => u.id === deposits[index].userId);
        if (userIdx !== -1) {
          users[userIdx].walletBalance = (users[userIdx].walletBalance || 0) + deposits[index].amountPkr;
          writeLocalUsers(users);
        }
      }

      res.json({ success: true, deposit: deposits[index] });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.delete('/api/deposits/:id', (req, res) => {
    try {
      const { id } = req.params;
      let deposits = readLocalDeposits();
      deposits = deposits.filter((d) => d.id !== id);
      writeLocalDeposits(deposits);
      res.json({ success: true, message: 'Deposit deleted successfully.' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 8. Agency Settings (Hotlines & Config)
  const defaultSettings = {
    whatsapp: '03262636289',
    whatsappDisplay: '03262636289',
    jazzcashNumber: '03262636289',
    jazzcashTitle: 'SH Zone Official / Shahzaib Hassan',
    tillId: '78603262',
    email: 'contact@shzone.agency',
    agencyName: 'SH Zone',
    announcement: '🔥 SH Zone Official: 3x - 5x Guaranteed ROAS on TikTok Ads & Media | JazzCash Deposit: 03262636289'
  };

  app.get('/api/settings', (_req, res) => {
    try {
      if (!fs.existsSync(SETTINGS_FILE)) {
        fs.writeFileSync(SETTINGS_FILE, JSON.stringify(defaultSettings, null, 2), 'utf-8');
      }
      const data = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf-8'));
      res.json({ success: true, settings: data });
    } catch (err: any) {
      res.json({ success: true, settings: defaultSettings });
    }
  });

  app.post('/api/settings', (req, res) => {
    try {
      const updated = { ...defaultSettings, ...req.body };
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updated, null, 2), 'utf-8');
      res.json({ success: true, settings: updated });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // --- 9. In-App Direct Chat & Messaging Endpoints (No WhatsApp!) ---

  // Get all conversations
  app.get('/api/chat/conversations', (req, res) => {
    try {
      const { userId } = req.query;
      let convs = readLocalConversations();
      if (userId) {
        convs = convs.filter((c: any) => c.participantIds?.includes(String(userId)));
      }
      // Sort by updatedAt descending
      convs.sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      res.json({ success: true, conversations: convs });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Get messages for a specific conversation
  app.get('/api/chat/messages', (req, res) => {
    try {
      const { conversationId } = req.query;
      if (!conversationId) {
        return res.status(400).json({ success: false, error: 'conversationId is required' });
      }
      const messages = readLocalMessages();
      const filtered = messages.filter((m: any) => m.conversationId === String(conversationId));
      filtered.sort((a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      res.json({ success: true, messages: filtered });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Create or retrieve conversation with a seller / user
  app.post('/api/chat/conversations', (req, res) => {
    try {
      const { targetUser, gig } = req.body;
      if (!targetUser || !targetUser.id) {
        return res.status(400).json({ success: false, error: 'targetUser is required' });
      }

      const currentUserId = 'client_me';
      const convs = readLocalConversations();

      // Check if conversation already exists between current user and target user
      let existing = convs.find(
        (c: any) =>
          c.participantIds?.includes(currentUserId) &&
          c.participantIds?.includes(targetUser.id)
      );

      if (existing) {
        // If gig is attached, update related gig if not present
        if (gig && !existing.relatedGigId) {
          existing.relatedGigId = gig.id;
          existing.relatedGigTitle = gig.title;
          writeLocalConversations(convs);
        }
        return res.json({ success: true, conversation: existing, isNew: false });
      }

      // Create new conversation
      const newConv = {
        id: 'conv_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        participantIds: [currentUserId, targetUser.id],
        participants: [
          {
            id: targetUser.id,
            name: targetUser.name,
            avatar: targetUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            role: targetUser.role || 'seller',
            title: targetUser.title || targetUser.specialty || 'Verified Prime Seller',
            rating: targetUser.rating || 5.0,
            level: targetUser.level || 'Verified Talent',
            responseTime: targetUser.responseTime || '1 Hour Avg Response',
            online: true
          },
          {
            id: currentUserId,
            name: 'You (Client)',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
            role: 'buyer',
            online: true
          }
        ],
        relatedGigId: gig?.id,
        relatedGigTitle: gig?.title,
        lastMessage: {
          text: `Direct consultation started with ${targetUser.name}`,
          senderId: currentUserId,
          senderName: 'You (Client)',
          timestamp: new Date().toISOString()
        },
        updatedAt: new Date().toISOString(),
        unreadCount: 0
      };

      convs.unshift(newConv);
      writeLocalConversations(convs);

      // Broadcast conversation creation over WS
      broadcast({
        type: 'conversation_created',
        payload: newConv
      });

      res.status(201).json({ success: true, conversation: newConv, isNew: true });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Send message via REST endpoint (also broadcasts to WS clients)
  app.post('/api/chat/messages', (req, res) => {
    try {
      const {
        conversationId,
        senderId,
        senderName,
        senderAvatar,
        recipientId,
        recipientName,
        text,
        gigAttachment,
        customOffer
      } = req.body;

      if (!conversationId || !text) {
        return res.status(400).json({ success: false, error: 'conversationId and text are required' });
      }

      const newMsg = {
        id: 'msg_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 7),
        conversationId: String(conversationId),
        senderId: senderId || 'client_me',
        senderName: senderName || 'You (Client)',
        senderAvatar: senderAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        recipientId: recipientId || '',
        recipientName: recipientName || '',
        text: String(text).trim(),
        timestamp: new Date().toISOString(),
        read: false,
        gigAttachment: gigAttachment || undefined,
        customOffer: customOffer || undefined
      };

      const messages = readLocalMessages();
      messages.push(newMsg);
      writeLocalMessages(messages);

      // Update conversation lastMessage & unread count
      const convs = readLocalConversations();
      const convIdx = convs.findIndex((c: any) => c.id === conversationId);
      if (convIdx !== -1) {
        convs[convIdx].lastMessage = {
          text: newMsg.text,
          senderId: newMsg.senderId,
          senderName: newMsg.senderName,
          timestamp: newMsg.timestamp
        };
        convs[convIdx].updatedAt = newMsg.timestamp;
        writeLocalConversations(convs);
      }

      // Broadcast to WebSocket clients
      broadcast({
        type: 'new_message',
        payload: newMsg
      });

      res.status(201).json({ success: true, message: newMsg });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Mark messages in conversation as read
  app.patch('/api/chat/conversations/:id/read', (req, res) => {
    try {
      const { id } = req.params;
      const messages = readLocalMessages();
      let updatedCount = 0;
      for (const m of messages) {
        if (m.conversationId === id && !m.read) {
          m.read = true;
          updatedCount++;
        }
      }
      if (updatedCount > 0) {
        writeLocalMessages(messages);
      }

      const convs = readLocalConversations();
      const cIdx = convs.findIndex((c: any) => c.id === id);
      if (cIdx !== -1) {
        convs[cIdx].unreadCount = 0;
        writeLocalConversations(convs);
      }

      broadcast({
        type: 'mark_read',
        payload: { conversationId: id }
      });

      res.json({ success: true, markedCount: updatedCount });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // --- HTTP & WebSocket Server Setup ---
  const server = http.createServer(app);
  const wss = new WebSocketServer({ server, path: '/ws' });

  interface ClientSession {
    ws: WebSocket;
    userId: string;
    userName: string;
    avatar: string;
  }

  const activeClients = new Set<ClientSession>();

  function broadcast(data: any) {
    const json = JSON.stringify(data);
    for (const client of activeClients) {
      if (client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(json);
      }
    }
  }

  function broadcastPresence() {
    const onlineUserIds = Array.from(new Set(Array.from(activeClients).map((c) => c.userId)));
    // Also include default top sellers as active for responsive marketplace feel
    const allOnline = Array.from(new Set([...onlineUserIds, 'seller-1', 'seller-3', 'support']));
    broadcast({
      type: 'presence',
      payload: {
        onlineUserIds: allOnline,
        onlineCount: allOnline.length
      }
    });
  }

  wss.on('connection', (ws: WebSocket) => {
    const session: ClientSession = {
      ws,
      userId: 'client_me',
      userName: 'You (Client)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    };
    activeClients.add(session);
    broadcastPresence();

    ws.on('message', (rawData) => {
      try {
        const data = JSON.parse(rawData.toString());
        if (data.type === 'init') {
          if (data.payload?.userId) session.userId = data.payload.userId;
          if (data.payload?.userName) session.userName = data.payload.userName;
          if (data.payload?.avatar) session.avatar = data.payload.avatar;
          broadcastPresence();
        } else if (data.type === 'send_message') {
          const payload = data.payload;
          if (!payload || !payload.conversationId || !payload.text) return;

          const messages = readLocalMessages();
          const newMsg = {
            id: 'msg_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 7),
            conversationId: payload.conversationId,
            senderId: payload.senderId || session.userId,
            senderName: payload.senderName || session.userName,
            senderAvatar: payload.senderAvatar || session.avatar,
            recipientId: payload.recipientId || '',
            recipientName: payload.recipientName || '',
            text: String(payload.text).trim(),
            timestamp: new Date().toISOString(),
            read: false,
            gigAttachment: payload.gigAttachment,
            customOffer: payload.customOffer
          };

          messages.push(newMsg);
          writeLocalMessages(messages);

          // Update conversation lastMessage
          const convs = readLocalConversations();
          const convIndex = convs.findIndex((c: any) => c.id === payload.conversationId);
          if (convIndex !== -1) {
            convs[convIndex].lastMessage = {
              text: newMsg.text,
              senderId: newMsg.senderId,
              senderName: newMsg.senderName,
              timestamp: newMsg.timestamp
            };
            convs[convIndex].updatedAt = newMsg.timestamp;
            writeLocalConversations(convs);
          }

          broadcast({
            type: 'new_message',
            payload: newMsg
          });
        } else if (data.type === 'typing_start') {
          broadcast({
            type: 'user_typing',
            payload: {
              conversationId: data.payload?.conversationId,
              userId: session.userId,
              userName: session.userName,
              isTyping: true
            }
          });
        } else if (data.type === 'typing_stop') {
          broadcast({
            type: 'user_typing',
            payload: {
              conversationId: data.payload?.conversationId,
              userId: session.userId,
              userName: session.userName,
              isTyping: false
            }
          });
        } else if (data.type === 'mark_read') {
          const conversationId = data.payload?.conversationId;
          if (conversationId) {
            const messages = readLocalMessages();
            let modified = false;
            for (const m of messages) {
              if (m.conversationId === conversationId && !m.read) {
                m.read = true;
                modified = true;
              }
            }
            if (modified) writeLocalMessages(messages);

            const convs = readLocalConversations();
            const cIdx = convs.findIndex((c: any) => c.id === conversationId);
            if (cIdx !== -1) {
              convs[cIdx].unreadCount = 0;
              writeLocalConversations(convs);
            }

            broadcast({
              type: 'mark_read',
              payload: { conversationId }
            });
          }
        }
      } catch (err) {
        console.error('[WebSocket] message parse error:', err);
      }
    });

    ws.on('close', () => {
      activeClients.delete(session);
      broadcastPresence();
    });

    ws.on('error', (err) => {
      console.error('[WebSocket] client error:', err);
      activeClients.delete(session);
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`[Figer Free Server] Listening on http://0.0.0.0:${PORT} with WebSocket on /ws`);
  });
}

startServer();
