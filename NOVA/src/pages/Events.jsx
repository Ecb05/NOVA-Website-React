import React, { useState, useEffect } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_URL

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load events on component mount
    useEffect(() => {
        loadEvents();
    }, []);

    // Function to load events from API
    const loadEvents = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/announcements`);
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            const data = await response.json();
            // Access the announcements array from the object
            const eventsArray = data.announcements || [];
            setEvents(eventsArray);
        } catch (error) {
            console.error('Error loading events:', error);
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-container" style={{ textAlign: 'center', padding: '2rem' }}>
                <div className="loading-spinner">Loading events...</div>
            </div>
        );
    }

    return (
        <>
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1 data-aos="fade-up">
                        Latest <span className="highlight">Events</span>
                    </h1>
                    <div className="underline" data-aos="fade-up" data-aos-delay="100"></div>
                    <p data-aos="fade-up" data-aos-delay="200">
                        Stay updated with all the latest news, events, and opportunities from NOVA
                    </p>
                </div>
            </section>

            {/* Events Section */}
            <section className="announcements-page">
                <div className="announcements-container">
                    {events.length > 0 ? (
                        events.map((eventItem, index) => (
                            <div
                                key={eventItem.id}
                                className="announcement-card"
                                data-aos="flip-left"
                                data-aos-delay={(index + 1) * 100}
                            >
                                <div className="announcement-icon">
                                    <i className={eventItem.icon}></i>
                                </div>
                                <div className="announcement-date">
                                    <span className="day">{eventItem.date.day}</span>
                                    <span className="month">{eventItem.date.month}</span>
                                </div>
                                <h3 className="head">{eventItem.title}</h3>
                                <p>{eventItem.description}</p>
                                <div className="event-details">
                                    <p>
                                        <i className="fas fa-map-marker-alt"></i> {eventItem.details.location}
                                    </p>
                                    <p>
                                        <i className="fas fa-clock"></i> {eventItem.details.time}
                                    </p>
                                </div>

                                {eventItem.registrationLink && (
                                    <a
                                        href={eventItem.registrationLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="read-more"
                                    >
                                        Register Now <i className="fas fa-arrow-right"></i>
                                    </a>
                                )}
                            </div>
                        ))
                    ) : (
                        <div style={{
                            textAlign: 'center',
                            padding: '3rem',
                            gridColumn: '1 / -1',
                            color: 'var(--gray-text)'
                        }}>
                            <h3>No events available</h3>
                            <p>Check back later for updates!</p>
                        </div>
                    )}
                </div>

                {/* Pagination - Uncomment when you have more events */}
                {/* <div className="pagination" data-aos="fade-up">
          <a href="#" className="active">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#" className="next">Next <i className="fas fa-chevron-right"></i></a>
        </div> */}
            </section>
        </>
    );
};

export default EventsPage;
