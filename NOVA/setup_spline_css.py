import codecs

filepath = 'c:/Users/pavan/OneDrive/Desktop/NOVA-Website-React/NOVA/src/App.css'

css_append = """

/* ===== Spline Hero Split Layout ===== */
.hero-split-layout {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    gap: 40px;
    padding-top: 50px;
}

.hero-content.left-align {
    flex: 1.2;
    text-align: left;
    align-items: flex-start;
}

.hero-content.left-align .typing-container {
    justify-content: flex-start;
}

.hero-spline-container {
    flex: 1;
    height: 550px;
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
}

.spline-canvas {
    width: 100% !important;
    height: 100% !important;
}

.spline-loader {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gray-text);
    font-size: 1.2rem;
    gap: 15px;
}

/* Spinner */
.spinner {
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-left-color: var(--light-text);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Responsive adjustments */
@media (max-width: 968px) {
    .hero-split-layout {
        flex-direction: column;
        justify-content: center;
        text-align: center;
        padding-top: 20px;
    }
    .hero-content.left-align {
        align-items: center;
        text-align: center;
    }
    .hero-content.left-align .typing-container {
        justify-content: center;
    }
    .hero-spline-container {
        width: 100%;
        height: 400px;
        margin-top: 30px;
    }
}
"""

with codecs.open(filepath, 'a', encoding='utf-8') as f:
    f.write(css_append)

print("Spline CSS configuration executed across environments.")
