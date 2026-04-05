import codecs

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'
css_append = """

/* ===== SPRINTS PAGE ANIMATION ====== */
.sprints-page-wrapper, .roadmaps-hero {
    background-size: 300% 300% !important;
    animation: smoothMove 12s ease infinite !important;
}
"""

with codecs.open(filepath, 'a', encoding='utf-8') as f:
    f.write(css_append)

print("Sprints Royal Blue gradient animation strictly enforced.")
