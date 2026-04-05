import codecs

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'
css_append = """

/* ===== SPRINTS HERO FULL-WIDTH BLEED EXPLICIT OVERRIDE ===== */
.roadmaps-hero {
    /* Break out of any parent max-width wrappers to achieve true infinite full-width */
    width: 100vw !important;
    max-width: 100vw !important;
    margin-left: calc(50% - 50vw) !important;
    margin-right: calc(50% - 50vw) !important;
    border-radius: 0 !important; /* Ensure edges match monitor perfectly */
    border-left: none !important;
    border-right: none !important;
}

/* Ensure parents don't clip the bleed bounds */
.sprints-page-wrapper, main {
    overflow-x: hidden !important;
}
"""

with codecs.open(filepath, 'a', encoding='utf-8') as f:
    f.write(css_append)

print("Sprints hero edge-to-edge viewport stretch enabled.")
