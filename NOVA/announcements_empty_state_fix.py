import codecs

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'
css_append = """

/* Announcements Empty State Alignment */
.announcements-page .empty-state {
    text-align: center !important;
    padding: 3rem !important;
    width: 100% !important;
}

.announcements-page .empty-state h3 {
    margin-bottom: 15px !important;
}

.announcements-page .empty-state p {
    color: #9CA3AF !important;
}
"""

with codecs.open(filepath, 'a', encoding='utf-8') as f:
    f.write(css_append)

print("Announcements empty-state CSS added.")
