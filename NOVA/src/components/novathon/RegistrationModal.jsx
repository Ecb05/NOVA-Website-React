import React, { useState } from 'react';
import { useRegistrationForm } from '../../hooks/useRegistrationForm';

const RegistrationModal = ({ isOpen, onClose }) => {
  const { submitRegistration, loading, message, errors, clearError } = useRegistrationForm();
  
  const [formData, setFormData] = useState({
    teamName: '',
    teamLeader: '',
    participant1Name: '',
    participant2Name: '',
    participant3Name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    clearError(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await submitRegistration(formData);
    
    if (result.success) {
      setFormData({
        teamName: '',
        teamLeader: '',
        participant1Name: '',
        participant2Name: '',
        participant3Name: ''
      });
      setTimeout(() => onClose(), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2>Team Registration</h2>
          <button className="close-popup" onClick={onClose}>&times;</button>
        </div>

        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="teamName">Team Name</label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
              required
            />
            {errors.teamName && <span className="error-text">{errors.teamName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="teamLeader">Team Leader Email</label>
            <input
              type="email"
              id="teamLeader"
              name="teamLeader"
              value={formData.teamLeader}
              onChange={handleChange}
              required
            />
            {errors.teamLeader && <span className="error-text">{errors.teamLeader}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="participant1Name">Participant 1 Name</label>
            <input
              type="text"
              id="participant1Name"
              name="participant1Name"
              value={formData.participant1Name}
              onChange={handleChange}
              required
            />
            {errors.participant1Name && <span className="error-text">{errors.participant1Name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="participant2Name">Participant 2 Name (Optional)</label>
            <input
              type="text"
              id="participant2Name"
              name="participant2Name"
              value={formData.participant2Name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="participant3Name">Participant 3 Name (Optional)</label>
            <input
              type="text"
              id="participant3Name"
              name="participant3Name"
              value={formData.participant3Name}
              onChange={handleChange}
            />
          </div>

          <button 
            type="submit" 
            className="submit-registration"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Register Team'}
          </button>

          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;