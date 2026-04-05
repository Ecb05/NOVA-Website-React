import codecs

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'
css_append = """

/* ===== REGISTER PAGE NAVBAR CLEARANCE FIX ===== */
.register-page {
    /* Create a buffer to prevent the header/typing text from sliding under the transparent fixed navbar */
    padding-top: 130px !important; 
    padding-bottom: 60px !important; /* Ensure breathing room at the bottom too */
}
"""

with codecs.open(filepath, 'a', encoding='utf-8') as f:
    f.write(css_append)

print("Navbar clearance padding injected into Register page.")
