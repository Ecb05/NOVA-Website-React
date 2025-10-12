import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import ParticlesBackground from './components/ParticlesBackground';
import Home from './pages/Home';
import AdminPanel from './admin/AdminPanel';
import Announcements from './pages/Announcements';
import Novathon from './pages/Novathon';
// Temporary placeholder components (you'll create these later)


const Roadmaps = () => <div>Roadmaps Page</div>;

const Rules = () => <div>Rules Page</div>;
const Register = () => <div>Register Page</div>;

function App() {
  return (
    <Router>
      
      
      <div className = "App">
        <Navbar />
        <ParticlesBackground />
       
         
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/roadmaps" element={<Roadmaps />} />
            <Route path="/novathon" element={<Novathon />} />
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
