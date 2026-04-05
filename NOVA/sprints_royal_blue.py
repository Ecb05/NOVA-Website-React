import codecs

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'
css_append = """

/* ===== SPRINTS / ROADMAPS ROYAL BLUE THEME REDESIGN ===== */

/* 1 & 2. Pure Royal Blue Background, purging all green */
.sprints-page-wrapper {
    background: linear-gradient(135deg, #020A14, #0A3A7A, #041226) !important;
    min-height: 100vh;
    padding-bottom: 80px;
    padding-top: 80px; /* Navbar buffer */
    position: relative;
    z-index: 1; /* Dominates global canvas styles */
}

/* 4. Text Styling */
.sprints-page-wrapper h1,
.sprints-page-wrapper h2,
.sprints-page-wrapper h3 {
    color: #E6EDF3 !important;
    font-weight: 700 !important;
}

.sprints-page-wrapper .highlight {
    color: #60A5FA !important;
    text-shadow: none !important;
    background: transparent !important; /* wipe old gradient webkit rules */
    -webkit-background-clip: unset !important;
    background-clip: unset !important;
}

.sprints-page-wrapper p,
.sprints-page-wrapper .timeline-duration,
.sprints-page-wrapper .hero-content p {
    color: #9CA3AF !important;
}

/* 5. Cards (Timeline Content blocks) */
.sprints-page-wrapper .timeline-content {
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 12px !important;
    padding: 25px !important;
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2) !important;
}

.sprints-page-wrapper .timeline-item:hover .timeline-content {
    border-color: #3B82F6 !important;
    transform: translateY(-3px) !important;
    /* Soft enhanced shadow on hover mapping to blue */
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.15) !important; 
}

/* 3. Buttons (Resource Links) */
.sprints-page-wrapper .resource-link {
    background: linear-gradient(135deg, #3B82F6, #60A5FA) !important;
    color: #FFFFFF !important;
    border: none !important;
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.4) !important;
    transition: all 0.3s ease !important;
    border-radius: 8px !important;
    font-weight: 600 !important;
    padding: 10px 20px !important; /* Ensure it looks like a premium button */
    display: inline-flex !important;
    align-items: center !important;
    gap: 10px !important;
    text-decoration: none !important;
}

.sprints-page-wrapper .resource-link:hover {
    background: linear-gradient(135deg, #60A5FA, #93C5FD) !important;
    box-shadow: 0 0 15px rgba(96, 165, 250, 0.6) !important;
    transform: translateY(-2px) !important;
    color: #ffffff !important;
}

/* 6. Timeline Line & Nodes */
.sprints-page-wrapper .roadmap-timeline::before {
    background: #3B82F6 !important;
    box-shadow: 0 0 8px rgba(59, 130, 246, 0.5) !important; /* Soft glow along entire spine */
}

.sprints-page-wrapper .timeline-marker {
    background: #020A14 !important; /* Clean dark center matching gradient edge */
    color: #E6EDF3 !important;
    border: 3px solid #3B82F6 !important;
    box-shadow: 0 0 12px rgba(59, 130, 246, 0.6) !important;
    transition: all 0.3s ease !important;
}

/* Flash nodes brilliantly on interaction */
.sprints-page-wrapper .timeline-item:hover .timeline-marker {
    background: #3B82F6 !important;
    color: #FFFFFF !important;
    box-shadow: 0 0 15px rgba(96, 165, 250, 0.8) !important;
}

/* Strip global FontAwesome fallbacks explicitly, replacing all green/teal icons with correct blue mapping */
.sprints-page-wrapper i {
    color: #60A5FA !important;
    text-shadow: none !important;
}

.sprints-page-wrapper .resource-link i {
    color: #FFFFFF !important; /* Force icons inside blue buttons specifically back to white */
}

/* Reset the underline global teal color explicitly for Roadmaps */
.sprints-page-wrapper .underline {
    background: #3B82F6 !important;
    box-shadow: 0 0 8px rgba(59, 130, 246, 0.5) !important;
}
"""

with codecs.open(filepath, 'a', encoding='utf-8') as f:
    f.write(css_append)

print("Royal Blue Roadmap structural adjustments explicitly injected.")
