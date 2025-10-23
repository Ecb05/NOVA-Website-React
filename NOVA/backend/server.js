import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { Client } from '@notionhq/client';
import rateLimit from 'express-rate-limit';
import crypto from 'crypto';

import AnnouncementService from './AnnouncementService.js';

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



// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// ============================================
// NOTION CACHE - Add this complete section
// ============================================

const notionCache = {
  registrationDataSourceId: null,
  membersDataSourceId: null
};

/**
 * Get cached registration database data source ID
 * Saves 1-2 seconds per submission!
 */
async function getRegistrationDataSourceId() {
  if (notionCache.registrationDataSourceId) {
    console.log('[CACHE] Using cached registration dataSourceId');
    return notionCache.registrationDataSourceId;
  }

  try {
    console.log('[CACHE] Fetching registration dataSourceId...');
    const database = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID
    });

    notionCache.registrationDataSourceId = database.data_sources[0].id;
    console.log('[CACHE] Cached registration dataSourceId:', notionCache.registrationDataSourceId);
    
    return notionCache.registrationDataSourceId;
  } catch (error) {
    console.error('[CACHE] Error fetching dataSourceId:', error);
    throw error;
  }
}

/**
 * Optional: Get cached members database data source ID
 */
/**async function getMembersDataSourceId() {
  if (notionCache.membersDataSourceId) {
    console.log('[CACHE] Using cached members dataSourceId');
    return notionCache.membersDataSourceId;
  }

  try {
    console.log('[CACHE] Fetching members dataSourceId...');
    const database = await notion.databases.retrieve({
      database_id: process.env.NOTION_MEMBERS_DATABASE_ID
    });

    notionCache.membersDataSourceId = database.data_sources[0].id;
    console.log('[CACHE] Cached members dataSourceId');
    
    return notionCache.membersDataSourceId;
  } catch (error) {
    console.error('[CACHE] Error fetching members dataSourceId:', error);
    throw error;
  }
}**/

/**
 * Clear cache (useful for debugging or if database structure changes)
 */
function clearNotionCache() {
  notionCache.registrationDataSourceId = null;
  notionCache.membersDataSourceId = null;
  console.log('[CACHE] Cache cleared');
}


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
app.get('/api/announcements', async (req, res) => {
  try {
    const data = await AnnouncementService.getAnnouncements();
    res.json(data);
  } catch (error) {
    console.error('[API] GET announcements error:', error);
    
    // Return empty announcements on error to prevent frontend breaking
    res.status(200).json({ announcements: [] });
  }
});

// Add announcement (admin only)
app.post('/api/announcements', async (req, res) => {
  try {
    // Optional: Add admin authentication here
    // const { password } = req.headers;
    // if (password !== process.env.ADMIN_PASSWORD) {
    //   return res.status(401).json({ error: 'Unauthorized' });
    // }

    const newAnnouncement = await AnnouncementService.addAnnouncement(req.body);
    
    // Return all announcements after adding
    const data = await AnnouncementService.getAnnouncements();
    
    res.json({ 
      success: true, 
      announcement: newAnnouncement,
      announcements: data.announcements 
    });
    
  } catch (error) {
    console.error('[API] POST announcement error:', error);
    res.status(500).json({ 
      error: 'Failed to add announcement',
      message: error.message 
    });
  }
});

// Delete announcement (admin only)
app.delete('/api/announcements/:id', async (req, res) => {
  try {
    // Optional: Add admin authentication
    
    await AnnouncementService.deleteAnnouncement(req.params.id);
    
    // Return updated list
    const data = await AnnouncementService.getAnnouncements();
    
    res.json({ 
      success: true, 
      message: 'Announcement deleted successfully',
      announcements: data.announcements 
    });
    
  } catch (error) {
    console.error('[API] DELETE announcement error:', error);
    
    if (error.message.includes('not found')) {
      res.status(404).json({ error: 'Announcement not found' });
    } else {
      res.status(500).json({ 
        error: 'Failed to delete announcement',
        message: error.message 
      });
    }
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
    message:  'Registration successful! Save your Team ID somewhere safe!',
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

app.post('/api/submit', async (req, res) => {
  try {
    const { submissionTeamId, projectUrl } = req.body;

    if (!submissionTeamId || !projectUrl) {
      return res.status(400).json({
        success: false,
        message: 'Team ID and Project URL are required'
      });
    }

    //  USE CACHED DATA SOURCE ID
    const dataSourceId = await getRegistrationDataSourceId();

    const response = await notion.request({
      path: `data_sources/${dataSourceId}/query`,
      method: 'POST',
      body: {
        filter: {
          and: [
            { property: 'Team ID', rich_text: { equals: submissionTeamId } },
            { or: [
                { property: 'Status', select: { equals: 'Active' } },
                { property: 'Status', select: { equals: 'Pending Verification' } }
            ]}
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
        'Project URL': { url: projectUrl },
        'Submission Date': { date: { start: submissionDate } }
      }
    });

    res.json({ success: true, message: 'Project submitted successfully!' });

  } catch (error) {
    console.error('[SUBMIT] Error:', error);
    
    // Clear cache on errors
    if (error.code === 'object_not_found' || error.status === 404) {
      clearNotionCache();
    }
    
    res.status(500).json({
      success: false,
      message: 'Submission failed. Please try again.'
    });
  }
});

// ============================================
// CLUB MEMBERSHIP REGISTRATION ENDPOINT
// ============================================

app.post('/api/clubregister', async (req, res) => {
  console.log('[CLUB REGISTER] New registration request received');
  const startTime = Date.now();

  const {
    name,
    rollno,
    email,
    phone,
    year,
    interests,
    message
  } = req.body;

  // Basic validation
  if (!name || !rollno || !email || !phone || !year) {
    console.log('[CLUB REGISTER] Validation failed - missing required fields');
    return res.status(400).json({
      success: false,
      message: 'Name, Roll Number, Email, Phone, and Year are required'
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log('[CLUB REGISTER] Validation failed - invalid email');
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address'
    });
  }

  // Phone validation
  const phoneRegex = /^[6-9]\d{9}$/;
  const cleanPhone = phone.replace(/\s+/g, '').replace(/^\+91/, '');
  if (!phoneRegex.test(cleanPhone)) {
    console.log('[CLUB REGISTER] Validation failed - invalid phone');
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid 10-digit phone number'
    });
  }

  // Check if Notion is configured
  if (!process.env.NOTION_API_KEY) {
    console.error('[CLUB REGISTER] NOTION_API_KEY missing');
    return res.status(500).json({
      success: false,
      message: 'Server configuration error: Notion API key missing'
    });
  }

  if (!process.env.NOTION_MEMBERS_DATABASE_ID) {
    console.error('[CLUB REGISTER] NOTION_MEMBERS_DATABASE_ID missing');
    return res.status(500).json({
      success: false,
      message: 'Server configuration error: Members database not configured'
    });
  }

  try {
    console.log('[CLUB REGISTER] Creating Notion page...');

    // Determine year suffix (1st, 2nd, 3rd, 4th)
    const yearSuffix = year == 1 ? 'st' : year == 2 ? 'nd' : year == 3 ? 'rd' : 'th';
    const yearLabel = `${year}${yearSuffix} Year`;

    // Format phone number with +91
    const formattedPhone = cleanPhone.startsWith('+91') ? cleanPhone : `+91${cleanPhone}`;

    // Create interests array for multi-select
    const interestsArray = Array.isArray(interests) ? interests : [];

    // Create a new page in Notion database
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_MEMBERS_DATABASE_ID,
      },
      properties: {
        'Name': {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        'Roll Number': {
          rich_text: [
            {
              text: {
                content: rollno,
              },
            },
          ],
        },
        'Email': {
          email: email,
        },
        'Phone': {
          phone_number: formattedPhone,
        },
        'Year': {
          select: {
            name: yearLabel,
          },
        },
        'Interests': {
          multi_select: interestsArray.map(interest => ({ name: interest })),
        },
        'Message': {
          rich_text: [
            {
              text: {
                content: message || 'No message provided',
              },
            },
          ],
        },
        'Registration Date': {
          date: {
            start: new Date().toISOString(),
          },
        },
        'Status': {
          select: {
            name: 'Pending Review',
          },
        },
      },
    });

    console.log('[CLUB REGISTER] Notion page created:', response.id);
    console.log('[CLUB REGISTER] Time elapsed:', Date.now() - startTime, 'ms');

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Registration successful! We will contact you soon.',
    });

    // Optional: Send welcome email in background (if SendGrid is configured)
    if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_FROM_EMAIL) {
      (async () => {
        try {
          await sendClubWelcomeEmail(email, name);
          console.log('[CLUB REGISTER] Welcome email sent to:', email);
        } catch (emailError) {
          console.error('[CLUB REGISTER] Failed to send welcome email:', emailError.message);
        }
      })();
    }

  } catch (error) {
    console.error('[CLUB REGISTER] Error:', error);
    
    // Handle specific Notion errors
    if (error.code === 'validation_error') {
      console.error('[CLUB REGISTER] Notion validation error:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Database validation error. Please contact support.',
      });
    }
    
    if (error.status === 404) {
      console.error('[CLUB REGISTER] Database not found');
      return res.status(500).json({
        success: false,
        message: 'Database not found. Please contact support.',
      });
    }

    if (error.status === 401) {
      console.error('[CLUB REGISTER] Authentication failed');
      return res.status(500).json({
        success: false,
        message: 'Authentication error. Please contact support.',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit registration. Please try again later.',
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
