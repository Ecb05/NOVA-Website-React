import codecs

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'
css_append = """

/* ===== WHAT WE DO - PROJECTS GRID REFORMAT ===== */
/* Force 4 columns side-by-side */
.winner-grid {
    display: grid !important;
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 15px !important;
}

/* Shrink Project Card typography to securely fit a 4-column constraint */
.winner-grid .project-card h3 {
    font-size: 1.1rem !important; 
    line-height: 1.2 !important;
}

.winner-grid .project-card p {
    font-size: 0.8rem !important; 
    line-height: 1.4 !important;
}

.winner-grid .project-card .status {
    font-size: 0.75rem !important;
    padding: 3px 8px !important;
}

/* Re-stack cleanly on smaller viewports to prevent squishing */
@media (max-width: 1024px) {
    .winner-grid {
        grid-template-columns: repeat(2, 1fr) !important;
    }
}
@media (max-width: 768px) {
    .winner-grid {
        grid-template-columns: 1fr !important;
    }
}


/* ===== TEAM SECTION INLINE FORMATTING ===== */
/* Force Name and Position structural tags to align horizontally on the same line */
.member-info {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: center !important;
    flex-wrap: wrap !important;
    gap: 8px !important;
}

.member-info h3 {
    margin-bottom: 0 !important;
    font-size: 1.2rem !important;
}

.member-info .role {
    margin: 0 !important;
    font-size: 0.95rem !important;
    color: var(--secondary-color) !important; /* Keep the role visually distinct */
}
"""

with codecs.open(filepath, 'a', encoding='utf-8') as f:
    f.write(css_append)

print("Project grid and Team inline alignments successfully appended.")
