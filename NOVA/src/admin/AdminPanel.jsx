import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'fas fa-calendar-alt',
    date: {
      day: '',
      month: ''
    },
    details: {
      location: '',
      time: ''
    },
    registrationLink: '',
    isActive: true
  });

  // Check if already authenticated
  useEffect(() => {
    const authenticated = localStorage.getItem('adminAuth');
    if (authenticated === 'true') {
      setIsAuthenticated(true);
      loadAnnouncements();
    }
  }, []);

  const authenticate = () => {
    if (password === 'nova-admin-2025') { // Change this password!
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      loadAnnouncements();
    } else {
      alert('Incorrect password');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  // Load announcements
const loadAnnouncements = async () => {
  try {
    const response = await fetch('/api/announcements');
    const data = await response.json();
    setAnnouncements(data.announcements || []); // Access the announcements array
  } catch (error) {
    console.error('Error loading announcements:', error);
    setAnnouncements([]); // Set empty array on error
  }
};

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  // Add new announcement
  const addAnnouncement = async () => {
    try {
      const newAnnouncement = {
        ...formData,
        id: Date.now()
      };

      const response = await fetch('/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAnnouncement)
      });

      if (response.ok) {
        alert('Announcement added successfully!');
        setShowForm(false);
        resetForm();
        loadAnnouncements();
      } else {
        alert('Error adding announcement');
      }
    } catch (error) {
      console.error('Error adding announcement:', error);
      alert('Error adding announcement');
    }
  };

  // Delete announcement
  const deleteAnnouncement = async (id) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      try {
        const response = await fetch(`/api/announcements/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          alert('Announcement deleted!');
          loadAnnouncements();
        }
      } catch (error) {
        console.error('Error deleting announcement:', error);
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: 'fas fa-calendar-alt',
      date: { day: '', month: '' },
      details: { location: '', time: '' },
      registrationLink: '',
      isActive: true
    });
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div style={{ 
        maxWidth: '400px', 
        margin: '100px auto', 
        padding: '2rem', 
        border: '1px solid #ddd', 
        borderRadius: '8px',
        backgroundColor: '#f8f9fa'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Admin Login</h2>
        <input 
          type="password" 
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && authenticate()}
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '1rem'
          }}
        />
        <button 
          onClick={authenticate}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#8a2be2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: 'rgba(30, 30, 30, 0.9)',
        borderRadius: '8px'
      }}>
        <h1 style={{ margin: 0 }}>NOVA Admin Panel</h1>
        <div>
          <button 
            onClick={() => setShowForm(!showForm)}
            style={{
              marginRight: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#4169e1',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {showForm ? 'Cancel' : 'Add Announcement'}
          </button>
          <button 
            onClick={logout}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Add Announcement Form */}
      {showForm && (
        <div style={{
          backgroundColor: 'rgba(30, 30, 30, 0.9)',
          padding: '2rem',
          borderRadius: '8px',
          border: '1px solid #ddd',
          marginBottom: '2rem'
        }}>
          <h3>Add New Announcement</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Date (Day):</label>
              <input
                type="text"
                name="date.day"
                value={formData.date.day}
                onChange={handleInputChange}
                placeholder="25th"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Date (Month):</label>
              <input
                type="text"
                name="date.month"
                value={formData.date.month}
                onChange={handleInputChange}
                placeholder="JUNE"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Location:</label>
              <input
                type="text"
                name="details.location"
                value={formData.details.location}
                onChange={handleInputChange}
                placeholder="Virtual Meeting"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Time:</label>
              <input
                type="text"
                name="details.time"
                value={formData.details.time}
                onChange={handleInputChange}
                placeholder="7:00 PM - 9:00 PM"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Registration Link:</label>
            <input
              type="url"
              name="registrationLink"
              value={formData.registrationLink}
              onChange={handleInputChange}
              placeholder="https://forms.google.com/..."
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Icon (FontAwesome class):</label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleInputChange}
              placeholder="fas fa-calendar-alt"
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                style={{ marginRight: '0.5rem' }}
              />
              Active (visible to users)
            </label>
          </div>

          <button 
            onClick={addAnnouncement}
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '1rem'
            }}
          >
            Add Announcement
          </button>
          <button 
            onClick={() => { setShowForm(false); resetForm(); }}
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Existing Announcements */}
      <div>
        <h3>Existing Announcements ({announcements.length})</h3>
        {announcements.map(announcement => (
          <div 
            key={announcement.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '1rem',
              backgroundColor: announcement.isActive ? 'rgba(30, 30, 30, 0.9)' : 'rgba(30, 30, 30, 0.9)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>{announcement.title}</h4>
                <p style={{ margin: '0 0 0.5rem 0', color: '#666' }}>{announcement.description}</p>
                <p style={{ margin: '0 0 0.25rem 0' }}><strong>Date:</strong> {announcement.date.day} {announcement.date.month}</p>
                <p style={{ margin: '0 0 0.25rem 0' }}><strong>Location:</strong> {announcement.details.location}</p>
                <p style={{ margin: '0 0 0.25rem 0' }}><strong>Time:</strong> {announcement.details.time}</p>
                <p style={{ margin: '0', color: announcement.isActive ? '#28a745' : '#dc3545' }}>
                  <strong>Status:</strong> {announcement.isActive ? 'Active' : 'Inactive'}
                </p>
              </div>
              <div>
                <button 
                  onClick={() => deleteAnnouncement(announcement.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;