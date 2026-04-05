import codecs

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'
css_append = """

/* ===== FRESH ANNOUNCEMENTS PAGE OVERHAUL ===== */

.announcements-page-wrapper {
    /* Pure vibrant orange gradient */
    background: linear-gradient(135deg, #140A02, #FF7A18, #A84408, #2A1204) !important;
    min-height: 100vh;
    padding-top: 120px; /* Safely clear the global Navbar */
    padding-bottom: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    /* Apply existing global smoothMove background animation */
    background-size: 300% 300% !important;
    animation: smoothMove 12s ease infinite !important;
}

/* Force pure white contrast over the moving orange background */
.announcements-page-wrapper h1,
.announcements-page-wrapper h2,
.announcements-page-wrapper h3,
.announcements-page-wrapper p {
    color: #ffffff !important;
}

/* Override the old orange highlight so it doesn't get lost in the orange background */
.announcements-page-wrapper .highlight {
    color: #ffffff !important;
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
    font-weight: 900;
}

.announcements-page-wrapper .page-header {
    text-align: center;
    width: 100%;
    margin-bottom: 50px;
}

.announcements-page-wrapper .underline {
    background: #ffffff !important;
    margin: 15px auto 25px auto;
}

/* Style the Empty State container into a premium Native Glass card */
.announcements-page {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px; /* Mobile safety padding */
}

.announcements-page .announcements-container {
    padding: 60px 40px;
    background: rgba(255, 255, 255, 0.08); /* Frosted Glass */
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.announcements-page .announcements-container h3 {
    font-size: clamp(1.8rem, 4vw, 2.5rem) !important;
    font-weight: 800;
    margin-bottom: 15px;
    letter-spacing: 1px;
}

.announcements-page .announcements-container p {
    font-size: clamp(1rem, 2vw, 1.2rem) !important;
    opacity: 0.9;
    margin: 0;
}
"""

with codecs.open(filepath, 'a', encoding='utf-8') as f:
    f.write(css_append)

print("Fresh Announcements architecture logically injected.")
