import { useState } from 'react';

export const useRegistrationForm = (apiEndpoint = '/api/register') => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email && emailRegex.test(email);
  };

  const validateText = (value, minLength = 2) => {
    return value && value.trim().length >= minLength;
  };

  const validateForm = (formData) => {
    const newErrors = {};

    if (!validateText(formData.teamName, 2)) {
      newErrors.teamName = 'Team Name is required (min 2 characters)';
    }

    if (!validateEmail(formData.teamLeader)) {
      newErrors.teamLeader = 'Please enter a valid email address';
    }

    if (!validateText(formData.participant1Name, 2)) {
      newErrors.participant1Name = 'Participant 1 Name is required (min 2 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitRegistration = async (formData) => {
    if (!validateForm(formData)) {
      return { success: false };
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    const members = [formData.participant1Name];
    if (formData.participant2Name) members.push(formData.participant2Name);
    if (formData.participant3Name) members.push(formData.participant3Name);

    const data = {
      teamName: formData.teamName,
      teamLeaderEmail: formData.teamLeader,
      members: members,
    };

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(10000)
      });

      if (!response.ok) {
        const errorResult = await response.json().catch(() => ({ 
          message: `Server error: ${response.status}` 
        }));
        throw new Error(errorResult.message || 'Registration failed');
      }

      const result = await response.json();

      if (result.success) {
        setMessage({ 
          text: "Registration successful! We'll contact you soon.", 
          type: 'success' 
        });
        return { success: true };
      } else {
        throw new Error(result.message || 'Registration failed');
      }
    } catch (error) {
      let errorMessage = 'An unexpected error occurred';
      
      if (error.name === 'AbortError') {
        errorMessage = 'Request timed out. Please try again.';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Cannot connect to server';
      } else {
        errorMessage = error.message;
      }

      setMessage({ text: errorMessage, type: 'error' });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const clearError = (fieldName) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  return {
    submitRegistration,
    loading,
    message,
    errors,
    clearError
  };
};