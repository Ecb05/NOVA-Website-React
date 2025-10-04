import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Import your CSS
import './App.css'  // Adjust path as needed

// Import FontAwesome CSS
import '@fortawesome/fontawesome-free/css/all.min.css'

// Import AOS CSS
import 'aos/dist/aos.css'

// Import and initialize AOS
import AOS from 'aos'
AOS.init()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
