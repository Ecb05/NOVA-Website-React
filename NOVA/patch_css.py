import codecs

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'

with codecs.open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

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

target_string = ".announcements-page-wrapper .primary-btn,"

if target_string in content and ".register-page" not in content:
    content = content.replace(target_string, missing_css + target_string)
    with codecs.open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("App.css rules restored and updated correctly.")
else:
    print("Target not found or already fixed.")
