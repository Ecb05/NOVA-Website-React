import codecs

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'

# I'll replace the existing Announcements block to ensure exact compliance
with codecs.open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

announcement_css = """
/* ===== PURE ORANGE ANNOUNCEMENTS REMASTER ===== */

.announcements-page-wrapper {
    /* 1. Pure vibrant orange gradient */
    background: linear-gradient(135deg, #140A02, #7A2E05, #2A1204) !important;
    min-height: 100vh;
    padding-top: 130px; /* Navbar buffer */
    padding-bottom: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative !important;
    z-index: 1; /* Ensure it stays above global particle background */
    
    /* Animation requirement */
    background-size: 300% 300% !important;
    animation: smoothMove 12s ease infinite !important;
    overflow: hidden;
}

/* 3. Overlay & 4. Particles/Ambient Glow simulation */
.announcements-page-wrapper::after {
    content: '' !important;
    position: absolute !important;
    top: 0 !important; left: 0 !important; width: 100% !important; height: 100% !important;
    background: rgba(20, 10, 2, 0.6) !important;
    z-index: -2 !important;
    pointer-events: none;
}

.announcements-page-wrapper::before {
    content: '' !important;
    position: absolute !important;
    top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important;
    width: 1200px !important; height: 1200px !important;
    /* 4. Orange particle glow */
    background: radial-gradient(circle, rgba(255, 122, 24, 0.25) 0%, transparent 60%) !important;
    z-index: -1 !important;
    filter: blur(80px) !important;
    pointer-events: none;
}

/* 6 & 9. Text Styling - Primary */
.announcements-page-wrapper h1,
.announcements-page-wrapper h2,
.announcements-page-wrapper h3,
.announcements-page-wrapper .typing-text {
    color: #E6EDF3 !important;
    font-weight: 700 !important;
}

/* 9. Secondary Text */
.announcements-page-wrapper p,
.announcements-page-wrapper .announcements-container p {
    color: #9CA3AF !important;
}

/* 7. Highlight / Accents */
.announcements-page-wrapper .highlight {
    color: #FF7A18 !important;
    text-shadow: 0 0 10px rgba(255, 122, 24, 0.3) !important;
    background: transparent !important;
    -webkit-background-clip: unset !important;
    background-clip: unset !important;
}

.announcements-page-wrapper .underline {
    background: #FF7A18 !important;
    box-shadow: 0 0 8px rgba(255, 122, 24, 0.5) !important;
    margin: 15px auto 25px auto;
}

/* 5. Center Box (Announcements Container) */
.announcements-page {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    z-index: 3;
}

.announcements-page .announcements-container {
    padding: 60px 40px;
    background: rgba(255, 255, 255, 0.05) !important; /* 5. Background */
    border: 1px solid rgba(255, 122, 24, 0.2) !important; /* 5. Border */
    box-shadow: 0 0 12px rgba(255, 122, 24, 0.15) !important; /* 5. Glow */
    border-radius: 20px;
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

/* 8. Buttons (Prospective) */
.announcements-page-wrapper .btn,
.announcements-page-wrapper .read-more {
    background: linear-gradient(135deg, #FF7A18, #FFB347) !important;
    color: #FFFFFF !important;
    box-shadow: 0 0 10px rgba(255, 122, 24, 0.4) !important;
    border: none;
    padding: 10px 25px;
    border-radius: 8px;
    font-weight: bold;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 10px;
}

.announcements-page-wrapper .btn:hover,
.announcements-page-wrapper .read-more:hover {
    background: #FFA94D !important; /* 8. Hover */
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(255, 122, 24, 0.6) !important;
    color: #ffffff !important;
}

/* Force icons to match orange theme and kill teal shadow/glow */
.announcements-page-wrapper i {
    color: #FF7A18 !important;
    text-shadow: none !important;
}

.announcements-page-wrapper .read-more i,
.announcements-page-wrapper .btn i {
    color: #FFFFFF !important; /* Icons inside buttons stay white */
}

/* Kill global green artifacts strictly */
.announcements-page-wrapper [class*="shape"],
.announcements-page-wrapper [class*="orb"] {
    display: none !important;
}
"""

# Replace the existing block or append if not found (though it should be there)
import re
new_content = re.sub(r'/\* ===== FRESH ANNOUNCEMENTS PAGE OVERHAUL ===== \*/.*?\}\n\}', announcement_css, content, flags=re.DOTALL)

# Fallback if regex fails (though it shouldn't if the file matches previous reads)
if new_content == content:
    with codecs.open(filepath, 'a', encoding='utf-8') as f:
        f.write(announcement_css)
else:
    with codecs.open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Announcements pure orange theme refinement applied.")
