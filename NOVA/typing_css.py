import codecs

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'

css_append = """
/* Global Typing Animation */
.typing-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    width: 100%;
}

.typing-text {
    font-family: 'Impact', 'Arial Black', sans-serif;
    font-size: clamp(2.5rem, 6vw, 4.5rem) !important;
    font-weight: 900;
    text-transform: uppercase;
    color: var(--light-text);
    letter-spacing: 2px;
    line-height: 1.1;
    
    overflow: hidden; 
    white-space: nowrap; 
    border-right: 0.12em solid var(--light-text); 
    margin: 0 auto; 
    animation: 
        typing 2.5s steps(16, end),
        blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: var(--light-text); }
}
"""

with codecs.open(filepath, 'a', encoding='utf-8') as f:
    f.write(css_append)

print("Typewriter CSS applied successfully.")
