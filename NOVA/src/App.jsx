import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import ParticlesBackground from './components/ParticlesBackground';
import Home from './pages/Home';
import AdminPanel from './admin/AdminPanel';
import Events from './pages/Events';
import Register from './pages/Register';
import Sprints from './pages/Sprints';
import IdeasprintPage from './pages/IdeasprintPage';
// Temporary placeholder components (you'll create these later)




const Rules = () => <div>Rules Page</div>;


function App() {
  return (
    <Router>


      <div className="App">
        <Navbar />
        <ParticlesBackground />


        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/*} <Route path="/events" element={<Events />} />*/}
            <Route path="/sprints" element={<Sprints />} />
            <Route path="/ideasprint" element={<IdeasprintPage />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>

        <Footer />


      </div>
    </Router>
  )
}

export default App
