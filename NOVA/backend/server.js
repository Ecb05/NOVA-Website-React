import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

import { Client } from '@notionhq/client';
import rateLimit from 'express-rate-limit';
import emailService from './EmailService.js';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
 
});

const app = express();

// Determine environment
const isDevelopment = process.env.NODE_ENV !== 'production';

// Configure CORS
app.use(cors({
  origin: isDevelopment 
    ? ['http://localhost:3000',
    'http://localhost:4173',
    'http://localhost:5173',
    'http://127.0.0.1:5173'] 
    : [
        process.env.FRONTEND_URL,
       'https://thenova.club',                      // ✅ Your custom domain
        'https://www.thenova.club',                  // ✅ With www (if configured)
        'https://nova-website-react-1.vercel.app',   // ✅ Your Vercel URL
        'https://nova-website-react-1-*.vercel.app'  // ✅ Preview deployments
      ],
  credentials: true
}));



app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rate limiting middleware for registration and submission
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests, please try again later.'
  }
});

// Apply rate limiting to specific routes
app.use('/api/register', limiter);
app.use('/api/submit', limiter);

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

// ============================================
// ANNOUNCEMENTS ENDPOINTS
// ============================================

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

// ============================================
// HELPER FUNCTIONS
// ============================================

// Generate a unique team ID
function generateTeamId() {
  return crypto.randomBytes(4).toString('hex').toUpperCase();
}

// ============================================
// REGISTRATION ENDPOINT
// ============================================

/**
 * Team Registration endpoint with email confirmation
 */
app.post('/api/register', async (req, res) => {
  console.log('Registration request received:', req.body);
  
  try {
    const { teamName, teamLeaderEmail, members } = req.body;
    
    // Basic validation
    if (!teamName || !teamLeaderEmail || !members || members.length === 0) {
      console.log('Validation failed:', { teamName, teamLeaderEmail, members });
      return res.status(400).json({
        success: false,
        message: 'Team name, leader email, and at least one member are required'
      });
    }
    
    // Check if Notion is configured
    if (!process.env.NOTION_API_KEY) {
      console.error('NOTION_API_KEY not found in environment variables');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error: Notion API key missing'
      });
    }
    
    if (!process.env.NOTION_DATABASE_ID) {
      console.error('NOTION_DATABASE_ID not found in environment variables');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error: Notion database ID missing'
      });
    }

    // Generate team ID
    const teamId = generateTeamId();
    console.log('Generated team ID:', teamId);
    
    // Create a new record in Notion database
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID,
      },
      properties: {
        'Team Name': {
          title: [
            {
              text: {
                content: teamName,
              },
            },
          ],
        },
        'Team Leader Email': {
          email: teamLeaderEmail,
        },
        'Team Members': {
          rich_text: [
            {
              text: {
                content: members.join(', ')
              }
            }
          ]
        },
        'Team ID': {
          rich_text: [
            {
              text: {
                content: teamId
              }
            }
          ]
        },
        'Registration Date': {
          date: {
            start: new Date().toISOString(),
          },
        },
        'Status': {
          select: {
            name: 'Active'
          }
        }
      },
    });
    
    console.log('Notion record created:', response.id);
    
    // Send confirmation email
    try {
      await emailService.sendConfirmationEmail({ 
        name: teamName, 
        email: teamLeaderEmail,
        teamId: teamId 
      });
      console.log('Confirmation email sent successfully');
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Don't fail the registration if email fails
    }
    
    // Return success response
    res.status(200).json({
      success: true,
      message: 'Registration successful! Check your email for confirmation and your Team ID.',
      teamId: teamId
    });
    
  } catch (error) {
    console.error('Error adding registration to Notion:', error);
    
    // Handle different types of errors
    if (error.code === 'validation_error') {
      return res.status(400).json({
        success: false,
        message: 'Invalid data format. Please check your input.',
        details: error.message
      });
    } else if (error.status === 404) {
      return res.status(404).json({
        success: false,
        message: 'Notion database not found. Please check your database ID.'
      });
    } else if (error.status === 401) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed. Please check your Notion API key.'
      });
    }
    
    // Generic error response
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your registration: ' + error.message
    });
  }
});

// ============================================
// SUBMISSION ENDPOINT
// ============================================

/**
 * Project submission endpoint with email notification
 */


app.post('/api/submit', async (req, res) => {
  try {
    const { submissionTeamId, projectUrl } = req.body;

    // Step 1: Get the database to find data source ID
    const database = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID
    });

    // Get the first data source ID
    const dataSourceId = database.data_sources[0].id;

    // Step 2: Query the data source using notion.request
    const response = await notion.request({
      path: `data_sources/${dataSourceId}/query`,
      method: 'POST',
      body: {
        filter: {
          and: [
            {
              property: 'Team ID',
              rich_text: {
                equals: submissionTeamId  // Make sure this is just the value, not nested
              }
            },
            {
              property: 'Status',
              select: {
                equals: 'Active'
              }
            }
          ]
        }
      }
    });

    if (response.results.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Team not found or not active'
      });
    }
      const submissionDate = new Date().toISOString();

    await notion.pages.update({
      page_id: response.results[0].id,
      properties: {
        'Project URL': {
          url: projectUrl
        },
         'Submission Date': {  // Change this to your actual column name
          date: {
            start: submissionDate
          }
        }
      }
    });

    res.json({ success: true, message: 'Project submitted successfully!' });

  } catch (error) {
    console.error('Full error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// ADMIN ENDPOINTS
// ============================================

/**
 * Send reminder emails to teams who haven't submitted
 * This can be triggered manually or via cron job
 */
app.post('/api/send-reminders', async (req, res) => {
  // Optional: Add authentication/authorization here
  const authHeader = req.headers.authorization;
  
  if (process.env.ADMIN_API_KEY && authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    });
  }

  try {
    await emailService.sendReminderToNonSubmitters();
    res.status(200).json({
      success: true,
      message: 'Reminder emails sent successfully'
    });
  } catch (error) {
    console.error('Error sending reminders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send reminder emails: ' + error.message
    });
  }
});

// ============================================
// HEALTH CHECK & TEST ENDPOINTS
// ============================================

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    port: PORT,
    config: {
      notion: !!process.env.NOTION_DATABASE_ID,
      sendgrid: !!process.env.SENDGRID_API_KEY
    }
  });
});

// Test endpoint to verify server is running
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Server is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Legacy health check (keeping for compatibility)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    environment: process.env.NODE_ENV || 'development' 
  });
});

// ============================================
// SERVER STARTUP
// ============================================

// Use PORT from environment or default to 3001
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✅ Data directory: ${dataDir}`);
  console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
  console.log(`✅ Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`📝 Notion database: ${process.env.NOTION_DATABASE_ID ? 'Configured' : 'NOT CONFIGURED'}`);
  console.log(`🔑 Notion API key: ${process.env.NOTION_API_KEY ? 'Configured' : 'NOT CONFIGURED'}`);
  console.log(`📧 SendGrid API key: ${process.env.SENDGRID_API_KEY ? 'Configured' : 'NOT CONFIGURED'}`);
  console.log('='.repeat(50));
  
  // Optional: Setup automated reminder emails (uncomment to enable)
  // emailService.setupReminderCron('0 9 * * *'); // Daily at 9 AM
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, stopping scheduled jobs...');
  emailService.stopAllJobs();
  process.exit(0);
});

export default app;