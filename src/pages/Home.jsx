import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Home() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    api.getIssues()
      .then(data => {
        if (isMounted) {
          setIssues(data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error(err);
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="container" style={{ paddingTop: '8rem' }}>
      
      {/* Introduction Block */}
      <section style={{ marginBottom: '5rem' }}>
        <span className="label-caps" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '1rem', opacity: 0.5 }}>
          Atmospheric Editorial Publication
        </span>
        <h1 style={{ fontSize: '3rem', fontWeight: 700, margin: '0 0 1.5rem 0', letterSpacing: '-0.02em', color: '#ffffff' }}>
          THE CREATIVE SIGNAL
        </h1>
        <p style={{ maxWidth: '38rem', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '2.5rem', color: '#ffffff', opacity: 0.8 }}>
          Documenting the intersections of structural minimalist layout workflows, brutalist web styling, and autonomous code architectures.
        </p>
        
        {/* Navigation Action Triggers */}
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="/archive" className="label-caps" style={{ padding: '0.75rem 1.5rem', border: '1px solid #ffffff', color: '#ffffff', fontSize: '0.7rem', textDecoration: 'none' }}>
            Explore Archive
          </Link>
          <Link to="/contact" className="label-caps" style={{ padding: '0.75rem 1.5rem', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', fontSize: '0.7rem', textDecoration: 'none', opacity: 0.7 }}>
            Connect Node
          </Link>
        </div>
      </section>

      {/* Feed Stream */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '3rem', marginBottom: '5rem' }}>
        <span className="label-caps" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '2.5rem', opacity: 0.5 }}>
          Latest Transmissions
        </span>
        
        {loading ? (
          <p style={{ fontFamily: 'monospace', opacity: 0.5, color: '#ffffff' }}>Syncing telemetry...</p>
        ) : issues.length === 0 ? (
          /* Hardcoded layout fallback tracking the structure of your original text layout */
          <div style={{ marginBottom: '4rem' }}>
            <span className="label-caps" style={{ fontSize: '0.65rem', display: 'block', marginBottom: '0.5rem', opacity: 0.5 }}>Issue #001 — July 2026</span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 700, margin: '0 0 0.75rem 0', color: '#ffffff' }}>THE SHIFT TO STRUCTURAL DIRECTION</h3>
            <p style={{ opacity: 0.8, maxWidth: '42rem', lineHeight: '1.6', color: '#ffffff' }}>
              As AI integrations and terminal-centric agents reshape engineering boundaries, code is turning fluid. The role of the creator is shifting toward high-fidelity editorial curation.
            </p>
          </div>
        ) : (
          <div>
            {issues.map((issue) => (
              <div key={issue.slug} style={{ marginBottom: '4rem' }}>
                <span className="label-caps" style={{ fontSize: '0.65rem', display: 'block', marginBottom: '0.5rem', opacity: 0.5 }}>
                  Issue #{issue.number || '001'}
                </span>
                <Link to={`/issue/${issue.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 700, margin: '0 0 0.75rem 0', color: '#ffffff' }}>{issue.title}</h3>
                </Link>
                <p style={{ opacity: 0.8, maxWidth: '42rem', lineHeight: '1.6', color: '#ffffff' }}>{issue.excerpt}</p>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}