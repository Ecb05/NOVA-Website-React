import codecs

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'

css_append = """

/* ===== Fix FontAwesome White-out Invisibility ===== */
/* Restores glyph visibility against the newly assigned #ffffff solid card backgrounds */
.mission-icon i,
.vision-icon i,
.team-icon i,
.feature-icon i,
.icon i {
    color: var(--primary-color) !important;
    text-shadow: none !important;
}

/* Ensure the wrapper icons remain properly centered if the Flex alignment broke */
.mission-icon, .vision-icon {
    display: flex;
    align-items: center;
    justify-content: center;
}
"""

with codecs.open(filepath, 'a', encoding='utf-8') as f:
    f.write(css_append)

print("FontAwesome contrast overrides appended.")
