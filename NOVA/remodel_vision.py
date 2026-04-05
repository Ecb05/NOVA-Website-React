import codecs
import re

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'

with codecs.open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# Neutering the legacy .vision-banner rules so they don't combat the new append
text = re.sub(r'\.vision-banner\s*\{[^}]+\}', '/* Legacy .vision-banner replaced by Python append */', text)
text = re.sub(r'\.vision-banner\s+img\s*\{[^}]+\}', '/* Legacy .vision-banner img removed */', text)
text = re.sub(r'\.vision-overlay\s*\{[^}]+\}', '/* Legacy .vision-overlay removed */', text)
text = re.sub(r'\.vision-overlay\s+h3\s*\{[^}]+\}', '/* Legacy .vision-overlay h3 removed */', text)


css_append = """

/* ===== MODERN VISION BANNER ===== */
.vision-banner {
    max-width: 1100px;
    margin: 40px auto 60px;
    padding: clamp(40px, 6vw, 60px) clamp(20px, 5vw, 40px);
    position: relative;
    border-radius: 20px;
    
    /* Native Glassmorphism mapping */
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 15px 45px rgba(229, 62, 62, 0.15); /* Sleek red glow to match maroon background */
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.vision-banner:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 55px rgba(229, 62, 62, 0.25);
}

.vision-banner h3 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800;
    line-height: 1.3;
    letter-spacing: 1px;
    background: linear-gradient(135deg, #ffffff 40%, #ff8c8c 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin: 0;
}
"""

text += css_append

with codecs.open(filepath, 'w', encoding='utf-8') as f:
    f.write(text)

print("Modern Vision Banner CSS injected cleanly.")
