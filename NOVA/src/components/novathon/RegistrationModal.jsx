import React, { useState, useEffect } from 'react';
import { useRegistrationForm } from '../../hooks/useRegistrationForm';
import CopyButton from './CopyButton';

const RegistrationModal = ({ isOpen, onClose }) => {
  const { submitRegistration, loading, message, errors, clearError } = useRegistrationForm();
  
  const [formData, setFormData] = useState({
    teamName: '',
    teamLeader: '',
    participant1Name: '',
    participant2Name: '',
    participant3Name: ''
  });

  const [showTeamId, setShowTeamId] = useState(false);
  const [teamId, setTeamId] = useState(null);

  const handleCloseTeamIdPopup = () => {
    setShowTeamId(false);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    clearError(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await submitRegistration(formData);

    if (result.success && result.teamId) {
      setTeamId(result.teamId);
      setShowTeamId(true);
      setFormData({
        teamName: '',
        teamLeader: '',
        participant1Name: '',
        participant2Name: '',
        participant3Name: ''
      });
      // Don't close the modal immediately, let user see team ID first
    } else if (result.success) {
      // Fallback if no team ID (shouldn't happen with backend)
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
        {showTeamId ? (
          <>
            <div className="popup-header">
              <h2>Registration Successful!</h2>
              <button className="close-popup" onClick={handleCloseTeamIdPopup}>&times;</button>
            </div>
            <div className="team-id-display">
              <div className="success-icon">✅</div>
              <h3>Your Team ID</h3>
              <div className="team-id-box">
                <span className="team-id-text">{teamId}</span>
                <CopyButton code={teamId} />
              </div>
              <p>Please save this Team ID for future reference. We'll also send it to your team leader email.</p>
              <div className="team-id-buttons">
                <button 
                  className="close-team-id-popup"
                  onClick={handleCloseTeamIdPopup}
                >
                  Got it!
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;