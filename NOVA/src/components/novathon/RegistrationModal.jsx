import React, { useState, useEffect } from 'react';
import { useRegistrationForm } from '../../hooks/useRegistrationForm';
import CopyButton from './CopyButton';

const RegistrationModal = ({ isOpen, onClose }) => {
  const { submitRegistration, loading, message, errors, clearError } = useRegistrationForm();
  
  const [formData, setFormData] = useState({
    teamName: '',
    teamLeader: '',
    teamLeaderPhone: '',
    participant1Name: '',
    participant1Phone: '',
    participant2Name: '',
    participant2Phone: '',
    participant3Name: '',
    participant3Phone: '',
    transactionId: '',
    paymentProof: null
  });

  const [showTeamId, setShowTeamId] = useState(false);
  const [teamId, setTeamId] = useState(null);
  const [showPaymentQR, setShowPaymentQR] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      setFormData(prev => ({ ...prev, paymentProof: file }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
        teamLeaderPhone: '',
        participant1Name: '',
        participant1Phone: '',
        participant2Name: '',
        participant2Phone: '',
        participant3Name: '',
        participant3Phone: '',
        transactionId: '',
        paymentProof: null
      });
      setPreviewUrl(null);
    } else if (result.success) {
      setFormData({
        teamName: '',
        teamLeader: '',
        teamLeaderPhone: '',
        participant1Name: '',
        participant1Phone: '',
        participant2Name: '',
        participant2Phone: '',
        participant3Name: '',
        participant3Phone: '',
        transactionId: '',
        paymentProof: null
      });
      setPreviewUrl(null);
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
              {/* Team Name */}
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

              {/* Team Leader Email & Phone */}
              <div className="form-group">
                <label htmlFor="teamLeader">Team Leader Email</label>
                <input
                  type="email"
                  id="teamLeader"
                  name="teamLeader"
                  value={formData.teamLeader}
                  onChange={handleChange}
                  placeholder='MVSREC e-mail...'
                  required
                />
                {errors.teamLeader && <span className="error-text">{errors.teamLeader}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="teamLeaderPhone">Team Leader Phone Number</label>
                <input
                  type="tel"
                  id="teamLeaderPhone"
                  name="teamLeaderPhone"
                  value={formData.teamLeaderPhone}
                  onChange={handleChange}
                  placeholder="+91XXXXXXXXXX"
                  required
                />
                {errors.teamLeaderPhone && <span className="error-text">{errors.teamLeaderPhone}</span>}
              </div>

              {/* Participant 1 */}
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
                <label htmlFor="participant1Phone">Participant 1 Phone Number</label>
                <input
                  type="tel"
                  id="participant1Phone"
                  name="participant1Phone"
                  value={formData.participant1Phone}
                  onChange={handleChange}
                  placeholder="+91XXXXXXXXXX"
                  required
                />
                {errors.participant1Phone && <span className="error-text">{errors.participant1Phone}</span>}
              </div>

              {/* Participant 2 */}
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

              {formData.participant2Name && (
                <div className="form-group">
                  <label htmlFor="participant2Phone">Participant 2 Phone Number</label>
                  <input
                    type="tel"
                    id="participant2Phone"
                    name="participant2Phone"
                    value={formData.participant2Phone}
                    onChange={handleChange}
                    placeholder="+91XXXXXXXXXX"
                  />
                  {errors.participant2Phone && <span className="error-text">{errors.participant2Phone}</span>}
                </div>
              )}

              {/* Participant 3 */}
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

              {formData.participant3Name && (
                <div className="form-group">
                  <label htmlFor="participant3Phone">Participant 3 Phone Number</label>
                  <input
                    type="tel"
                    id="participant3Phone"
                    name="participant3Phone"
                    value={formData.participant3Phone}
                    onChange={handleChange}
                    placeholder="+91XXXXXXXXXX"
                  />
                  {errors.participant3Phone && <span className="error-text">{errors.participant3Phone}</span>}
                </div>
              )}

              {/* Payment Section */}
              <div className="payment-section">
                <h3>Registration Fee Payment</h3>
                <p className="payment-info">Registration fee: ₹500 per team</p>
                
                <button 
                  type="button" 
                  className="show-qr-button"
                  onClick={() => setShowPaymentQR(!showPaymentQR)}
                >
                  {showPaymentQR ? 'Hide QR Code' : 'Show Payment QR Code'}
                </button>

                {showPaymentQR && (
                  <div className="qr-code-container">
                    <img 
                      src="/images/payment-qr.png" 
                      alt="Payment QR Code" 
                      className="payment-qr"
                    />
                    <p className="qr-instruction">Scan this QR code to make payment</p>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="transactionId">Transaction ID / UTR Number</label>
                  <input
                    type="text"
                    id="transactionId"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleChange}
                    placeholder="Enter transaction ID"
                    required
                  />
                  {errors.transactionId && <span className="error-text">{errors.transactionId}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="paymentProof">Upload Payment Screenshot</label>
                  <input
                    type="file"
                    id="paymentProof"
                    name="paymentProof"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                  {errors.paymentProof && <span className="error-text">{errors.paymentProof}</span>}
                  
                  {previewUrl && (
                    <div className="image-preview">
                      <img src={previewUrl} alt="Payment proof preview" />
                    </div>
                  )}
                </div>
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