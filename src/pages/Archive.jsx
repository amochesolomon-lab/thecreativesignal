import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

export default function Archive() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getIssues()
      .then(data => setIssues(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="label-caps">Opening Archive Indexes...</div>;

  return (
    <section className="container" style={{ padding: '12rem 2rem 6rem 2rem', minHeight: '80vh' }}>
      <p className="label-caps" style={{ marginBottom: '1rem' }}>Complete Log</p>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '4rem' }}>Archive</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {issues.map((issue) => (
          <div 
            key={issue.id} 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '2rem 0', 
              borderBottom: '1px solid var(--border-color)' 
            }}
          >
            <div>
              <span className="label-caps" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.7rem' }}>
                {new Date(issue.published_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
              <h2 style={{ fontSize: '1.35rem', textTransform: 'none', letterSpacing: '0' }}>{issue.title}</h2>
            </div>
            <Link to={`/issue/${issue.slug}`} className="label-caps" style={{ fontSize: '0.75rem', borderBottom: '1px solid currentColor', paddingBottom: '2px' }}>
              Read &rarr;
            </Link>
          </div>
        ))}
        {issues.length === 0 && (
          <p style={{ color: 'var(--text-muted)' }}>No issues compiled yet.</p>
        )}
      </div>
    </section>
  );
}