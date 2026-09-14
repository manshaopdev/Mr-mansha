import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { MongoClient, Db } from 'mongodb';

const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const DEPOSITS_FILE = path.join(DATA_DIR, 'deposits.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

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

async function startServer() {
  const app = express();
  app.use(express.json());

  // --- API Endpoints ---

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

  // 6. Authentication Routes (Login & Register)
  app.post('/api/auth/register', (req, res) => {
    try {
      const { name, brandName, email, phone, password } = req.body;
      if (!name || !phone || !password) {
        return res.status(400).json({ success: false, error: 'Name, phone number, and password are required.' });
      }

      const users = readLocalUsers();
      const existingUser = users.find((u) => u.phone === phone || (email && u.email && u.email === email));
      if (existingUser) {
        return res.status(400).json({ success: false, error: 'User with this phone number or email already exists. Please login.' });
      }

      const newUser = {
        id: 'usr_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        name: String(name).trim(),
        brandName: brandName ? String(brandName).trim() : 'SH Client Brand',
        email: email ? String(email).trim().toLowerCase() : '',
        phone: String(phone).trim(),
        password: String(password),
        walletBalance: 0,
        role: 'client',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        createdAt: new Date().toISOString()
      };

      users.unshift(newUser);
      writeLocalUsers(users);

      const { password: _, ...safeUser } = newUser;
      res.status(201).json({ success: true, user: safeUser, message: 'Account registered successfully!' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.post('/api/auth/login', (req, res) => {
    try {
      const { identifier, password } = req.body;
      if (!identifier || !password) {
        return res.status(400).json({ success: false, error: 'Phone/Email and password are required.' });
      }

      const cleanIdentifier = String(identifier).trim();
      const users = readLocalUsers();
      const user = users.find(
        (u) =>
          (u.phone === cleanIdentifier || u.email?.toLowerCase() === cleanIdentifier.toLowerCase()) &&
          u.password === password
      );

      if (!user) {
        return res.status(401).json({ success: false, error: 'Invalid phone/email or password.' });
      }

      const { password: _, ...safeUser } = user;
      res.json({ success: true, user: safeUser, message: 'Logged in successfully!' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.post('/api/auth/guest', (_req, res) => {
    try {
      const users = readLocalUsers();
      const demoUser = users[0] || {
        id: 'usr_demo_guest',
        name: 'Shahzaib Hassan (Guest)',
        brandName: 'SH Zone Media',
        phone: '03262636289',
        walletBalance: 35000,
        role: 'client',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        createdAt: new Date().toISOString()
      };

      const { password: _, ...safeUser } = demoUser;
      res.json({ success: true, user: safeUser, message: 'Guest demo session activated.' });
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

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SH Zone Server] Listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
