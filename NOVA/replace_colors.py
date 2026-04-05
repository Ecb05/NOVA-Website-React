import re
import os

def process_file(filepath):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return

    with open(filepath, 'r') as f:
        content = f.read()

    # Hex replacements
    content = content.replace('#8a2be2', '#00A8A8') # primary -> indigo equivalent
    content = content.replace('#4169e1', '#00C896') # secondary -> blue equivalent
    content = content.replace('#1e90ff', '#1DE9B6') # accent -> hover blue

    # RGBA glowing shadow replacements
    content = re.sub(r'rgba\(138,\s*43,\s*226,\s*[0-9.]+\)', 'rgba(0, 200, 150, 0.6)', content)
    content = re.sub(r'rgba\(65,\s*105,\s*225,\s*[0-9.]+\)', 'rgba(0, 200, 150, 0.6)', content)
    content = re.sub(r'rgba\(30,\s*144,\s*255,\s*[0-9.]+\)', 'rgba(0, 200, 150, 0.6)', content)

    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Processed {filepath}")

process_file('c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css')
process_file('c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/components/ParticlesBackground.jsx')
