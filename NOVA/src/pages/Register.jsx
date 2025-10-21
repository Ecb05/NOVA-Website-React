import React, { useState, useEffect } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollno: '',
    email: '',
    phone: '',
    year: '',
    interests: [],
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    // Initialize AOS if you're using it in your project
    if (window.AOS) {
      window.AOS.init({
        duration: 1000,
        once: true
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter(interest => interest !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/clubregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          rollno: '',
          email: '',
          phone: '',
          year: '',
          interests: [],
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="register-page">
      <div className="register-container">
        <div className="register-content" data-aos="fade-right">
          <h3>Become a Member</h3>
          <p>
            Join our community of tech enthusiasts and get access to exclusive events, 
            workshops, and networking opportunities.
          </p>

          <div className="benefits-image">
            <img 
              src="https://img.freepik.com/free-vector/team-goals-concept-illustration_114360-5176.jpg" 
              alt="NOVA Benefits"
            />
          </div>

          <ul className="benefits-list">
            <li>
              <i className="fas fa-check-circle"></i> 
              Access to all NOVA events and workshops
            </li>
            <li>
              <i className="fas fa-check-circle"></i> 
              Networking opportunities with industry professionals
            </li>
            <li>
              <i className="fas fa-check-circle"></i> 
              Hands-on experience with cutting-edge technologies
            </li>
            <li>
              <i className="fas fa-check-circle"></i> 
              Mentorship from senior members and alumni
            </li>
            <li>
              <i className="fas fa-check-circle"></i> 
              Opportunity to work on real-world projects
            </li>
          </ul>
        </div>

        <div className="register-form" data-aos="fade-left">
          <div className="form-header">
            <img 
              src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-125.jpg" 
              alt="Register" 
              className="form-image"
            />
            <h3>Registration Form</h3>
          </div>

          <form id="membership-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="rollno">Roll Number</label>
              <input
                type="text"
                id="rollno"
                name="rollno"
                value={formData.rollno}
                onChange={handleInputChange}
                placeholder="e.g., 21B81A05J7"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91XXXXXXXXXX"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="year">Year of Study</label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>

            <div className="form-group">
              <label>Areas of Interest</label>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="interests"
                    value="web"
                    checked={formData.interests.includes('web')}
                    onChange={handleCheckboxChange}
                  />
                  Web Development
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="interests"
                    value="app"
                    checked={formData.interests.includes('app')}
                    onChange={handleCheckboxChange}
                  />
                  App Development
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="interests"
                    value="ai"
                    checked={formData.interests.includes('ai')}
                    onChange={handleCheckboxChange}
                  />
                  AI & Machine Learning
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="interests"
                    value="cybersecurity"
                    checked={formData.interests.includes('cybersecurity')}
                    onChange={handleCheckboxChange}
                  />
                  Cybersecurity
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="interests"
                    value="blockchain"
                    checked={formData.interests.includes('blockchain')}
                    onChange={handleCheckboxChange}
                  />
                  Blockchain
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="interests"
                    value="iot"
                    checked={formData.interests.includes('iot')}
                    onChange={handleCheckboxChange}
                  />
                  IoT
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Why do you want to join NOVA?</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>

            {submitStatus === 'success' && (
              <div className="alert alert-success">
                Application submitted successfully! We'll get back to you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="alert alert-error">
                Something went wrong. Please try again later.
              </div>
            )}

            <button 
              type="submit" 
              className="btn primary-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;