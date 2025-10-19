import { useState } from 'react';

// Use environment variable for API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const useSubmissionForm = (apiEndpoint = `${API_BASE_URL}/api/submit`) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const validateForm = (formData) => {
    if (!formData.teamId) {
      setMessage({ text: 'Please enter your Team ID', type: 'error' });
      return false;
    }

    if (!formData.projectUrl) {
      setMessage({ text: 'Please enter your Project URL', type: 'error' });
      return false;
    }

    try {
      new URL(formData.projectUrl);
    } catch (e) {
      setMessage({ text: 'Please enter a valid Project URL', type: 'error' });
      return false;
    }

    return true;
  };

  const submitProject = async (formData) => {
    if (!validateForm(formData)) {
      return { success: false };
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionTeamId: formData.teamId,
          projectUrl: formData.projectUrl
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage({ 
          text: result.message || 'Project submitted successfully!', 
          type: 'success' 
        });
        setTimeout(() => {
    setMessage({ text: '', type: '' });
  }, 3000);
        return { success: true };
      } else {
        throw new Error(result.message || 'Failed to submit project');
      }
    } catch (error) {
      setMessage({ 
        text: error.message || 'An error occurred while submitting', 
        type: 'error' 
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { submitProject, loading, message };
};