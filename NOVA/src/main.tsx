import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App'

// Import your CSS
import './App.css'  // Adjust path as needed

// Import FontAwesome CSS
import '@fortawesome/fontawesome-free/css/all.min.css'

// Import AOS CSS
import 'aos/dist/aos.css'

// Import and initialize AOS
import AOS from 'aos'
AOS.init()

// Clerk publishable key
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error(
    'Missing VITE_CLERK_PUBLISHABLE_KEY environment variable.\n' +
    'Create a .env file in the project root with:\n' +
    'VITE_CLERK_PUBLISHABLE_KEY=your_key_here'
  )
}

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Failed to find the root element')
}

createRoot(rootElement).render(
  <StrictMode>
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </StrictMode>,
)
