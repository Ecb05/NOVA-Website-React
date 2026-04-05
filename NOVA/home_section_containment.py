import codecs

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'

with codecs.open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add position: relative to home sections and set overflow hidden
containment_css = """
/* Particles Containment for Home Sections */
.hero, .vision, .mission, .team, .about {
    position: relative !important;
    overflow: hidden !important;
}

/* Ensure content is above particles */
.hero > *:not(.particles-container),
.vision > *:not(.particles-container),
.mission > *:not(.particles-container),
.team > *:not(.particles-container),
.about > *:not(.particles-container) {
    position: relative !important;
    z-index: 2 !important;
}
"""

with codecs.open(filepath, 'a', encoding='utf-8') as f:
    f.write(containment_css)

print("Section containment CSS added.")
