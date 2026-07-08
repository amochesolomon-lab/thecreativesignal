import Navbar from './components/Navbar';
import Footer from './components/Footer';
// If you are using React Router, import your Routes/Route components here.
// For now, we will render your Home page as the default view.
import Home from './pages/Home';

export default function App() {
  return (
    <div className="app-shell">
      {/* 1. This handles your tactile scanline overlay background */}
      <div className="noise" />

      {/* 2. Your actual modular navigation bar */}
      <Navbar />

      {/* 3. The main content container that targets your editorial layout widths */}
      <main className="site-main">
        {/* Your actual modular page components go right here */}
        <Home />
      </main>

      {/* 4. Your global brand footer */}
      <Footer />
    </div>
  );
}