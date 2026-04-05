import codecs

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'
css_append = """

/* Dynamic React Typing Cursor Animation */
.blinking-cursor {
    font-weight: 300;
    color: #ffffff;
    opacity: 1;
    animation: blinkCursor 0.8s infinite;
    display: inline-block;
    vertical-align: text-bottom;
}

@keyframes blinkCursor {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}
"""

with codecs.open(filepath, 'a', encoding='utf-8') as f:
    f.write(css_append)

print("Blinking cursor animations appended.")
