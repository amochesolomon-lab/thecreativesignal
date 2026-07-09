import { useState } from 'react';
import api from '../services/api';

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.subscribe(email);
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '12rem', paddingBottom: '12rem' }}>
      
      {/* 1. THE INTRODUCTION (Primary Visual Weight) */}
      <header style={{ marginBottom: '8rem' }}>
        <span className="label-caps" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '2rem', opacity: 0.4, letterSpacing: '0.2em' }}>
          
        </span>
        <h1 style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: '1.05', letterSpacing: '-0.04em', margin: '0 0 2.5rem 0', color: '#ffffff' }}>
          THE CREATIVE SIGNAL.
        </h1>
        <p style={{ fontSize: '1.5rem', lineHeight: '1.5', maxWidth: '44rem', color: '#ffffff', margin: 0, fontWeight: 400, opacity: 0.9 }}>
          This is an independent digital publication documenting my ideas and creative process, my mistakes and my wins, to help someone out there who needs to know the way to go.
          No Spam, Just Value.
        </p>
      </header>

      {/* 2. WHY IT EXISTS (Secondary Structural Context) */}
      <section style={{ marginBottom: '8rem', maxWidth: '38rem' }}>
        <span className="label-caps" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '2rem', opacity: 0.4, letterSpacing: '0.2em' }}>
          
        </span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '0 0 1.5rem 0', color: '#ffffff', letterSpacing: '-0.02em' }}>
          Why This Space Exists
        </h2>
        <p style={{ lineHeight: '1.8', fontSize: '1.05rem', color: '#ffffff', opacity: 0.7, marginBottom: '1.5rem' }}>
          The Creative Signal is where I document the ideas that shape how I think, create, and solve problems. It's a personal collection of 
          my observations, experiments, lessons, and reflections—not because I have all the answers, but because I believe the best ideas are 
          worth capturing and sharing. This is my space to think out loud, learn in public, and leave a trail for anyone who finds value in thoughtful creativity.
        </p>
      </section>

      {/* 3. CALL TO ACTION (The Definitive Terminal Focal Point) */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '4rem' }}>
        <span className="label-caps" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '2rem', opacity: 0.4, letterSpacing: '0.2em' }}>
          // Subscribe
        </span>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: '0 0 1rem 0', color: '#ffffff', letterSpacing: '-0.02em' }}>
          Join the Signal
        </h2>
        <p style={{ fontSize: '1rem', color: '#ffffff', opacity: 0.6, marginBottom: '2.5rem', maxWidth: '28rem', lineHeight: '1.6' }}>
          Subscribe to the newsletter to be notified of weekly drops on Sundays by 10AM. No spam, No Tracking, Just weekly creative Value.
        </p>

        {subscribed ? (
          <p style={{ fontFamily: 'monospace', color: '#ffffff', opacity: 0.6, fontSize: '0.85rem' }}>
            // Pipeline linked successfully. Welcome to the signal loop. Check your email address for confirmation.
          </p>
        ) : (
          <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '28rem' }}>
            <input 
              type="email" 
              placeholder="ENTER EMAIL ADDRESS" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ 
                background: 'transparent', 
                border: 'none', 
                borderBottom: '1px solid rgba(255,255,255,0.3)', 
                padding: '0.75rem 0', 
                color: '#ffffff', 
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                outline: 'none',
                letterSpacing: '0.05em'
              }} 
              required
              disabled={loading}
            />
            <button 
              type="submit" 
              className="label-caps" 
              disabled={loading}
              style={{ 
                alignSelf: 'flex-start', 
                background: 'transparent', 
                border: '1px solid #ffffff', 
                color: '#ffffff', 
                padding: '0.75rem 1.5rem', 
                fontSize: '0.7rem', 
                cursor: 'pointer',
                letterSpacing: '0.15em',
                opacity: loading ? 0.5 : 1,
                transition: 'border-color 0.2s ease'
              }}
            >
              {loading ? 'LINKING...' : 'INITIALIZE FEED'}
            </button>
          </form>
        )}
      </section>

    </div>
  );
}