import os

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace('background-color: var(--bg-vision);', 'background: linear-gradient(135deg, #1A0A0A, #5F1A1A, #2A0D0D);')
content = content.replace('background-color: var(--bg-mission);', 'background: linear-gradient(135deg, #1A1405, #6B4F1D, #2A200A);')
content = content.replace('background-color: var(--bg-team);', 'background: linear-gradient(135deg, #04161A, #0A4F5F, #062126);')
content = content.replace('background-color: var(--bg-about);', 'background: linear-gradient(135deg, #14041A, #4B0A5F, #1F0626);')

with open(filepath, 'w') as f:
    f.write(content)

print("Gradients updated successfully.")
