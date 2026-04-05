import codecs

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'

css_append = """
/* Home Page explicit typography resize */
#home .typing-text {
    font-size: clamp(2.5rem, 6vw, 4.5rem) !important;
}

/* Post-Typing Animation reveals */
.delayed-reveal-1 {
    opacity: 0;
    animation: revealAfterType 0.8s ease-out 2.5s forwards;
}
.delayed-reveal-2 {
    opacity: 0;
    animation: revealAfterType 0.8s ease-out 2.7s forwards;
}
.delayed-reveal-3 {
    opacity: 0;
    animation: revealAfterType 0.8s ease-out 2.9s forwards;
}

@keyframes revealAfterType {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
"""

with codecs.open(filepath, 'a', encoding='utf-8') as f:
    f.write(css_append)

print("CSS appended.")
