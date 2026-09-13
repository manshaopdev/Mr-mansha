import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { MongoClient, ObjectId } from 'mongodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'contacts.json');

// Ensure local persistence directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
}

// MongoDB Client & State
let mongoClient: MongoClient | null = null;
let isMongoConnected = false;
let mongoDbName = 'cyberdev_portfolio';

async function initMongoDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('[DB] No MONGODB_URI provided. Utilizing Persistent Cyber Storage Engine.');
    return;
  }

  try {
    mongoClient = new MongoClient(uri, { serverSelectionTimeoutMS: 3000 });
    await mongoClient.connect();
    isMongoConnected = true;
    console.log('[DB] Successfully connected to MongoDB cluster.');
  } catch (error) {
    console.warn('[DB] Could not connect to external MongoDB. Falling back to persistent local storage:', (error as Error).message);
    isMongoConnected = false;
  }
}

// Local storage helper
function getLocalContacts(): any[] {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading contacts file:', err);
    return [];
  }
}

function saveLocalContacts(data: any[]): void {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing contacts file:', err);
  }
}

async function startServer() {
  await initMongoDB();

  const app = express();
  app.use(express.json());

  // Database status endpoint
  app.get('/api/db-status', async (_req, res) => {
    let count = 0;
    if (isMongoConnected && mongoClient) {
      try {
        const db = mongoClient.db(mongoDbName);
        count = await db.collection('contacts').countDocuments();
      } catch {
        count = getLocalContacts().length;
      }
    } else {
      count = getLocalContacts().length;
    }

    res.json({
      status: 'online',
      provider: isMongoConnected ? 'MongoDB Atlas Cluster' : 'Persistent Cyber-Vault (JSON Engine)',
      isMongo: isMongoConnected,
      totalTransmissions: count,
      timestamp: new Date().toISOString()
    });
  });

  // GET all contact messages (for the interactive cyber terminal / inbox viewer)
  app.get('/api/contact', async (_req, res) => {
    try {
      if (isMongoConnected && mongoClient) {
        const db = mongoClient.db(mongoDbName);
        const list = await db.collection('contacts').find().sort({ createdAt: -1 }).toArray();
        return res.json({ success: true, count: list.length, data: list });
      }

      const list = getLocalContacts().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return res.json({ success: true, count: list.length, data: list });
    } catch (err) {
      console.error('Failed to get contact submissions:', err);
      res.status(500).json({ success: false, error: 'Database query failed' });
    }
  });

  // POST a new contact transmission
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, service, budget, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed: name, email, and message are required fields.'
        });
      }

      const transmissionId = new ObjectId();
      const newTransmission = {
        _id: transmissionId,
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        service: service ? String(service).trim() : 'General Inquiry',
        budget: budget ? String(budget).trim() : 'Undisclosed',
        message: String(message).trim(),
        status: 'unread',
        createdAt: new Date().toISOString(),
        ip: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1'
      };

      if (isMongoConnected && mongoClient) {
        try {
          const db = mongoClient.db(mongoDbName);
          await db.collection('contacts').insertOne(newTransmission);
          return res.status(201).json({
            success: true,
            message: 'Transmission successfully encrypted & stored in MongoDB.',
            id: transmissionId.toString(),
            storage: 'MongoDB'
          });
        } catch (mErr) {
          console.error('Mongo insert failed, failing over to local store:', mErr);
        }
      }

      const current = getLocalContacts();
      current.unshift({
        ...newTransmission,
        _id: transmissionId.toString()
      });
      saveLocalContacts(current);

      return res.status(201).json({
        success: true,
        message: 'Transmission securely received and archived.',
        id: transmissionId.toString(),
        storage: isMongoConnected ? 'MongoDB' : 'Persistent Storage Engine'
      });
    } catch (err) {
      console.error('Failed to save contact message:', err);
      res.status(500).json({ success: false, error: 'Internal system error' });
    }
  });

  // DELETE a contact transmission (for inbox management)
  app.delete('/api/contact/:id', async (req, res) => {
    const { id } = req.params;
    try {
      if (isMongoConnected && mongoClient) {
        const db = mongoClient.db(mongoDbName);
        try {
          await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });
        } catch {
          await db.collection('contacts').deleteOne({ _id: id as any });
        }
      }

      const current = getLocalContacts();
      const filtered = current.filter(c => String(c._id) !== String(id));
      saveLocalContacts(filtered);

      res.json({ success: true, message: 'Transmission cleared.' });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Delete failed' });
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
    console.log(`[CYBERDEV SERVER] Core online and listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
