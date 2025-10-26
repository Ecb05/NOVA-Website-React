import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dateDay: '',
    dateMonth: '',
    location: '',
    time: '',
    registrationLink: '',
    icon: 'fas fa-bullhorn'
  });

  // Check if already authenticated
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
     
       setIsAuthenticated(true);
       loadAnnouncements();
    }
  }, []);


  const authenticate = async () => {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success && data.token) {
        // Store the JWT token
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        setPassword(''); // Clear password from state
        loadAnnouncements();
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      alert('Authentication failed. Please try again.');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminToken');
    setUsername('');
    setPassword('');
  };

  // Load announcements
  const loadAnnouncements = async () => {
    try {
      const response = await fetch('/api/announcements');
      const data = await response.json();
      setAnnouncements(data.announcements || []);
    } catch (error) {
      console.error('Error loading announcements:', error);
      setAnnouncements([]);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new announcement
  const addAnnouncement = async () => {
    try {
      // Validate required fields
      if (!formData.title || !formData.description) {
        alert('Title and description are required!');
        return;
      }

      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        alert('Not authenticated. Please login again.');
        setIsAuthenticated(false);
        return;
      }

      const response = await fetch('/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert('Announcement added successfully!');
        setShowForm(false);
        resetForm();
        loadAnnouncements();
      } else {
        // Check if it's an auth error
        if (response.status === 401) {
          alert('Session expired. Please login again.');
          logout();
        } else {
          alert('Error adding announcement: ' + (data.error || data.message || 'Unknown error'));
        }
      }
    } catch (error) {
      console.error('Error adding announcement:', error);
      alert('Error adding announcement');
    }
  };

  // Delete announcement
  const deleteAnnouncement = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        const token = localStorage.getItem('adminToken');
        
        if (!token) {
          alert('Not authenticated. Please login again.');
          setIsAuthenticated(false);
          return;
        }

        const response = await fetch(`/api/announcements/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          alert('Announcement deleted!');
          loadAnnouncements();
        } else {
          // Check if it's an auth error
          if (response.status === 401) {
            alert('Session expired. Please login again.');
            logout();
          } else {
            alert('Error deleting announcement');
          }
        }
      } catch (error) {
        console.error('Error deleting announcement:', error);
        alert('Error deleting announcement');
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      dateDay: '',
      dateMonth: '',
      location: '',
      time: '',
      registrationLink: '',
      icon: 'fas fa-bullhorn'
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
          type="text" 
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && document.getElementById('password-input').focus()}
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '1rem'
          }}
        />
        <input 
          id="password-input"
          type="password" 
          placeholder="Password"
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
          padding: '2rem',
          backgroundColor: 'rgba(30, 30, 30, 0.8)',
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Add New Announcement</h2>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            <input
              type="text"
              name="title"
              placeholder="Title *"
              value={formData.title}
              onChange={handleInputChange}
              style={{
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
            
            <textarea
              name="description"
              placeholder="Description *"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              style={{
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            />
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input
                type="text"
                name="dateDay"
                placeholder="Day (e.g., 15)"
                value={formData.dateDay}
                onChange={handleInputChange}
                style={{
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              />
              
              <input
                type="text"
                name="dateMonth"
                placeholder="Month (e.g., JAN)"
                value={formData.dateMonth}
                onChange={handleInputChange}
                style={{
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleInputChange}
              style={{
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
            
            <input
              type="text"
              name="time"
              placeholder="Time"
              value={formData.time}
              onChange={handleInputChange}
              style={{
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
            
            <input
              type="text"
              name="registrationLink"
              placeholder="Registration Link"
              value={formData.registrationLink}
              onChange={handleInputChange}
              style={{
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
            
            <input
              type="text"
              name="icon"
              placeholder="FontAwesome Icon Class (e.g., fas fa-bullhorn)"
              value={formData.icon}
              onChange={handleInputChange}
              style={{
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
            
            <button
              onClick={addAnnouncement}
              style={{
                padding: '0.75rem',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Add Announcement
            </button>
          </div>
        </div>
      )}

      {/* Announcements List */}
      <div>
        <h2 style={{ marginBottom: '1.5rem' }}>Current Announcements ({announcements.length})</h2>
        
        {announcements.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>No announcements yet.</p>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                style={{
                  padding: '1.5rem',
                  backgroundColor: 'rgba(30, 30, 30, 0.8)',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start'
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>{announcement.title}</h3>
                  <p style={{ marginBottom: '0.5rem', color: '#ccc' }}>{announcement.description}</p>
                  <div style={{ fontSize: '0.9rem', color: '#999' }}>
                    {announcement.dateDay && announcement.dateMonth && (
                      <span>📅 {announcement.dateDay} {announcement.dateMonth} | </span>
                    )}
                    {announcement.time && <span>🕐 {announcement.time} | </span>}
                    {announcement.location && <span>📍 {announcement.location}</span>}
                  </div>
                </div>
                
                <button
                  onClick={() => deleteAnnouncement(announcement.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginLeft: '1rem'
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;