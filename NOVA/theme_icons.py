import codecs

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'

css_append = """

/* ===== Section-Specific Icon Colors ===== */
/* Overriding the global Teal fallback with theme-appropriate vibrant hexes */
.vision-icon i {
    color: #e53e3e !important; /* Vibrant Red */
}

.mission-icon i {
    color: #d4af37 !important; /* Gold */
}

.team-icon i,
.team-member .icon i {
    color: #00A8A8 !important; /* Teal */
}

.feature-icon i,
.about-icon i {
    color: #9f7aea !important; /* Purple/Indigo */
}
"""

with codecs.open(filepath, 'a', encoding='utf-8') as f:
    f.write(css_append)

print("Section-specific icon themes appended.")
