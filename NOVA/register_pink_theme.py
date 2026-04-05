import codecs
import re

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'

with codecs.open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Register Page Pink Theme Override
pink_register_css = """
/* ===== REGISTER PAGE PURE PINK REDESIGN ===== */

/* 1 & 10. Pure Pink Animated Background */
.register-page {
    background: linear-gradient(135deg, #1A0010, #800040, #33001A) !important;
    background-size: 300% 300% !important;
    animation: smoothMove 12s ease infinite !important;
    position: relative !important;
    z-index: 2 !important; 
    overflow: hidden;
}

/* 3 & 4. Simulating overlay and pink ambient glow overriding the green/orange bleed */
.register-page::after {
    content: '' !important;
    position: absolute !important;
    top: 0 !important; left: 0 !important; width: 100% !important; height: 100% !important;
    background: rgba(26, 0, 16, 0.6) !important;
    z-index: -2 !important;
    pointer-events: none;
}
.register-page::before {
    content: '' !important;
    position: absolute !important;
    top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important;
    width: 1200px !important; height: 1200px !important;
    /* 4. Pink particle glow */
    background: radial-gradient(circle, rgba(255, 20, 147, 0.25) 0%, transparent 60%) !important;
    z-index: -1 !important;
    filter: blur(80px) !important;
    pointer-events: none;
}

/* 5. Center Cards (Content & Form wrapper bounds) */
.register-page .register-content,
.register-page .register-form {
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 20, 147, 0.2) !important;
    box-shadow: 0 0 12px rgba(255, 20, 147, 0.15) !important;
    border-radius: 20px !important;
    backdrop-filter: blur(12px) !important;
    -webkit-backdrop-filter: blur(12px) !important;
    position: relative;
    z-index: 3;
    padding: 30px !important;
}

/* Form Inputs matching the native pink theme mapping */
.register-page input,
.register-page select,
.register-page textarea {
    background: rgba(26, 0, 16, 0.5) !important;
    border: 1px solid rgba(255, 20, 147, 0.3) !important;
    color: #E6EDF3 !important;
}
.register-page input:focus,
.register-page select:focus,
.register-page textarea:focus {
    border-color: #FF1493 !important;
    box-shadow: 0 0 8px rgba(255, 20, 147, 0.3) !important;
    outline: none !important;
}

/* Dropdown specific reset */
.register-page select option {
    background: #1A0010 !important;
    color: #E6EDF3 !important;
}

/* 6 & 9. Headings and Text */
.register-page h1,
.register-page h2,
.register-page h3,
.register-page .typing-text {
    color: #E6EDF3 !important;
    font-weight: 700 !important;
}

.register-page p,
.register-page li,
.register-page label,
.register-page .checkbox-group {
    color: #9CA3AF !important;
}

/* 7. Highlight / Accents (Icons, Checklist) */
.register-page i,
.register-page .highlight {
    color: #FF1493 !important;
    text-shadow: 0 0 10px rgba(255, 20, 147, 0.3) !important;
}

/* Force icon mapping actively overriding global teal fallbacks */
.register-page .benefits-list i {
    color: #FF1493 !important;
}

/* 8. Buttons */
.register-page .btn.primary-btn {
    background: linear-gradient(135deg, #FF1493, #FF69B4) !important;
    color: #FFFFFF !important;
    box-shadow: 0 0 10px rgba(255, 20, 147, 0.4) !important;
    border: none !important;
    transition: all 0.3s ease !important;
    font-weight: bold !important;
}

.register-page .btn.primary-btn:hover {
    background: #FF69B4 !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 0 15px rgba(255, 20, 147, 0.6) !important;
}
"""

# Replace the existing Register Orange block
new_content = re.sub(r'/\* ===== REGISTER PAGE PURE ORANGE REDESIGN ===== \*/.*?\}\n\}', pink_register_css, content, flags=re.DOTALL)

if new_content != content:
    with codecs.open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Register page successfully converted to PINK theme.")
else:
    # If regex failed, check for exact match or append
    print("Regex replacement failed. Appending pink styles as override.")
    with codecs.open(filepath, 'a', encoding='utf-8') as f:
        f.write(pink_register_css)
