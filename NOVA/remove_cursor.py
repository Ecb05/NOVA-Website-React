import codecs
import re

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'
with codecs.open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# Disable border-right blink caret cursor entirely
text = re.sub(r'border-right:[^;]+;', '/* no cursor */', text)
text = re.sub(r'blink-caret 0\.75s step-end infinite', '', text)
text = re.sub(r'typing 2\.5s steps\(16, end\),', 'typing 2.5s steps(40, end)', text)
text = re.sub(r'typing 2\.5s steps\(16, end\)', 'typing 2.5s steps(40, end)', text)

with codecs.open(filepath, 'w', encoding='utf-8') as f:
    f.write(text)

print("CSS logic updated.")
