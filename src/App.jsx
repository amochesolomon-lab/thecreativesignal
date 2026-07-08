import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Archive from './pages/Archive';
import Contact from './pages/Contact';
import Issue from './pages/Issue';

export default function App() {
  return (
    <div className="app-shell">
      {/* Structural visual background filter layer */}
      <div className="noise" />

      {/* Global persistent header layer */}
      <Navbar />

      {/* Router view switcher */}
      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/issue/:slug" element={<Issue />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}