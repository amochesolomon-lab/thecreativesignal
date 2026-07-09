import { Link } from 'react-router-dom';
import logo from '/public/images/20260708_071916.png'; 

export default function Navbar() {
  return (
    <nav style={{ width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 10 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '6rem' }}>
        
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src={logo} 
            alt="The Creative Signal Logo" 
            style={{ height: '3.5rem', width: 'auto', display: 'block', objectFit: 'contain' }} 
          />
        </Link>

        <div style={{ display: 'flex', gap: '2.5rem' }}>
          <Link to="/archive" className="label-caps" style={{ fontSize: '0.7rem', color: '#ffffff', letterSpacing: '0.1em' }}>Archive</Link>
          <Link to="/contact" className="label-caps" style={{ fontSize: '0.7rem', color: '#ffffff', letterSpacing: '0.1em' }}>Contact</Link>
        </div>
      </div>
    </nav>
  );
}