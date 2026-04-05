import codecs
import re

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'
with codecs.open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Shrink font size to prevent cutoff
text = re.sub(
    r'font-size:\s*clamp\([^)]+\)\s*!important;', 
    'font-size: clamp(1.4rem, 4vw, 3rem) !important;', 
    text
)

# 2. Make internal wrappers pure hex to block the green particles blowing through
text = re.sub(
    r'\.sprints-page-wrapper\s*\{\s*background:\s*linear-gradient\([^)]+\)\s*!important;',
    '.sprints-page-wrapper {\n    background: linear-gradient(135deg, #020A14, #0A3A7A, #041226) !important;',
    text
)

text = re.sub(
    r'\.register-page\s*\{\s*background:\s*linear-gradient\([^)]+\)\s*!important;',
    '.register-page {\n    background: linear-gradient(135deg, #1A0410, #5F0A3A, #26061A) !important;',
    text
)

text = re.sub(
    r'\.announcements-page-wrapper\s*\{\s*background:\s*linear-gradient\([^)]+\)\s*!important;',
    '.announcements-page-wrapper {\n    background: linear-gradient(135deg, #140A02, #7A2E05, #2A1204) !important;',
    text
)

with codecs.open(filepath, 'w', encoding='utf-8') as f:
    f.write(text)

print("Font clamp and solid backgrounds applied.")
