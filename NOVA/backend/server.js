import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({ // Adjust this to your frontend's URL
}));
app.use(express.json());

// Get announcements
app.get('/api/announcements', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync('../src/data/announcements.json'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load announcements' });
  }
});

// Add announcement
app.post('/api/announcements', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync('../src/data/announcements.json'));
    const newAnnouncement = { ...req.body, id: Date.now() };
    
    // Add to the announcements array inside the object
    data.announcements.unshift(newAnnouncement);
    
    fs.writeFileSync('../src/data/announcements.json', JSON.stringify(data, null, 2));
    res.json({ success: true });
  } catch (error) {
    console.error('POST Error:', error);
    res.status(500).json({ error: 'Failed to add announcement' });
  }
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});