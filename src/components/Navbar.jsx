import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 10 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '6rem' }}>
        <Link to="/" className="label-caps" style={{ color: '#ffffff', fontWeight: 700 }}>
          THE CREATIVE SIGNAL
        </Link>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/archive" className="label-caps" style={{ fontSize: '0.7rem' }}>Archive</Link>
          <a href="#subscribe" className="label-caps" style={{ fontSize: '0.7rem' }}>Subscribe</a>
        </div>
      </div>
    </nav>
  );
}