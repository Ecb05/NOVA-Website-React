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
                
                {/* WhatsApp Community Section */}
                <div className="whatsapp-community">
                  <div className="whatsapp-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <p>Join our WhatsApp community for updates and announcements</p>
                  <a 
                    href="YOUR_WHATSAPP_COMMUNITY_LINK" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="whatsapp-join-btn"
                  >
                    Join Community
                  </a>
                </div>

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
                  placeholder='MVSREC email...'
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
                <p className="payment-info">Registration fee: ₹99 per team</p>
                
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