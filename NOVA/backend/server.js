import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Determine environment
const isDevelopment = process.env.NODE_ENV !== 'production';

// Configure CORS
app.use(cors({
  origin: isDevelopment 
    ? ['http://localhost:3000',
    'http://localhost:4173'] 
    : [
        process.env.FRONTEND_URL,
        'https://your-frontend-url.railway.app',
        'http://localhost:4173' // Update with your actual Railway frontend URL
      ],
  credentials: true
}));

app.use(express.json());

// Define data file paths
// In development: backend/../src/data/announcements.json
// In production: backend/../dist/data/announcements.json (or keep in src if not copying to dist)
const dataDir = isDevelopment 
  ? path.join(__dirname, '../public/data')
  : path.join(__dirname, '../data'); // Adjust if you copy data to dist

const announcementsPath = path.join(dataDir, 'announcements.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize announcements file if it doesn't exist
if (!fs.existsSync(announcementsPath)) {
  const initialData = { announcements: [] };
  fs.writeFileSync(announcementsPath, JSON.stringify(initialData, null, 2));
}

// Get announcements
app.get('/api/announcements', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(announcementsPath, 'utf-8'));
    res.json(data);
  } catch (error) {
    console.error('GET Error:', error);
    res.status(500).json({ error: 'Failed to load announcements' });
  }
});

// Add announcement
app.post('/api/announcements', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(announcementsPath, 'utf-8'));
    const newAnnouncement = { ...req.body, id: Date.now() };
    
    // Add to the announcements array inside the object
    data.announcements.unshift(newAnnouncement);
    
    fs.writeFileSync(announcementsPath, JSON.stringify(data, null, 2));
    res.json({ success: true, announcement: newAnnouncement });
  } catch (error) {
    console.error('POST Error:', error);
    res.status(500).json({ error: 'Failed to add announcement' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', environment: process.env.NODE_ENV || 'development' });
});

// Use PORT from environment or default to 3001
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Data directory: ${dataDir}`);
});