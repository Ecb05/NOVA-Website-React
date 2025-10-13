import sgMail from '@sendgrid/mail';
import cron from 'node-cron';
import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

dotenv.config();

class EmailService {
    constructor() {
        // Initialize SendGrid
        if (process.env.SENDGRID_API_KEY) {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        } else {
            console.warn('SENDGRID_API_KEY not found - email functionality will be disabled');
        }
        
        // Initialize Notion client
        this.notion = new Client({
            auth: process.env.NOTION_API_KEY,
        });
        
        // Store scheduled jobs
        this.scheduledJobs = new Map();
    }

    /**
     * Send a team registration confirmation email
     * @param {Object} teamData - Team registration data
     * @param {string} teamData.name - Team name
     * @param {string} teamData.email - Team leader's email
     * @param {string} teamData.teamId - Generated team ID
     */
    async sendConfirmationEmail(teamData) {
        try {
            const { name, email, teamId } = teamData;
            
            if (!process.env.SENDGRID_API_KEY) {
                console.log('SendGrid not configured - skipping confirmation email');
                return;
            }

            const msg = {
                to: email,
                from: {
                    email: process.env.FROM_EMAIL,
                    name: process.env.FROM_NAME || 'Novathon Team'
                },
                templateId: process.env.CONFIRMATION_TEMPLATE_ID,
                dynamicTemplateData: {
                    teamName: name,
                    teamId: teamId,
                    submissionUrl: `${process.env.FRONTEND_URL}/novathon.html`,
                    // Add any other dynamic data your template needs
                }
            };
            
            await sgMail.send(msg);
            console.log(`Confirmation email sent to ${email} for team ${name}`);
        } catch (error) {
            console.error('Error sending confirmation email:', error);
            if (error.response) {
                console.error('SendGrid error details:', error.response.body);
            }
            throw error;
        }
    }

    /**
     * Send a project submission confirmation email
     * @param {Object} submissionData - Project submission data
     * @param {string} submissionData.teamName - Team name
     * @param {string} submissionData.email - Team leader's email
     * @param {string} submissionData.teamId - Team ID
     * @param {string} submissionData.projectUrl - Submitted project URL
     */
    async sendSubmissionEmail(submissionData) {
        try {
            const { teamName, email, teamId, projectUrl } = submissionData;
            
            if (!process.env.SENDGRID_API_KEY) {
                console.log('SendGrid not configured - skipping submission email');
                return;
            }

            const msg = {
                to: email,
                from: {
                    email: process.env.FROM_EMAIL,
                    name: process.env.FROM_NAME || 'Novathon Team'
                },
                templateId: process.env.SUBMISSION_TEMPLATE_ID,
                dynamicTemplateData: {
                    teamName: teamName,
                    teamId: teamId,
                    projectUrl: projectUrl,
                    submissionDate: new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }),
                    // Add any other dynamic data your template needs
                }
            };
            
            await sgMail.send(msg);
            console.log(`Submission confirmation email sent to ${email} for team ${teamName}`);
        } catch (error) {
            console.error('Error sending submission email:', error);
            if (error.response) {
                console.error('SendGrid error details:', error.response.body);
            }
            throw error;
        }
    }

    /**
     * Send reminder email to teams who registered but haven't submitted
     * @param {Object} teamData - Team data
     * @param {string} teamData.teamName - Team name
     * @param {string} teamData.email - Team leader's email
     * @param {string} teamData.teamId - Team ID
     */
    async sendReminderEmail(teamData) {
        try {
            const { teamName, email, teamId } = teamData;
            
            if (!process.env.SENDGRID_API_KEY) {
                console.log('SendGrid not configured - skipping reminder email');
                return;
            }

            const msg = {
                to: email,
                from: {
                    email: process.env.FROM_EMAIL,
                    name: process.env.FROM_NAME || 'Novathon Team'
                },
                templateId: process.env.REMINDER_TEMPLATE_ID,
                dynamicTemplateData: {
                    teamName: teamName,
                    teamId: teamId,
                    submissionUrl: `${process.env.FRONTEND_URL}/novathon.html`,
                    deadlineDate: process.env.SUBMISSION_DEADLINE || 'soon',
                    // Add any other dynamic data your template needs
                }
            };
            
            await sgMail.send(msg);
            console.log(`Reminder email sent to ${email} for team ${teamName}`);
        } catch (error) {
            console.error('Error sending reminder email:', error);
            if (error.response) {
                console.error('SendGrid error details:', error.response.body);
            }
            // Don't throw error for reminder emails - they're not critical
        }
    }

    /**
     * Schedule reminder emails for teams that haven't submitted
     * This can be called via a cron job
     */
    async sendReminderToNonSubmitters() {
        try {
            console.log('Checking for teams that need submission reminders...');
            
            // Query Notion database for active teams without submissions
            const response = await this.notion.databases.query({
                database_id: process.env.NOTION_DATABASE_ID,
                filter: {
                    and: [
                        {
                            property: 'Status',
                            select: {
                                equals: 'Active'
                            }
                        },
                        {
                            property: 'Project URL',
                            url: {
                                is_empty: true
                            }
                        }
                    ]
                }
            });

            console.log(`Found ${response.results.length} teams without submissions`);

            // Send reminder to each team
            for (const page of response.results) {
                const teamName = page.properties['Team Name'].title[0]?.text?.content;
                const email = page.properties['Team Leader Email'].email;
                const teamId = page.properties['Team ID'].rich_text[0]?.text?.content;

                if (teamName && email && teamId) {
                    await this.sendReminderEmail({ teamName, email, teamId });
                    // Add delay between emails to avoid rate limiting
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }

            console.log('Reminder emails sent successfully');
        } catch (error) {
            console.error('Error sending reminder emails:', error);
        }
    }

    /**
     * Setup cron job for automated reminder emails
     * @param {string} schedule - Cron schedule (default: '0 9 * * *' - daily at 9 AM)
     */
    setupReminderCron(schedule = '0 9 * * *') {
        // Cancel existing job if any
        if (this.scheduledJobs.has('reminder')) {
            this.scheduledJobs.get('reminder').stop();
        }

        // Create new scheduled job
        const job = cron.schedule(schedule, () => {
            this.sendReminderToNonSubmitters();
        });

        this.scheduledJobs.set('reminder', job);
        console.log(`Reminder email cron job scheduled: ${schedule}`);
    }

    /**
     * Stop all scheduled jobs
     */
    stopAllJobs() {
        this.scheduledJobs.forEach((job, name) => {
            job.stop();
            console.log(`Stopped scheduled job: ${name}`);
        });
        this.scheduledJobs.clear();
    }
}

// Export singleton instance
const emailService = new EmailService();
export default emailService;