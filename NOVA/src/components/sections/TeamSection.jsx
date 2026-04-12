import React, { useState, useEffect } from 'react';


const TeamSection = () => {
    // Executive Board Members only, as requested
    const executiveBoard = [
        {
            name: 'Eshank',
            role: 'President',
            image: '/images/hero/eshank.jpeg',
        },
        {
            name: 'Sana',
            role: 'Strategies & Planning Lead',
            image: '/images/hero/sana.jpeg',
        },
        {
            name: 'Shruthi',
            role: 'Human Resources Lead',
            image: '/images/hero/shruti.jpeg',
        },
        {
            name: 'Archita',
            role: 'Content Writer Lead',
            image: '/images/hero/archita.jpeg',
        },
        {
            name: 'Varshitha',
            role: 'Social Media Management Lead',
            image: '/images/hero/varshitha.jpeg',
        },
        {
            name: 'Hetal',
            role: 'Marketing Lead',
            image: '/images/hero/hetal.jpeg',
        },
        {
            name: 'Zayed Ali',
            role: 'Graphic Design Lead',
            image: '/images/hero/zayed.jpeg',
        },
        {
            name: 'Shivani',
            role: 'Photography Lead',
            image: '/images/hero/shivani.jpeg',
        },
        {
            name: 'Lalasa',
            role: 'SPA Co-Lead',
            image: '/images/hero/lalasa.jpeg',
        },
        {
            name: 'Ashmitha',
            role: 'Treasurer & Logistics Lead',
            image: '/images/hero/ashmita.jpeg',
        }
    ];

    useEffect(() => {
        if (window.AOS) {
            window.AOS.refresh();
        }
    }, []);

    return (
        <section id="team" className="team">
            <div className="section-header">
                <h2>Our <span className="highlight">Executive Board</span></h2>
                <div className="underline"></div>
            </div>

            <div className="team-container">
                <div className="team-members-wrapper">
                    {executiveBoard.map((member, index) => (
                        <div
                            key={`${member.name}-${index}`}
                            className="team-member"
                        >
                            <div className="member-image">
                                <img src={member.image} alt={member.name} />
                            </div>
                            <div className="member-info">
                                <h3>{member.name}</h3>
                                <p className="role">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;