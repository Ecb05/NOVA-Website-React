import codecs

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'

# Read file ignoring encoding errors just in case
with codecs.open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

# Find the start of the corrupted or recently appended block
clean_lines = []
for line in lines:
    if '/* Enhanced Internal Page Backgrounds from Update */' in line:
        break
    # also filter out weird null bytes if any
    clean_lines.append(line.replace('\x00', ''))

css_append = """
/* Enhanced Internal Page Backgrounds from Update */
.sprints-page-wrapper {
    background: linear-gradient(135deg, #040F1A, #0A3A5F, #061726) !important;
    min-height: 100vh;
}
.register-page {
    background: linear-gradient(135deg, #1A0410, #5F0A3A, #26061A) !important;
    min-height: 100vh;
}
.announcements-page-wrapper {
    background: linear-gradient(135deg, #1A0F04, #5F2E0A, #2A1606) !important;
    min-height: 100vh;
}
"""

with codecs.open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(clean_lines)
    f.write(css_append)

print("App.css fixed and updated successfully.")
