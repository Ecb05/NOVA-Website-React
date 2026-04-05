import codecs

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'

css_append = """

/* ===== WINNER PROJECTS CARD FOOTER INLINE ALIGNMENT ===== */
/* Force the team name and status into a strict single-line flexbox */
.winner-card .winner-footer {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important; /* Prevent any wrapping */
    justify-content: space-between !important;
    align-items: center !important;
    gap: 5px !important;
    width: 100% !important;
    margin-top: auto; /* Push to bottom if height varies */
}

/* Shrink the team name and allow it to gracefully truncate if it's too long */
.winner-card .winner-footer .team-name {
    font-size: 0.8rem !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    margin: 0 !important;
    flex: 1; /* Allow it to take up available space */
    text-align: left;
}

/* Shrink the status block specifically and prevent it from word-wrapping or shrinking */
.winner-card .winner-footer .winner-status {
    font-size: 0.7rem !important;
    white-space: nowrap !important;
    flex-shrink: 0 !important; 
    margin: 0 !important;
}

/* Let the general Project grid expand a bit wider internally to give the cards more breathing room */
.about-content {
    max-width: 1350px !important; 
    margin: 0 auto;
}
"""

with codecs.open(filepath, 'a', encoding='utf-8') as f:
    f.write(css_append)

print("Project card footer alignments injected.")
