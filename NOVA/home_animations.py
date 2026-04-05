import codecs

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'
css_append = """

/* ===== HOME PAGE WHITE TEXT OVERRIDES ===== */
.hero p, .vision p, .mission p, .team p, .about p,
.hero h1, .vision h1, .mission h1, .team h1, .about h1,
.hero h2, .vision h2, .mission h2, .team h2, .about h2,
.hero h3, .vision h3, .mission h3, .team h3, .about h3 {
    color: #ffffff !important;
}

/* Ensure the typing text stays bold white since we overrode previous */
.typing-text {
    color: #ffffff !important;
}

/* ===== GLOBAL SECTION GRADIENT ANIMATIONS ===== */
@keyframes smoothMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.hero, .vision, .mission, .team, .about {
    background-size: 300% 300% !important;
    animation: smoothMove 12s ease infinite !important;
}

/* ===== SECTION-SPECIFIC ICON SHADOWS ===== */

/* Vision (Red) */
.vision-icon { box-shadow: 0 10px 25px rgba(229, 62, 62, 0.6) !important; }
.vision-card:hover .vision-icon { box-shadow: 0 15px 35px rgba(229, 62, 62, 0.6) !important; }

/* Mission (Gold) */
.mission-icon { box-shadow: 0 10px 25px rgba(212, 175, 55, 0.6) !important; }
.mission-card:hover .mission-icon { box-shadow: 0 15px 35px rgba(212, 175, 55, 0.6) !important; }

/* Team (Teal) */
.team-member .icon { box-shadow: 0 10px 25px rgba(0, 168, 168, 0.6) !important; }
.team-member:hover .icon { box-shadow: 0 15px 35px rgba(0, 168, 168, 0.6) !important; }

/* About/Features (Purple) */
.feature-icon, .about-icon { box-shadow: 0 10px 25px rgba(159, 122, 234, 0.6) !important; }
.card:hover .feature-icon, .about-card:hover .about-icon { box-shadow: 0 15px 35px rgba(159, 122, 234, 0.6) !important; }

"""

with codecs.open(filepath, 'a', encoding='utf-8') as f:
    f.write(css_append)

print("Home animations, typography whitening, and shadow re-coloring appended natively.")
