import React, { useState, useEffect } from 'react';

const TeamSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterButtons = [
    { key: 'all', label: 'All' },
    { key: 'spa', label: 'SPA' },
    { key: 'technical', label: 'Technical' },
    { key: 'photography', label: 'Photography' },
    { key: 'content', label: 'Content Creation' },
    { key: 'designing', label: 'Editing' },
    { key: 'marketing', label: 'Marketing' },
    { key: 'resources', label: 'Human Resources' },
    { key: 'treasurer', label: 'Treasurer & Logistics' },
    { key: 'socialmedia', label: 'Social Media Management' }
  ];

  // This should match your original teamMembers array structure
 const teamMembers = [
    // Executive Board Members
    {
        name: 'Shriya',
        role: 'Operations Lead',
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
        category: 'all',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Shruthi',
        role: 'Human resources Lead',
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
        category: 'resources',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Archita',
        role: 'Content Writer Lead',
        image: 'https://randomuser.me/api/portraits/women/3.jpg',
        category: 'content',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Sana',
        role: 'Strategies and Planning Lead',
        image: 'https://randomuser.me/api/portraits/women/4.jpg',
        category: 'spa',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Eshank',
        role: 'Technical Lead',
        image: 'https://randomuser.me/api/portraits/men/5.jpg',
        category: 'technical',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Hetal',
        role: 'Marketing Lead',
        image: 'https://randomuser.me/api/portraits/women/6.jpg',
        category: 'marketing',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Zayed Ali',
        role: 'Graphic Designing and Editing Lead',
        image: 'https://randomuser.me/api/portraits/men/9.jpg',
        category: 'designing',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Varshitha',
        role: 'Content Creation Lead',
        image: 'https://randomuser.me/api/portraits/women/8.jpg',
        category: 'socialmedia',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Shivani',
        role: 'Photography Lead',
        image: 'https://randomuser.me/api/portraits/women/7.jpg',
        category: 'photography',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Lalasa',
        role: 'SPA Co-Lead',
        image: 'https://randomuser.me/api/portraits/women/10.jpg',
        category: 'spa',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Zeeshan',
        role: 'Technical Co-Lead',
        image: 'https://randomuser.me/api/portraits/men/11.jpg',
        category: 'technical',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Ashmitha',
        role: 'Treasurer & Logistics Lead',
        image: 'https://randomuser.me/api/portraits/men/11.jpg',
        category: 'treasurer',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    
    // Coordinators
    {
        name: 'Haritha',
        role: 'Technical Coordinator',
        image: 'https://randomuser.me/api/portraits/women/12.jpg',
        category: 'technical',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Gayatri',
        role: 'Technical Coordinator',
        image: 'https://randomuser.me/api/portraits/women/13.jpg',
        category: 'technical',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Jahnavi',
        role: 'SPA Coordinator',
        image: 'https://randomuser.me/api/portraits/women/14.jpg',
        category: 'spa',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Nayan',
        role: 'SPA Coordinator',
        image: 'https://randomuser.me/api/portraits/men/17.jpg',
        category: 'spa',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Annanya',
        role: 'Photography Coordinator',
        image: 'https://randomuser.me/api/portraits/women/20.jpg',
        category: 'photography',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Rithika',
        role: 'Photography Coordinator',
        image: 'https://randomuser.me/api/portraits/women/23.jpg',
        category: 'photography',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Pradyumna',
        role: 'Photography Coordinator',
        image: 'https://randomuser.me/api/portraits/women/23.jpg',
        category: 'photography',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Linda',
        role: 'Content creation Coordinator',
        image: 'https://randomuser.me/api/portraits/women/16.jpg',
        category: 'content',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Yukti',
        role: 'Social media management Coordinator',
        image: 'https://randomuser.me/api/portraits/women/15.jpg',
        category: 'socialmedia',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Abhishek',
        role: 'Social media management Coordinator',
        image: 'https://randomuser.me/api/portraits/men/19.jpg',
        category: 'socialmedia',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Bhavya',
        role: 'Human Resources Coordinator',
        image: 'https://randomuser.me/api/portraits/women/21.jpg',
        category: 'resources',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Saketh',
        role: 'Logistics Coordinator',
        image: 'https://randomuser.me/api/portraits/women/21.jpg',
        category: 'treasurer',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Taiseen',
        role: 'Content creation Coordinator',
        image: 'https://randomuser.me/api/portraits/women/21.jpg',
        category: 'content',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Harshitha',
        role: 'Logistics Coordinator',
        image: 'https://randomuser.me/api/portraits/women/22.jpg',
        category: 'treasurer',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Akhilesh',
        role: 'Logistics Coordinator',
        image: 'https://randomuser.me/api/portraits/men/24.jpg',
        category: 'treasurer',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Sanjana',
        role: 'Marketing Coordinator',
        image: 'https://randomuser.me/api/portraits/women/25.jpg',
        category: 'marketing',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Yashaswini',
        role: 'Marketing Coordinator',
        image: 'https://randomuser.me/api/portraits/women/25.jpg',
        category: 'marketing',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Nikhil',
        role: 'Editing Coordinator',
        image: 'https://randomuser.me/api/portraits/women/25.jpg',
        category: 'designing',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Srinija',
        role: 'Editing Coordinator',
        image: 'https://randomuser.me/api/portraits/women/25.jpg',
        category: 'designing',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    }
];
  const handleFilterClick = (filterKey) => {
    setActiveFilter(filterKey);
  };

  // Filter team members based on active filter (matches your original logic)
  const filteredMembers = activeFilter === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.category === activeFilter);

  // Reinitialize AOS when filtered members change
  useEffect(() => {
    if (window.AOS) {
      window.AOS.refresh();
    }
  }, [activeFilter]);

  return (
    <section id="team" className="team">
      <div className="section-header" data-aos="fade-up">
        <h2>Meet Our <span className="highlight">Team</span></h2>
        <div className="underline"></div>
      </div>
      
      <div className="team-filters">
        {filterButtons.map((filter) => (
          <button
            key={filter.key}
            className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
            data-filter={filter.key}
            onClick={() => handleFilterClick(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      
      <div className="team-container">
        <div className="team-members-wrapper">
          {filteredMembers.map((member, index) => (
            <div 
              key={member.id}
              className="team-member"
              data-aos="fade-up"
              data-aos-delay={(index % 4) * 100}
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