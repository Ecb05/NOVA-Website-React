import codecs

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'

# The missing classes that the replace file content tool accidentally deleted
missing_css = """
.register-page {
    background: linear-gradient(135deg, #1A0410, #5F0A3A, #26061A) !important;
    min-height: 100vh;
}

.announcements-page-wrapper {
    background: linear-gradient(135deg, rgba(20, 10, 2, 0.85), rgba(122, 46, 5, 0.85), rgba(42, 18, 4, 0.85)) !important;
    min-height: 100vh;
}

.announcements-page-wrapper .highlight {
    color: #FF7A18 !important;
}
"""

with codecs.open(filepath, 'a', encoding='utf-8') as f:
    f.write(missing_css)

print("Safely appended missing UI rules to the bottom of App.css.")
