import React, { useState } from 'react';
import { useSubmissionForm } from '../../hooks/useSubmissionForm';

const SubmissionModal = ({ isOpen, onClose }) => {
  const { submitProject, loading, message } = useSubmissionForm();
  
  const [formData, setFormData] = useState({
    teamId: '',
    projectUrl: '',
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await submitProject(formData);
    
    if (result.success) {
      setFormData({ teamId: '', projectUrl: '' });
      setTimeout(() => onClose(), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2>Project Submission</h2>
          <button className="close-popup" onClick={onClose}>&times;</button>
        </div>

        <form className="submission-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="teamId">Team ID</label>
            <input
              type="text"
              id="teamId"
              name="teamId"
              value={formData.teamId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="projectUrl">Project Website URL</label>
            <input
              type="url"
              id="projectUrl"
              name="projectUrl"
              value={formData.projectUrl}
              onChange={handleChange}
              placeholder="https://yourproject.com"
              required
            />
          </div>

          <button 
            type="submit" 
            className="submit-registration"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Project'}
          </button>

          {message.text && (
            <div className={`${message.type}-message`} style={{ display: 'block' }}>
              {message.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubmissionModal;