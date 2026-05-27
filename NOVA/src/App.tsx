import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { SignedIn } from '@clerk/clerk-react'
import { useSyncUser } from './hooks/useSyncUser'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ParticlesBackground from './components/ParticlesBackground'
import Home from './pages/Home'
import AdminPanel from './admin/AdminPanel'
import Register from './pages/Register'
import Sprints from './pages/Sprints'
import IdeasprintPage from './pages/IdeasprintPage'
import Events from './pages/Events'
import Announcements from './pages/Announcements'
import Dashboard from './pages/Dashboard'
import { SignInPage, SignUpPage } from './pages/SignIn'

const Rules: React.FC = (): React.JSX.Element => <div>Rules Page</div>

// Helper component to access location and conditionally render particles
const AppContent: React.FC = (): React.JSX.Element => {
  // Sync Clerk user to Supabase on sign-in
  useSyncUser()
  const location = useLocation()
  const isIdeaSprint = location.pathname === '/ideasprint'
  const isAuthPage = location.pathname === '/sign-in' || location.pathname === '/sign-up'
  const isDashboard = location.pathname === '/dashboard'

  return (
    <div className="App">
      <Navbar />
      
      {/* Conditionally hide global particles on IdeaSprint, auth, and dashboard pages */}
      {!isIdeaSprint && !isAuthPage && !isDashboard && <ParticlesBackground />}

      <main>
        <Routes>
          {/* Public routes — everyone can access */}
          <Route path="/" element={<Home />} />
          <Route path="/sprints" element={<Sprints />} />
          <Route path="/ideasprint" element={<IdeasprintPage />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<Events />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/admin" element={<AdminPanel />} />

          {/* Auth pages */}
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />

          {/* Protected routes — require auth */}
          <Route
            path="/dashboard"
            element={
              <SignedIn>
                <Dashboard />
              </SignedIn>
            }
          />
        </Routes>
      </main>

      {/* Offset footer on dashboard so it clears the fixed sidebar */}
      <div className={isDashboard ? 'md:ml-[260px] transition-all duration-300' : ''}>
        <Footer />
      </div>
    </div>
  )
}

function App(): React.JSX.Element {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
