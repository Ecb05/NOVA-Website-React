import codecs

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'

with codecs.open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add position: relative to page wrappers and set overflow hidden
containment_pages_css = """
/* Particles Containment for Pages */
.announcements-page-wrapper, .sprints-page-wrapper, .register-page {
    position: relative !important;
    overflow: hidden !important;
}

/* Ensure page content is above particles */
.announcements-page-wrapper > *:not(.particles-container),
.sprints-page-wrapper > *:not(.particles-container),
/* Note: register-page is a section itself in its JSX, but the wrapper logic applies */
.register-page > *:not(.particles-container) {
    position: relative !important;
    z-index: 2 !important;
}

/* Ensure Hero banner in Sprints also contains particles if needed, 
   redundancy for full-width bleed if particles are added there too */
.roadmaps-hero {
    position: relative !important;
}
"""

with codecs.open(filepath, 'a', encoding='utf-8') as f:
    f.write(containment_pages_css)

print("Page containment CSS added.")
