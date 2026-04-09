import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

dotenv.config();

class AnnouncementService {
  constructor() {
    this.notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });
    this.databaseId = process.env.ANNOUNCEMENTS_DATABASE_ID;
    this.dataSourceId = null; // Cache the data source ID
  }

  /**
   * Get the data source ID for the announcements database
   */
  async getDataSourceId() {
    if (this.dataSourceId) {
      return this.dataSourceId;
    }

    try {
      const database = await this.notion.databases.retrieve({
        database_id: this.databaseId
      });

      // Get the first data source ID
      this.dataSourceId = database.data_sources[0].id;
      return this.dataSourceId;
    } catch (error) {
      console.error('[ANNOUNCEMENTS] Error getting data source ID:', error);
      throw error;
    }
  }

  /**
   * Get all active announcements using data source query
   */
  async getAnnouncements() {
    try {
      if (!this.databaseId) {
        console.warn('⚠️ ANNOUNCEMENTS_DATABASE_ID not configured');
        return { announcements: [] };
      }

      console.log('[ANNOUNCEMENTS] Fetching from Notion...');
      
      // Get data source ID
      const dataSourceId = await this.getDataSourceId();

      // Query the data source using notion.request
      const response = await this.notion.request({
        path: `data_sources/${dataSourceId}/query`,
        method: 'POST',
        body: {
          filter: {
            property: 'Active',
            checkbox: {
              equals: true
            }
          },
          sorts: [
            {
              property: 'Created At',
              direction: 'descending'
            }
          ]
        }
      });

      // Transform Notion data to frontend format
      const announcements = response.results.map(page => {
        const props = page.properties;
        
        return {
          id: page.id,
          title: this.getTextProperty(props.Title),
          description: this.getTextProperty(props.Description),
          date: {
            day: this.getTextProperty(props['Date Day']) || '1st',
            month: this.getTextProperty(props['Date Month']) || 'JAN'
          },
          details: {
            location: this.getTextProperty(props.Location) || 'TBA',
            time: this.getTextProperty(props.Time) || 'TBA'
          },
          registrationLink: this.getUrlProperty(props['Registration Link']) || '',
          icon: this.getTextProperty(props.Icon) || 'fas fa-bullhorn',
          isActive: this.getCheckboxProperty(props.Active),
          createdAt: page.created_time
        };
      });

      console.log(`[ANNOUNCEMENTS] Retrieved ${announcements.length} active announcements`);
      return { announcements };
      
    } catch (error) {
      console.error('[ANNOUNCEMENTS] Error fetching:', error);
      
      if (error.code === 'object_not_found') {
        console.error('❌ Announcements database not found. Check ANNOUNCEMENTS_DATABASE_ID');
      }
      
      // Return empty array to prevent frontend from breaking
      return { announcements: [] };
    }
  }

  /**
   * Add a new announcement
   */
  async addAnnouncement(announcementData) {
    try {
      if (!this.databaseId) {
        throw new Error('ANNOUNCEMENTS_DATABASE_ID not configured');
      }

      const {
        title,
        description,
        dateDay,
        dateMonth,
        location,
        time,
        registrationLink,
        icon = 'fas fa-bullhorn'
      } = announcementData;

      console.log('[ANNOUNCEMENTS] Creating new announcement:', { title });

      // Create page in Notion database
      const response = await this.notion.pages.create({
        parent: {
          database_id: this.databaseId
        },
        properties: {
          'Title': {
            title: [{ text: { content: title } }]
          },
          'Description': {
            rich_text: [{ text: { content: description || '' } }]
          },
          'Date Day': {
            rich_text: [{ text: { content: dateDay || '' } }]
          },
          'Date Month': {
            rich_text: [{ text: { content: dateMonth || '' } }]
          },
          'Location': {
            rich_text: [{ text: { content: location || '' } }]
          },
          'Time': {
            rich_text: [{ text: { content: time || '' } }]
          },
          'Registration Link': {
            url: registrationLink || null
          },
          'Icon': {
            rich_text: [{ text: { content: icon } }]
          },
          'Active': {
            checkbox: true
          }
        }
      });

      console.log('[ANNOUNCEMENTS] Created successfully:', response.id);

      // Return in frontend format
      return {
        id: response.id,
        title,
        description,
        date: {
          day: dateDay,
          month: dateMonth
        },
        details: {
          location,
          time
        },
        registrationLink,
        icon,
        isActive: true,
        createdAt: response.created_time
      };
      
    } catch (error) {
      console.error('[ANNOUNCEMENTS] Error adding:', error);
      
      // Log more detailed error info
      if (error.body) {
        console.error('[ANNOUNCEMENTS] Error details:', JSON.stringify(error.body, null, 2));
      }
      
      throw error;
    }
  }

  /**
   * Delete (deactivate) an announcement
   */
  async deleteAnnouncement(announcementId) {
    try {
      if (!this.databaseId) {
        throw new Error('ANNOUNCEMENTS_DATABASE_ID not configured');
      }

      console.log('[ANNOUNCEMENTS] Deactivating announcement:', announcementId);

      // Update the page to set Active to false
      await this.notion.pages.update({
        page_id: announcementId,
        properties: {
          'Active': {
            checkbox: false
          }
        }
      });

      console.log('[ANNOUNCEMENTS] Deactivated successfully');
      return true;
      
    } catch (error) {
      console.error('[ANNOUNCEMENTS] Error deleting:', error);
      
      if (error.code === 'object_not_found') {
        throw new Error(`Announcement with ID ${announcementId} not found`);
      }
      
      throw error;
    }
  }

  // Helper methods to extract data from Notion properties
  getTextProperty(property) {
    if (!property) return '';
    
    if (property.title && property.title.length > 0) {
      return property.title[0].plain_text;
    }
    if (property.rich_text && property.rich_text.length > 0) {
      return property.rich_text[0].plain_text;
    }
    return '';
  }

  getUrlProperty(property) {
    return property?.url || '';
  }

  getCheckboxProperty(property) {
    return property?.checkbox || false;
  }
}

export default new AnnouncementService();