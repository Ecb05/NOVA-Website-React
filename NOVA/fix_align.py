import codecs

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'

css_append = """
/* Exact Left-Alignment Fixes for Split Layout */
.hero-content.left-align .typing-text {
    margin: 0 !important;
}

.hero-content.left-align .hero-buttons {
    justify-content: flex-start !important;
}

@media (max-width: 968px) {
    .hero-content.left-align .typing-text {
        margin: 0 auto !important;
    }
    .hero-content.left-align .hero-buttons {
        justify-content: center !important;
    }
}
"""

with codecs.open(filepath, 'a', encoding='utf-8') as f:
    f.write(css_append)

print("Alignment fixes appended.")
