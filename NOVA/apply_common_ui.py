import codecs

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'

css_append = """
/* Uniform Global Card UI based on user rule */
.vision-card, .mission-card, .team-member, .roadmaps-card, .announcement-card, .winner-card, .card {
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    transition: all 0.3s ease;
}

.vision-card:hover, .mission-card:hover, .team-member:hover, .roadmaps-card:hover, .announcement-card:hover, .winner-card:hover, .card:hover {
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.1) !important;
    transform: translateY(-5px);
}
"""

with codecs.open(filepath, 'a', encoding='utf-8') as f:
    f.write(css_append)

print("Global Common UI appended successfully.")
