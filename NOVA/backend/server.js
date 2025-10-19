import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { Client } from '@notionhq/client';
import rateLimit from 'express-rate-limit';
import emailService from './EmailService.js';
import crypto from 'crypto';

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Helper function to upload to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'novathon-payments',
        resource_type: 'image'
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};

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

// Set timeout for all requests to 30 seconds
app.use((req, res, next) => {
  req.setTimeout(30000);
  res.setTimeout(30000);
  next();
});

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
const dataDir = isDevelopment 
  ? path.join(__dirname, '../public/data')
  : path.join(__dirname, '../data');

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
//=============================================
// Authentication endpoint
//=============================================
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  
  if (password === process.env.ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, error: 'Incorrect password' });
  }
});
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
// Delete announcement
app.delete('/api/announcements/:id', (req, res) => {
  try {
    const announcementId = parseInt(req.params.id);
    const data = JSON.parse(fs.readFileSync(announcementsPath, 'utf-8'));
    
    // Filter out the announcement with the matching id
    const originalLength = data.announcements.length;
    data.announcements = data.announcements.filter(
      announcement => announcement.id !== announcementId
    );
    
    // Check if an announcement was actually deleted
    if (data.announcements.length === originalLength) {
      return res.status(404).json({ error: 'Announcement not found' });
    }
    
    fs.writeFileSync(announcementsPath, JSON.stringify(data, null, 2));
    res.json({ success: true, message: 'Announcement deleted successfully' });
  } catch (error) {
    console.error('DELETE Error:', error);
    res.status(500).json({ error: 'Failed to delete announcement' });
  }
});

// ============================================
// HELPER FUNCTIONS
// ============================================

// Generate a unique team ID
function generateTeamId() {
  return crypto.randomBytes(4).toString('hex').toUpperCase();
}

/**
 * Background processing function for Notion and email
 */
async function processRegistrationAsync(teamId, teamName, teamLeaderEmail, members) {
  try {
    // Create a new record in Notion database with timeout
    const createNotionPage = notion.pages.create({
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

    // Add timeout to the Notion API call (60 seconds for background)
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Notion API request timed out after 60 seconds')), 60000);
    });

    const response = await Promise.race([createNotionPage, timeoutPromise]);
    
    console.log('Notion record created:', response.id);
    
    // Send confirmation email (with shorter timeout)
    try {
      // Set a timeout for email sending
      const emailPromise = emailService.sendConfirmationEmail({ 
        name: teamName, 
        email: teamLeaderEmail,
        teamId: teamId 
      });
      
      const emailTimeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Email timeout')), 5000); // 5 second timeout
      });
      
      await Promise.race([emailPromise, emailTimeout]);
      console.log('Confirmation email sent successfully to:', teamLeaderEmail);
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError.message || emailError);
      // Log this error but don't fail since registration already succeeded
    }
    
  } catch (error) {
    console.error('Error in background registration processing:', error);
    
    // Log detailed error information
    if (error.code === 'validation_error') {
      console.error('Notion validation error for team:', teamId, error.message);
    } else if (error.status === 404) {
      console.error('Notion database not found for team:', teamId);
    } else if (error.status === 401) {
      console.error('Notion authentication failed for team:', teamId);
    }
    
    // You could implement retry logic here or store failed registrations
    // for manual review/retry
    throw error; // Re-throw so it's caught by the outer catch
  }
}

// ============================================
// REGISTRATION ENDPOINT WITH FILE UPLOAD
// ============================================

app.post('/api/register', upload.single('paymentProof'), (req, res) => {
  const startTime = Date.now();
  console.log('[REGISTER] Request received at:', new Date().toISOString());
  console.log('[REGISTER] Request body:', req.body);
  console.log('[REGISTER] File received:', req.file ? 'Yes' : 'No');
  
  const { 
    teamName, 
    teamLeaderEmail, 
    teamLeaderPhone,
    members, // This will be a JSON string
    transactionId 
  } = req.body;
  
  // Parse members JSON
  let parsedMembers;
  try {
    parsedMembers = JSON.parse(members);
  } catch (error) {
    console.log('[REGISTER] Failed to parse members');
    return res.status(400).json({
      success: false,
      message: 'Invalid members data format'
    });
  }
  
  // Basic validation
  if (!teamName || !teamLeaderEmail || !teamLeaderPhone || !parsedMembers || parsedMembers.length === 0) {
    console.log('[REGISTER] Validation failed - missing required fields');
    return res.status(400).json({
      success: false,
      message: 'Team name, leader email, leader phone, and at least one member are required'
    });
  }

  // Validate transaction ID
  if (!transactionId || transactionId.trim().length < 5) {
    console.log('[REGISTER] Validation failed - invalid transaction ID');
    return res.status(400).json({
      success: false,
      message: 'Valid transaction ID is required'
    });
  }

  // Validate payment proof file
  if (!req.file) {
    console.log('[REGISTER] Validation failed - no payment proof uploaded');
    return res.status(400).json({
      success: false,
      message: 'Payment proof screenshot is required'
    });
  }
  
  // Check if Notion is configured
  if (!process.env.NOTION_API_KEY) {
    console.error('[REGISTER] NOTION_API_KEY missing');
    return res.status(500).json({
      success: false,
      message: 'Server configuration error: Notion API key missing'
    });
  }
  
  if (!process.env.NOTION_DATABASE_ID) {
    console.error('[REGISTER] NOTION_DATABASE_ID missing');
    return res.status(500).json({
      success: false,
      message: 'Server configuration error: Notion database ID missing'
    });
  }

  // Generate team ID
  const teamId = generateTeamId();
  console.log('[REGISTER] Generated team ID:', teamId, '- Time elapsed:', Date.now() - startTime, 'ms');
  
  // IMMEDIATELY send response to frontend
  console.log('[REGISTER] Sending response NOW - Time elapsed:', Date.now() - startTime, 'ms');
  
  const responseData = {
    success: true,
    message: 'Registration successful! Check your email for confirmation and your Team ID.',
    teamId: teamId
  };
  
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(JSON.stringify(responseData))
  });
  res.write(JSON.stringify(responseData));
  res.end();
  
  console.log('[REGISTER] Response sent! Now processing in background...');
  
  // Process registration in background (upload image + Notion + email)
  (async () => {
    try {
      console.log('[REGISTER-BG] Starting background processing for team:', teamId);
      
      // Upload payment proof to Cloudinary
      let paymentProofUrl = '';
      try {
        console.log('[REGISTER-BG] Uploading payment proof to Cloudinary...');
        const uploadResult = await uploadToCloudinary(req.file.buffer);
        paymentProofUrl = uploadResult.secure_url;
        console.log('[REGISTER-BG] Payment proof uploaded:', paymentProofUrl);
      } catch (uploadError) {
        console.error('[REGISTER-BG] Error uploading to Cloudinary:', uploadError);
        // Continue with registration even if upload fails
      }

      // Create members array for Notion (with phone numbers)
      const memberDetails = parsedMembers.map(member => 
        `${member.name} (${member.phone})`
      ).join(', ');

      // Create a new record in Notion database
      const createNotionPage = notion.pages.create({
        parent: {
          database_id: process.env.NOTION_DATABASE_ID,
        },
        properties: {
          'Team Name': {
            title: [
              {
                text: {
                  content: teamName
                }
              }
            ]
          },
          'Team Leader Email': {
            email: teamLeaderEmail
          },
          'Team Leader Phone': {
            phone_number: teamLeaderPhone
          },
          'Members': {
            rich_text: [
              {
                text: {
                  content: memberDetails
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
          'Transaction ID': {
            rich_text: [
              {
                text: {
                  content: transactionId
                }
              }
            ]
          },
          'Payment Proof URL': {
            url: paymentProofUrl || null
          },
          'Registration Date': {
            date: {
              start: new Date().toISOString(),
            },
          },
          'Status': {
            select: {
              name: 'Pending Verification'
            }
          }
        },
      });

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Notion API request timed out after 60 seconds')), 60000);
      });

      const notionResponse = await Promise.race([createNotionPage, timeoutPromise]);
      console.log('[REGISTER-BG] Notion record created:', notionResponse.id);
      
      // Send confirmation email
      try {
        const emailPromise = emailService.sendConfirmationEmail({ 
          name: teamName, 
          email: teamLeaderEmail,
          teamId: teamId 
        });
        
        const emailTimeout = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Email timeout')), 5000);
        });
        
        await Promise.race([emailPromise, emailTimeout]);
        console.log('[REGISTER-BG] Confirmation email sent to:', teamLeaderEmail);
      } catch (emailError) {
        console.error('[REGISTER-BG] Error sending email:', emailError.message || emailError);
      }
      
      console.log('[REGISTER-BG] Background processing completed for team:', teamId);
      
    } catch (error) {
      console.error('[REGISTER-BG] Error in background processing:', error);
      
      if (error.code === 'validation_error') {
        console.error('[REGISTER-BG] Notion validation error for team:', teamId, error.message);
      } else if (error.status === 404) {
        console.error('[REGISTER-BG] Notion database not found for team:', teamId);
      } else if (error.status === 401) {
        console.error('[REGISTER-BG] Notion authentication failed for team:', teamId);
      }
    }
  })();
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
                equals: submissionTeamId
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
        'Submission Date': {
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
