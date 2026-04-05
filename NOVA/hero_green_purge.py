import codecs

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'

css_append = """

/* ===== ROADMAPS HERO GREEN PURGE & ROYAL BLUE OVERRIDE ===== */

/* 1 & 2. Pure Royal Blue Background for Hero */
.roadmaps-hero {
    background: linear-gradient(135deg, #020A14, #0A3A7A, #041226) !important;
    position: relative !important;
    z-index: 2 !important;
    overflow: hidden !important;
    /* Blend smoothly with the timeline layer via a soft translucent blue border */
    border-bottom: 1px solid rgba(59, 130, 246, 0.1) !important;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5) !important;
}

/* 3 & 4. Purge the old green ::after orb and replace with royal blue blend */
.roadmaps-hero::after {
    content: '' !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    background: rgba(2, 10, 20, 0.6) !important; /* Overlay darkening requirement */
    z-index: 0 !important;
    filter: none !important;
    transform: none !important;
}

/* Apply the requested blue glowing orb explicitly removing the green */
.roadmaps-hero::before {
    content: '' !important;
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    width: 1000px !important;
    height: 1000px !important;
    /* Soft blue particle glow */
    background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 60%) !important;
    z-index: 1 !important;
    filter: blur(80px) !important;
}

/* 5. Heading styles */
.roadmaps-hero .hero-content h1,
.roadmaps-hero .hero-content h2,
.roadmaps-hero .typing-text,
.roadmaps-hero .hero-content {
    color: #E6EDF3 !important;
    position: relative !important;
    z-index: 5 !important;
}

/* Highlight word precisely */
.roadmaps-hero .hero-content .highlight {
    color: #60A5FA !important;
    text-shadow: 0 0 15px rgba(96, 165, 250, 0.4) !important;
    background: transparent !important;
    -webkit-background-clip: unset !important;
    background-clip: unset !important;
}

/* 6. Subtext */
.roadmaps-hero .hero-content p {
    color: #9CA3AF !important;
    position: relative !important;
    z-index: 5 !important;
}

/* Defensive CSS: Destroy any rogue green shapes/particles manually injected here */
.roadmaps-hero .shapes,
.roadmaps-hero [class*="shape"],
.roadmaps-hero [class*="orb"] {
    display: none !important; /* Safest to remove unpredictable artifacts entirely */
}
"""

with codecs.open(filepath, 'a', encoding='utf-8') as f:
    f.write(css_append)

print("Sprints Hero banner completely bleached of green artifacts and rebuilt in blue.")
