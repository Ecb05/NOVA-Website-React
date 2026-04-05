import codecs

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'
css_append = """

/* ===== SPRINTS HERO TYPOGRAPHY INCREASE ===== */
.roadmaps-hero .hero-content .typing-text {
    font-size: clamp(3rem, 7vw, 5rem) !important;
    line-height: 1.2 !important;
}

.roadmaps-hero .hero-content h2 {
    font-size: clamp(1.8rem, 4vw, 2.5rem) !important;
    margin-top: 20px !important;
    margin-bottom: 20px !important;
}

.roadmaps-hero .hero-content p {
    font-size: clamp(1.2rem, 2.5vw, 1.5rem) !important;
    max-width: 900px !important;
    margin: 0 auto !important;
    line-height: 1.6 !important;
}
"""

with codecs.open(filepath, 'a', encoding='utf-8') as f:
    f.write(css_append)

print("Sprints Hero typography successfully scaled up.")
